import asyncHandler from "../utils/asyncHandler.js";
import Like from "../models/like.model.js";
import { Post } from "../models/post.model.js";
import { Comment } from "../models/comment.model.js";
import mongoose from "mongoose";
import ApiResponse from "../utils/ApiResponse.js";
import ApiErrors from "../utils/ApiErrors.js";

// ✅ Validate ID format
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
};

// ✅ Toggle like for post (with post existence check)
const togglePostLike = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    validateId(postId);

    const userId = req.user._id;
    if (!userId) throw new ApiErrors(401, "Unauthorized, please login");

    const postExists = await Post.findById(postId);
    if (!postExists) throw new ApiErrors(404, "Post not found");

    const existLike = await Like.findOne({ post: postId, likedBy: userId });

    if (existLike) {
        await Like.findByIdAndDelete(existLike._id);
        return res.status(200).json(new ApiResponse(200, "Like removed successfully"));
    }

    const newLike = await Like.create({ post: postId, likedBy: userId });
    return res.status(200).json(new ApiResponse(200, "Like added successfully", newLike));
});

// ✅ Toggle like for comment (with comment existence check)
const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    validateId(commentId);

    const userId = req.user._id;
    if (!userId) throw new ApiErrors(401, "Unauthorized, please login");

    const commentExists = await Comment.findById(commentId);
    if (!commentExists) throw new ApiErrors(404, "Comment not found");

    const existLike = await Like.findOne({ comment: commentId, likedBy: userId });

    if (existLike) {
        await Like.findByIdAndDelete(existLike._id);
        return res.status(200).json(new ApiResponse(200, "Like removed successfully"));
    }

    const newLike = await Like.create({ comment: commentId, likedBy: userId });
    return res.status(200).json(new ApiResponse(200, "Like added successfully", newLike));
});

// Get all liked posts by the user
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
            $lookup: {
                from: "bookmarks",
                foreignField: "post",
                localField: "post",
                as: "bookmarkDoc"
            }
        },
        {
            $lookup: {
                from: "likes",
                localField: "post",
                foreignField: "post",
                as: "likeDoc"
            }
        },

        {
            $lookup: {
                from: "comments",
                localField: "post",
                foreignField: "post",
                as: "commentDoc"
            }
        },
        {
            $addFields: {
                "postDetails.commentCount": { $size: "$commentDoc" },
                "postDetails.likeCount": { $size: "$likeDoc" },
                "postDetails.isLiked": {
                    $cond: {
                        if: { $in: [req.user._id, "$likeDoc.likedBy"] },
                        then: true,
                        else: false
                    }
                },
                "postDetails.isBookmarked": {
                    $cond: {
                        if: { $in: [req.user._id, "$bookmarkDoc.bookmarkedBy"] },
                        then: true,
                        else: false
                    }
                }

            }
        },
        {
            $project: {
                _id: "$postDetails._id",
                text: "$postDetails.text",
                media: "$postDetails.media",
                views: "$postDetails.views",
                commentCount: "$postDetails.commentCount",
                isLiked: "$postDetails.isLiked",
                isBookmarked: "$postDetails.isBookmarked",
                likeCount: "$postDetails.likeCount",
                createdAt: "$postDetails.createdAt",
                updatedAt: "$postDetails.updatedAt",
                userDetails: {
                    userId: "$postOwnerDetails._id",
                    username: "$postOwnerDetails.userName",
                    fullName: "$postOwnerDetails.fullName",
                    profileImage: "$postOwnerDetails.profileImage",
                    followingCount: "$postOwnerDetails.followingCount",
                    followerCount: "$postOwnerDetails.followerCount"
                }
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ]);

    return res.status(200).json(new ApiResponse(200, "All Liked Posts", likePost));
});

//  Get all liked comments by the user
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
        { $unwind: "$commentDetails" },
        {
            $lookup: {
                from: "users",
                localField: "commentDetails.commentBy",
                foreignField: "_id",
                as: "commentOwnerDetails"
            }
        },
        { $unwind: "$commentOwnerDetails" },
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
                "commentOwnerDetails.followingCount": { $size: "$followingDoc" },
                "commentOwnerDetails.followerCount": { $size: "$followerDoc" }
            }
        },
        {
            $lookup: {
                from: "likes",
                localField: "commentDetails._id",
                foreignField: "comment",
                as: "likeDoc"
            }
        },
        {
            $lookup: {
                from: "bookmarks",
                localField: "commentDetails._id",
                foreignField: "comment",
                as: "bookmarkDoc"
            }
        },
        {
            $addFields: {
                "commentDetails.likeCount": { $size: "$likeDoc" },
                "commentDetails.isLiked": {
                    $cond: {
                        if: { $in: [req.user._id, "$likeDoc.likedBy"] },
                        then: true,
                        else: false
                    }
                },
                "commentDetails.isBookmarked": {
                    $cond: {
                        if: { $in: [req.user._id, "$bookmarkDoc.bookmarkedBy"] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                userId: "$commentDetails._id",
                text: "$commentDetails.text",
                views: "$commentDetails.views",
                likeCount: "$commentDetails.likeCount",
                commentCount: { $literal: 0 },
                isLiked: "$commentDetails.isLiked",
                isBookmarked: "$commentDetails.isBookmarked",
                createdAt: "$commentDetails.createdAt",
                updatedAt: "$commentDetails.updatedAt",
                userDetails: {
                    _id: "$commentOwnerDetails._id",
                    userName: "$commentOwnerDetails.userName",
                    fullName: "$commentOwnerDetails.fullName",
                    profileImage: "$commentOwnerDetails.profileImage",
                    coverImage: "$commentOwnerDetails.coverImage",
                    followingCount: "$commentOwnerDetails.followingCount",
                    followerCount: "$commentOwnerDetails.followerCount"
                }
            }
        },
    ]);

    return res.status(200).json(new ApiResponse(200, "All Liked Comments", likeComment));
});


export {
    togglePostLike,
    toggleCommentLike,
    getAllLikePost,
    getAllLikeComment
};
