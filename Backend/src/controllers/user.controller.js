import ApiErrors from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import { uploadCloudinary, deleteCloudinary } from "../utils/cloudinary.js";
import conf from "../conf/conf.js";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendmail.js";
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(conf.googleClientID);
const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
    path: '/',
    domain: 'localhost',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

const generateAccessAndRefreshToken = async function (id) {
    // Generate access token
    const user = await User.findById(id);
    if (!user) {
        throw new ApiErrors(
            404,
            "User not found, please re-check user details"
        );
    }
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    if (!accessToken || !refreshToken) {
        throw new ApiErrors(
            500,
            "Failed to generate access and refresh tokens"
        );
    }
    // Save refresh token in the database
    user.refreshToken = refreshToken;

    // disable all validation when accessing db document
    await user.save({
        validateBeforeSave: false,
    });

    return {
        accessToken,
        refreshToken,
    };
};

const createUser = asyncHandler(async (req, res) => {
    const { userName, fullName, email, password, } = req.body;

    if (!userName || !fullName || !email || !password) {
        throw new ApiErrors(400, "Please provide all required fields");
    }

    // Check if user email or username already exists
    const existUser = await User.findOne({
        $or: [{ userName }, { email }],
    });
    if (existUser) {
        const field = existUser.email === email ? "Email" : "Username";
        throw new ApiErrors(400, `${field} already exists`);
    }

    // Check if images are provided and upload them if necessary
    let coverImageUrl = "";
    let profileImageUrl = "";
    let coverPublicid = ""
    let profilePublicid = ""

    if (req.files?.coverImage?.[0]?.path) {
        // Upload cover image if provided
        const coverImageFile = req.files.coverImage[0].path;
        const uploadCoverImageToCloudinary = await uploadCloudinary(
            coverImageFile
        );
        console.log("uploadcloudinary", uploadCoverImageToCloudinary)
        coverImageUrl = uploadCoverImageToCloudinary?.secure_url || "";
        coverPublicid = uploadCoverImageToCloudinary?.public_id || ""

    }

    if (req.files?.profileImage?.[0]?.path) {
        // Upload profile image if provided
        const profileImageFile = req.files.profileImage[0].path;
        const uploadProfileImageToCloudinary = await uploadCloudinary(
            profileImageFile
        );
        profileImageUrl = uploadProfileImageToCloudinary?.secure_url || "";
        profilePublicid = uploadProfileImageToCloudinary?.public_id || "";
    }

    // Creating a new user document
    const user = await User.create({
        userName,
        fullName: fullName || "",
        email,
        coverImage: coverImageUrl
            ? {
                url: coverImageUrl,
                publicId: coverPublicid || "",
            }
            : null,
        profileImage: profileImageUrl
            ? {
                url: profileImageUrl,
                publicId: profilePublicid || "",
            }
            : null,
        password,
    });

    const createdUser = await User.findById(user.id).select(
        " -password -refreshToken"
    );

    if (!createdUser) throw new ApiErrors(400, "User creation failed");
    //  welcome message
    const emailToken = jwt.sign({ userId: user._id }, conf.refreshSecretToken, {
        expiresIn: "1h",
    });

    const verificationUrl = `http://localhost:4444/api/v1/users/verify-email?token=${emailToken}`;
    await sendMail({
        to: email,
        subject: "Verify Your Email",
        html: `
    <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 40px 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); overflow: hidden;">
        
        <div style="background-color: #007bff; padding: 20px;">
        <h2 style="color: #ffffff; margin: 0;">Welcome to X-Clone!</h2>
        </div>

        <div style="padding: 30px;">
        <p style="font-size: 16px; color: #333333;">Hi <strong>${userName}</strong>,</p>
        
        <p style="font-size: 15px; color: #333333;">
        Thank you for signing up! To get started, please confirm your email address by clicking the button below:
        </p>

        <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Verify Email
        </a>
        </div>

        <p style="font-size: 14px; color: #555555;">
        Or copy and paste this URL into your browser:
        </p>
        <p style="font-size: 13px; color: #007bff; word-break: break-all;">${verificationUrl}</p>

        <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;">

        <p style="font-size: 13px; color: #999999;">
          If you didn't sign up for this account, you can safely ignore this email.
        </p>
      </div>

      <div style="background-color: #f0f0f0; text-align: center; padding: 15px; font-size: 13px; color: #888888;">
        © ${new Date().getFullYear()} X-Clone. All rights reserved.
      </div>

    </div>
  </div>
  `
    });


    return res
        .status(201)
        .json(new ApiResponse(201, "User created successfully", createdUser));
});

