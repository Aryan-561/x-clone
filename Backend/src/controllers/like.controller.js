import asyncHandler from "../utils/asyncHandler.js";
import Like from "../models/like.model.js";
import mongoose from "mongoose";
import ApiResponse from "../utils/ApiResponse.js";
import ApiErrors from "../utils/ApiErrors.js";

// validate id format
const validateId = (id) => {
    try {
        if (!id || typeof id !== "string" || !id.trim()) {
            throw new Error("Invalid ID provided");
        }
        if (!mongoose.isValidObjectId(id)) {
            throw new Error("Invalid MongoDB ObjectId format");
        }
    } catch (error) {
        console.error(error);
        throw new ApiErrors(400, error.message);

    }

}

// toggle like for post 
const togglePostLike = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    validateId(postId);
    const userId = req.user._id;
    if (!userId) {
        throw new ApiErrors(401, "Unauthorized, please login");
    }
    const existLike = await Like.findOne({
        post: postId,
        likedBy: userId
    });
    if (existLike) {
        await Like.findOneAndDelete(existLike._id);
        return res.status(200).json(new ApiResponse(200, "Like removed successfully"));
    }
    const newLike = await Like.create({
        post: postId,
        likedBy: userId
    });
    return res.status(200).json(new ApiResponse(200, "Like added successfully", newLike));
})

// toggle like for comment
const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    validateId(commentId);
    const userId = req.user._id;
    if (!userId) {
        throw new ApiErrors(401, "Unauthorized, please login");
    }
    const existLike = await Like.findOne({
        comment: commentId,
        likedBy: userId
    });
    if (existLike) {
        await Like.findByIdAndDelete(existLike._id);
        return res.status(200).json(new ApiResponse(200, "Like removed successfully"));
    }
    const newLike = await Like.create({
        comment: commentId,
        likedBy: userId
    });
    return res.status(200).json(new ApiResponse(200, "Like added successfully", newLike));
})

// get all like post by user
const getAllLikePost = asyncHandler(async (req, res) => {
    const likePost = await Like.aggregate([
        {
            $match: {
                likedBy: req.user._id,
                post: { $exists: true }
            }
        },
        {
            $lookup: {
                from: "posts",
                localField: "post",
                foreignField: "_id",
                as: "postDetails",
            }
        },
        {
            $unwind: "$postDetails"
        },
        {
            $project: {
                _id: 0,
                postId: "$post",
                likeBy: "$likedBy",
                postDetails: "$postDetails",
            }
        }])
    return res.status(200).json(new ApiResponse(200, "All Like Posts", likePost));
})

// get all like comment by user
const getAllLikeComment = asyncHandler(async (req, res) => {
    const likeComment = await Like.aggregate([
        {
            match: {
                likedBy: req.user._id,
                comment: { $exists: true }
            }
        },
        {
            $lookup: {
                from: "comments",
                localField: "comment",
                foreignField: "_id",
                as: "commentDetails"
            }
        },
        {
            $project: {
                _id: 0,
                commentId: "$comment",
                likeBy: "$likedBy",
                commentDetails: "$commentDetails",
            }
        }

    ])
    return res.status(200).json(new ApiResponse(200, "All Like Comments", likeComment));
})

export { togglePostLike, toggleCommentLike, getAllLikePost, getAllLikeComment };