import ApiErrors from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.js";
import { uploadCloudinary, deleteCloudinary } from "../utils/cloudinary.js";

const createUser = asyncHandler(async (req, res) => {
    const { userName, fullName, email } = req.body;

    if (!userName || !fullName || !email) {
        throw new ApiErrors(400, "Please provide all required fields");
    }

    //  check user email exist or not
    const existUser = await User.findOne({
        $or: [
            { userName },
            { email }
        ]
    })
    if (existUser) {
        const field = existUser.email === email ? "Email" : "Username";
        throw new ApiErrors(400, `${field} already exists`);
    }

    //  req.files have all files that are provide by user
    const coverImageFile = req.files?.coverImage?.[0]?.path
    const profileImageFile = req.files?.profileImage?.[0]?.path

    // console.log("cover", req.files.coverImage[0].path);
    // console.log("profile", req.files.profileImage[0].path);

    if (!coverImageFile) {
        throw new ApiErrors(400, "Cover image is required")
    }
    if (!profileImageFile) {
        throw new ApiErrors(400, "Profile image is required")
    }

    const uploadCoverImageToCloudinary = await uploadCloudinary(coverImageFile)
    const uploadProfileImageToCloudinary = await uploadCloudinary(profileImageFile)



    console.log(
        `\n Cover Image uploaded to cloudinary: ${uploadCoverImageToCloudinary} \n`,
        `\nProfile Image uploaded to cloudinary: ${uploadProfileImageToCloudinary}\n`
    );

    const user = await User.create({
        userName,
        fullName,
        email,
        coverImage: uploadCoverImageToCloudinary || "",
        profileImage: uploadProfileImageToCloudinary || "",
    });

    const createdUser = await User.findById(user.id).select(" -password -refreshToken")


    if (!createdUser) throw new ApiErrors(400, "User creation failed")
    return res.status(201).json(new ApiResponse(201, "user created successfully", createdUser))


})

export { createUser }