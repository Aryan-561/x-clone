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
                as: "postDetails"
            }
        },
        { $unwind: "$postDetails" },
        {
            $lookup: {
                from: "users",
                localField: "postDetails.createdBy",
                foreignField: "_id",
                as: "postOwnerDetails"
            }
        },
        { $unwind: "$postOwnerDetails" },
        {
            $lookup: {
                from: "subscriptions",
                localField: "postOwnerDetails._id",
                foreignField: "follower",
                as: "followingDoc"
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "postOwnerDetails._id",
                foreignField: "following",
                as: "followerDoc"
            }
        },
        {
            $addFields: {
                "postOwnerDetails.followingCount": { $size: "$followingDoc" },
                "postOwnerDetails.followerCount": { $size: "$followerDoc" }
            }
        },
        {
            $project: {
                createdAt: 1,
                updatedAt: 1,
                "postDetails._id": 1,
                "postDetails.text": 1,
                "postDetails.media": 1,
                "postDetails.views": 1,
                "postDetails.createdAt": 1,
                "postDetails.updatedAt": 1,

                "postOwnerDetails._id": 1,
                "postOwnerDetails.userName": 1,
                "postOwnerDetails.profileImage": 1,
                "postOwnerDetails.followingCount": 1,
                "postOwnerDetails.followerCount": 1
            }
        },{
            $sort: {
                createdAt: -1
            }
        }
    ]);

    return res.status(200).json(new ApiResponse(200, "All Liked Posts", likePost));
});

// get all like comment by user
const getAllLikeComment = asyncHandler(async (req, res) => {
    const likeComment = await Like.aggregate([
        {
            $match: {
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
            $unwind: "$commentDetails"
        },
        {
            $lookup: {
                from: "users",
                localField: "commentDetails.commentBy",
                foreignField: "_id",
                as: "commentOwnerDetails"
            }
        },
        {
            $unwind: "$commentOwnerDetails"
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "commentOwnerDetails._id",
                foreignField: "follower",
                as: "followingDoc"
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "commentOwnerDetails._id",
                foreignField: "following",
                as: "followerDoc"
            }
        },
        {
            $addFields: {
                "postOwnerDetails.followingCount": { $size: "$followingDoc" },
                "postOwnerDetails.followerCount": { $size: "$followerDoc" }
            }
        },
        {
            $project: {
                _id: 1,
                createdAt: 1,
                updatedAt: 1,
                "commentDetails._id": 1,
                "commentDetails.text": 1,
                "commentDetails.media": 1,
                "commentDetails.views": 1,
                "commentOwnerDetails._id": 1,
                "commentOwnerDetails.userName": 1,
                "commentOwnerDetails.profileImage": 1,
                "commentOwnerDetails.followingCount": 1,
                "commentOwnerDetails.followerCount": 1
            }
        }

    ])
    return res.status(200).json(new ApiResponse(200, "All Like Comments", likeComment));
})

export { togglePostLike, toggleCommentLike, getAllLikePost, getAllLikeComment };