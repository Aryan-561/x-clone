import ApiErrors from "../Utils/ApiErrors.js";
import ApiResponse from "../Utils/ApiResponse.js";
import asyncHandler from "../Utils/asyncHandler.js";
import User from "../models/User.js";
import { uploadCloudinary, deleteCloudinary } from "../Utils/cloudinary.js";

const createUser = asyncHandler(async (req, res) => {
    const { userName, fullName, email } = req.body;
    if (!userName || !fullName || !email) {
        throw new Error(400, "Please provide all required fields");
    }

    //  check user email exist or not
    const existUser = await User.findOne({ email })
    if (existUser) {
        throw new ApiErrors(400, "Email already exists")
    }

    //  req.files have all files that are provide by user
    const coverImageFile = req.files?.coverImage[0]?.path
    const profileImageFile = req.files?.profileImage[0]?.path

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
        `Cover Image uploaded to cloudinary: ${uploadCoverImageToCloudinary} \n`,
        `Profile Image uploaded to cloudinary: ${uploadProfileImageToCloudinary}`
    );

    const user = await User.create({
        userName: userName,
        fullName: fullName,
        email: email,
        coverImage: uploadCoverImageToCloudinary || "",
        profileImage: uploadProfileImageToCloudinary || "",
    });

    if (!user) throw new ApiErrors(400, "User creation failed")
    return res.status(200).json(new ApiResponse(200, "user create successfully", user))


})

export { createUser }