const verifyMail = asyncHandler(async (req, res) => {
    const { token } = req.query;
    try {
        const decoded = jwt.verify(token, conf.refreshSecretToken);
        const user = await User.findById(decoded.userId);

        if (!user) return res.status(404).send("User not found");
        if (user.isVerified) return res.send("Email already verified");

        user.isVerified = true;
        await user.save();

        res.send("Email verified successfully. You can now log in.");
    } catch (err) {
        res.status(400).send("Invalid or expired token");
    }
});

const resendVerificationEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;
    console.log("email", email);
    if (!email) {
        throw new ApiErrors(
            400,
            "Email is required to resend verification link"
        );
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiErrors(404, "User not found with this email");
    }

    if (user.isVerified) {
        return res.status(400).json({ message: "Email already verified" });
    }

    const emailToken = jwt.sign({ userId: user._id }, conf.refreshSecretToken, {
        expiresIn: "1h",
    });

    const verificationUrl = `http://localhost:4444/api/v1/users/verify-email?token=${emailToken}`;

    await sendMail({
        to: email,
        subject: "Resend Email Verification",
        html: `
    <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 40px 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); overflow: hidden;">
        
        <div style="background-color: #007bff; padding: 20px;">
        <h2 style="color: #ffffff; margin: 0;">Welcome to X-Clone!</h2>
        </div>

        <div style="padding: 30px;">
        <p style="font-size: 16px; color: #333333;">Hi <strong>${user.userName}</strong>,</p>
        
        <p style="font-size: 15px; color: #333333;">
        Thank you for signing up! To get started, please confirm your email address by clicking the button below:
        </p>

        <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Re-Verify Email
        </a>
        </div>

        <p style="font-size: 14px; color: #555555;">
        Or copy and paste this URL into your browser:
        </p>
        <p style="font-size: 13px; color: #007bff; word-break: break-all;">${verificationUrl}</p>

        <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;">

        <p style="font-size: 13px; color: #999999;">
          If you didn't sign up for this account, you can safely ignore this email.
        </p>
      </div>

      <div style="background-color: #f0f0f0; text-align: center; padding: 15px; font-size: 13px; color: #888888;">
        © ${new Date().getFullYear()} X-Clone. All rights reserved.
      </div>

    </div>
  </div>
  `
    });

    return res.status(200).json({
        success: true,
        message: "Verification email resent successfully",
    });
});

const loginuser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;

    if (!userName && !email) {
        throw new ApiErrors(400, "Please provide username or email ");
    }
    if (!password) {
        throw new ApiErrors(400, "Please provide password ");
    }
    //  check user credentials
    const checkUser = await User.findOne({
        $or: [{ userName }, { email }],
    });
    if (!checkUser) {
        throw new ApiErrors(404, "no user exist with this creditionals");
    }
    // check password
    const passwordValid = await checkUser.comparePassword(password);

    if (!passwordValid) {
        throw new ApiErrors(401, "Invalid credentials");
    }

    // genrating access and refresh tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
        checkUser?._id
    );

    const loggedIn = await User.findById(checkUser.id).select(
        " -password -refreshToken"
    );

    if (!loggedIn)
        throw new ApiErrors(500, "Failed to login due internal error");

    if (!checkUser.isVerified) {
        return res.status(403).json(new ApiResponse(200, "Please verify your email before logging in."));
    }


    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, "User logged in successfully", {
                accessToken,
                refreshToken,
                loggedIn,
            })
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    // req.user have all details about current user
    const { id } = req.user;
    // console.log("id: ", id);
    await User.findByIdAndUpdate(
        id,
        {
            // dont unset refresh token as undefined, it treat as string.
            $unset: { refreshToken: "" },
        },
        {
            new: true,
            runValidators: true,
        }
    );
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, "User logged out successfully", {}));
});

// Google Authentication Controller
const Googleauthentication = asyncHandler(async (req, res) => {
    const { credential } = req.body;

    if (!credential) {
        throw new ApiErrors(400, "Google credential is missing");
    }

    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: conf.googleClientID
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    let user = await User.findOne({ email });

    if (!user) {
        // Generate a fallback userName using the email prefix
        const userName = email.split('@')[0] + Math.floor(Math.random() * 1000);

        user = await User.create({
            fullName: name,
            userName: userName,
            email,
            isGoogleUser: true,
            isVerified: true,
        });
    } else if (!user.isGoogleUser) {
        // Email is already used by a manually registered user
        throw new ApiErrors(403, "This email is registered with password login. Please use manual login.");
    }

    // Check if email is verified
    if (!user.isVerified) {
        throw new ApiErrors(403, "Please verify your email before logging in.");
    }


    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    // Send response with token and user info
    return res
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .status(200)
        .json(new ApiResponse(200, "User logged in successfully", { refreshToken, accessToken, user }));
});


const jwtRefreshToken = asyncHandler(async (req, res) => {
    const oldRefreshToken = req.cookies?.refreshToken;
    // console.log("Refresh token", oldRefreshToken);
    if (!oldRefreshToken) {
        throw new ApiErrors(401, "Refresh token required, please re-login");
    }

    // Verify refresh token and get user details from database.
    try {
        const decode = jwt.verify(oldRefreshToken, conf.refreshSecretToken);

        const user = await User.findById(decode?.id);
        if (!user) {
            throw new ApiErrors(
                404,
                "invaild tokens, please re-check or re-login"
            );
        }
        if (oldRefreshToken !== user.refreshToken) {
            throw new ApiErrors(
                401,
                "Refresh token not match, please re-login"
            );
        }
        // genrating access and refresh tokens
        const { accessToken, refreshToken } =
            await generateAccessAndRefreshToken(user.id);
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(200, "User token refreshed successfully", {
                    accessToken,
                    refreshToken,
                })
            );
    } catch (error) {
        console.error("Error refreshing token:", error);
        throw new ApiErrors(
            500,
            "Failed to refresh tokens, please try again later"
        );
    }
});

const currentUser = asyncHandler(async (req, res) => {
    // req.user have all details about current user
    const userId = req.user.id;

    const user = await User.findById(userId).select(" -password -refreshToken");
    if (!user) throw new ApiErrors(404, "User not found , please login again");
    return res.status(200).json(new ApiResponse(200, "User details", user));
});

const updateUserAccountDetails = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const { userName, fullName, email, bio, link } = req.body;
    //  validate parameters
    if (!userName && !fullName && !email && !bio && !link) {
        throw new ApiErrors(
            400,
            "Not find any information for updating user profie"
        );
    }

    const currentUser = await User.findById(id).select(
        "-password -refreshToken"
    );
    if (!currentUser)
        throw new ApiErrors(404, "User not found, please login again");

    // update user details
    currentUser.userName = userName || currentUser.userName;
    currentUser.fullName = fullName || "";
    currentUser.email = email || currentUser.email;
    currentUser.bio = bio || "";
    currentUser.link = link || "";
    await currentUser.save();
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "User details updated successfully",
                currentUser
            )
        );
});

const updateUserCoverImage = asyncHandler(async (req, res) => {
    const coverImage = req.file?.path;

    if (!coverImage) {
        throw new ApiErrors(400, "coverImage image is required");
    }

    const existingPublicId = req.user.coverImage?.publicId;

    const uploadCoverImageToCloudinary = await uploadCloudinary(coverImage);

    if (uploadCoverImageToCloudinary) {
        if (existingPublicId) {
            await deleteCloudinary(existingPublicId);
        }
    }
    // update user profile image
    const updatedCoverImage = await User.findByIdAndUpdate(
        req.user.id,
        {
            coverImage: {
                url: uploadCoverImageToCloudinary?.secure_url || "",
                publicId: uploadCoverImageToCloudinary?.public_id || "",
            },
        },
        {
            new: true,
            runValidators: false,
        }
    );
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "Profile image updated successfully",
                updatedCoverImage
            )
        );
});

const updateUserProfileImage = asyncHandler(async (req, res) => {
    const profileImage = req.file?.path;
    const public_id = req.user.profileImage?.publicId;

    if (!profileImage) {
        throw new ApiErrors(400, "Profile image is required");
    }
    const uploadProfileImageToCloudinary = await uploadCloudinary(profileImage);

    // delete profile image when new one uplaoded
    if (uploadProfileImageToCloudinary) {
        if (public_id) {
            deleteCloudinary(public_id);
        }
    }
    // update user profile image
    const updatedProfileImage = await User.findByIdAndUpdate(
        req.user.id,
        {
            profileImage: {
                url: uploadProfileImageToCloudinary?.secure_url || "",
                publicId: uploadProfileImageToCloudinary?.public_id || "",
            },
        },
        {
            new: true,
            runValidators: true,
        }
    );
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                "Profile image updated successfully",
                updatedProfileImage
            )
        );
});

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.user;

    const user = await User.findById(id);
    if (!user) throw new ApiErrors(404, "User not found,please login again");

    // delete profile image from cloudinary
    if (user.profileImage?.publicId)
        await deleteCloudinary(user.profileImage.publicId);
    if (user.coverImage?.publicId)
        await deleteCloudinary(user.coverImage.publicId);

    // delete user from database

    await user.deleteOne();

    // clear cookies
    res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options);

    return res
        .status(200)
        .json(new ApiResponse(200, "User deleted successfully", user));
});

const search = asyncHandler(async (req, res) => {
    const { queries } = req.params;

    const query = await User.aggregate([
        {
            $match: {
                userName: {
                    $regex: queries,
                    $options: "i",
                },
            },
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "follower",
                as: "followingDoc"
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "following",
                as: "followerDoc"
            }
        },

        {
            $addFields: {
                follower: { $size: "$followerDoc" },
                following: { $size: "$followingDoc" }
            }
        },
        {
            $project: {
                _id: 1,
                userName: 1,
                fullName: 1,
                follower: 1,
                following: 1,
                bio: 1,
                profileImage: 1,
                link: 1,
            },
        },
    ]);
    // console.log("query", query)
    if (query.length === 0)
        return res.status(400).json(new ApiResponse(400, "user match not found"));

    return res
        .status(200)
        .json(new ApiResponse(200, "query fetched  successfully", query));
});

// make api endpoint for user profile followr, following etc...
const getUserDetails = asyncHandler(async (req, res) => {
    const { queries } = req.params

    const find = await User.findOne({
        $or: [{ username: queries }, { userName: queries }]
    });
    if (!find) throw new ApiErrors(404, "User not found");

    const userDetails = await User.aggregate([
        {
            $match: {
                _id: find?._id
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "follower",
                as: "followingDoc"
            }
        },

        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "following",
                as: "followerDoc"
            }
        },

        {
            $addFields: {
                follower: { $size: "$followerDoc" },
                following: { $size: "$followingDoc" },
                isFollowed: {
                    $cond: {
                        if: { $in: [req?.user?._id, "$followerDoc.follower"] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                fullName: 1,
                userName: 1,
                bio: 1,
                link: 1,
                coverImage: 1,
                profileImage: 1,
                follower: 1,
                following: 1,
                createdAt: 1,
                isFollowed: 1
            }
        }
    ])

    res.status(200).json(new ApiResponse("200", "user successfully fetch", userDetails[0]))

})

// for random user sugestion
const getRandomUsers = asyncHandler(async (req, res) => {
    const users = await User.aggregate([
        { $match: { _id: { $ne: req.user?._id } } },

        { $sample: { size: 2 } },

        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "follower",
                as: "followingDoc"
            }
        },

        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "following",
                as: "followerDoc"
            }
        },

        {
            $addFields: {
                follower: { $size: "$followerDoc" },
                following: { $size: "$followingDoc" },
            }
        },
        {
            $project: {
                fullName: 1,
                userName: 1,
                bio: 1,
                link: 1,
                profileImage: 1,
                follower: 1,
                following: 1,
            }
        }
    ])



    if (!users || users.length === 0) {
        throw new ApiErrors(404, "No users found");
    }

    res.status(200).json(new ApiResponse(200, "Random users fetched", users));
});


export {
    createUser,
    loginuser,
    logoutUser,
    Googleauthentication,
    verifyMail,
    resendVerificationEmail,
    jwtRefreshToken,
    currentUser,
    updateUserProfileImage,
    updateUserCoverImage,
    updateUserAccountDetails,
    deleteUser,
    search,
    getUserDetails,
    getRandomUsers
};
