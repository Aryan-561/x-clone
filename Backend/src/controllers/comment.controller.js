import { Comment } from "../models/comment.model.js";
import ApiErrors from "../utils/ApiErrors.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Post } from "../models/post.model.js";
import mongoose from "mongoose";

// Validate ID format
const validateId = (id) => {
    if (!id || typeof id !== "string" || !id.trim() || !mongoose.isValidObjectId(id)) {
        throw new ApiErrors(400, "Invalid ID provided");
    }
};

// Create a new comment
const createComment = asyncHandler(async (req, res) => {
    const { text } = req.body;
    const { postId } = req.params;

    validateId(postId);
    const userId = req.user._id;

    if (!userId) throw new ApiErrors(401, "Unauthorized, please login");

    const post = await Post.findById(postId);
    if (!post) throw new ApiErrors(404, "Post not found");

    const comment = await Comment.create({ commentBy: userId, post: postId, text });

    if (!comment) throw new ApiErrors(400, "Failed to create a new comment!");

    await comment.populate({
        path: "commentBy",
        select: "-password -coverImage -refreshToken -isGoogleUser",
      });

    res.status(201).json(new ApiResponse(201, "Comment created successfully.", comment));
});

// Update a comment by ID
const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const { text } = req.body;

    validateId(commentId);
    if (!text.trim()) throw new ApiErrors(400, "Text field is required");

    const userId = req.user._id;
    if (!userId) throw new ApiErrors(401, "Unauthorized, please login");

    const comment = await Comment.findOneAndUpdate(
        { _id: commentId, commentBy: userId },
        { text },
        { new: true }
    );

    if (!comment) throw new ApiErrors(404, "Comment not found or unauthorized");

    res.status(200).json(new ApiResponse(200, "Comment updated successfully.", comment));
});

// Delete a comment by ID
const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    validateId(commentId);
    const userId = req.user._id;

    if (!userId) throw new ApiErrors(401, "Unauthorized, please login");

    const comment = await Comment.findOneAndDelete({ _id: commentId, commentBy: userId });

    if (!comment) throw new ApiErrors(404, "Comment not found or unauthorized");

    res.status(200).json(new ApiResponse(200, "Comment deleted successfully."));
});

// Get a single comment by ID
const getComment = asyncHandler(async (req, res) => {

    const { commentId } = req.params;
    validateId(commentId);

    const comment = await Comment.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(commentId) }
        },
        {
            $lookup: {
                from: "users",
                foreignField: "_id",
                localField: "commentBy",
                as: "user",
                pipeline: [
                    {
                        $lookup: {
                            from: "subscriptions",
                            localField: "_id",
                            foreignField: "follower",
                            as: "followingDoc"
                        },
                    },
                    {
                        $lookup: {
                            from: "subscriptions",
                            localField: "_id",
                            foreignField: "following",
                            as: "followerDoc"
                        },
                    }
                ]
            },
        },
        {
            $unwind: "$user"
        },
        {
            $addFields: {
                userDetails: {
                    userId: "$user._id",
                    username: "$user.userName",
                    fullName: "$user.fullName",
                    profileImage: "$user.profileImage",
                    bio: "$user.bio",
                    follower: { $size: "$user.followerDoc" },
                    following: { $size: "$user.followingDoc" }
                }
            }
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "comment",
                as: "like"
            }
        },
        {
            $addFields: {
                likeCount: { $size: "$like" },
                isLiked: {
                    $cond: {
                        if: { $in: [req.user._id, "$like.likedBy"] },
                        then: true,
                        else: false
                    }
                },
            }
        },
        {
            $lookup: {
                from: "bookmarks",
                let: { commentId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$comment", "$$commentId"] },
                                    { $eq: ["$bookmarkedBy", new mongoose.Types.ObjectId(req.user._id)] }
                                ]
                            }
                        }
                    }
                ],
                as: "bookmark"
            }
        },
        {
            $addFields: {
                isBookmarked: { $gt: [{ $size: "$bookmark" }, 0] }
            }
        },
        {
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "parentComment",
                as: "replies"
            }
        },
        {
            $addFields: {
                commentCount: { $size: "$replies" }
            }
        },
        {
            $addFields: {
                isFollowed: {
                    $cond: {
                        if: { $in: [new mongoose.Types.ObjectId(req.user._id), "$user.followerDoc.follower"] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                text: 1,
                isBookmarked: 1,
                views: 1,
                likeCount: 1,
                commentCount: 1,
                isLiked: 1,
                userDetails: 1,
                createdAt: 1,
                updatedAt: 1,
                isFollowed: 1
            }
        }
    ])

    if (!comment) throw new ApiErrors(404, "Comment not found");

    res.status(200).json(new ApiResponse(200, "Comment fetched successfully.", comment[0]));
});

const getAllPostComments = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    validateId(postId);
    const comments = await Comment.aggregate([
        {
            $match: {
                post: new mongoose.Types.ObjectId(postId),
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "commentBy",
                foreignField: "_id",
                as: "user",
                pipeline: [
                    {
                        $lookup: {
                            from: "subscriptions",
                            localField: "_id",
                            foreignField: "follower",
                            as: "followingDoc"
                        },
                    },
                    {
                        $lookup: {
                            from: "subscriptions",
                            localField: "_id",
                            foreignField: "following",
                            as: "followerDoc"
                        },
                    }
                ]
            }
        },
        {
            $unwind: "$user"
        },
        {
            $addFields: {
                userDetails: {
                    userId: "$user._id",
                    username: "$user.userName",
                    fullName: "$user.fullName",
                    profileImage: "$user.profileImage",
                    bio: "$user.bio",
                    follower: { $size: "$user.followerDoc" },
                    following: { $size: "$user.followingDoc" }
                }
            }
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "comment",
                as: "like"
            }
        },
        {
            $addFields: {
                likeCount: { $size: "$like" },
                isLiked: {
                    $cond: {
                        if: { $in: [new mongoose.Types.ObjectId(req.user._id), "$like.likedBy"] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $lookup: {
                from: "bookmarks",
                let: { commentId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$comment", "$$commentId"] },
                                    { $eq: ["$bookmarkedBy", new mongoose.Types.ObjectId(req.user._id)] }
                                ]
                            }
                        }
                    }
                ],
                as: "bookmark"
            }
        },
        {
            $addFields: {
                isBookmarked: { $gt: [{ $size: "$bookmark" }, 0] }
            }
        },
        {
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "parentComment",
                as: "replies"
            }
        },
        {
            $addFields: {
                commentCount: { $size: "$replies" }
            }
        },
        {
            $addFields: {
                isFollowed: {
                    $cond: {
                        if: { $in: [new mongoose.Types.ObjectId(req.user._id), "$user.followerDoc.follower"] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                text: 1,
                isBookmarked: 1,
                views: 1,
                likeCount: 1,
                commentCount: 1,
                isLiked: 1,
                userDetails: 1,
                createdAt: 1,
                updatedAt: 1,
                isFollowed: 1
            }
        },

        {
            $sort: { createdAt: -1 }
        }
    ])
    res.status(200).json(new ApiResponse(200, "Comments fetched successfully.", comments));

});

// Get all replies to a comment
const getCommentReplies = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    validateId(commentId);

    const replies = await Comment.aggregate([
        {
            $match: {
                parentComment: new mongoose.Types.ObjectId(commentId)
            }
        },
        // Lookup commentBy user
        {
            $lookup: {
                from: "users",
                localField: "commentBy",
                foreignField: "_id",
                as: "user",
                pipeline: [
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
                    }
                ]
            }
        },
        {
            $unwind: "$user"
        },
        {
            $addFields: {
                userDetails: {
                    userId: "$user._id",
                    username: "$user.userName",
                    fullName: "$user.fullName",
                    profileImage: "$user.profileImage",
                    bio: "$user.bio",
                    follower: { $size: "$user.followerDoc" },
                    following: { $size: "$user.followingDoc" }
                }
            }
        },
        // Like info
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "comment",
                as: "like"
            }
        },
        {
            $addFields: {
                likeCount: { $size: "$like" },
                isLiked: {
                    $cond: {
                        if: { $in: [new mongoose.Types.ObjectId(req.user._id), "$like.likedBy"] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        // Bookmark info
        {
            $lookup: {
                from: "bookmarks",
                let: { commentId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$comment", "$$commentId"] },
                                    { $eq: ["$bookmarkedBy", new mongoose.Types.ObjectId(req.user._id)] }
                                ]
                            }
                        }
                    }
                ],
                as: "bookmark"
            }
        },
        {
            $addFields: {
                isBookmarked: { $gt: [{ $size: "$bookmark" }, 0] }
            }
        },
        // Fetch nested replies count
        {
            $lookup: {
                from: "comments",
                localField: "_id",
                foreignField: "parentComment",
                as: "replies"
            }
        },
        {
            $addFields: {
                commentCount: { $size: "$replies" }
            }
        },
        // Follow status
        {
            $addFields: {
                isFollowed: {
                    $cond: {
                        if: { $in: [new mongoose.Types.ObjectId(req.user._id), "$user.followerDoc.follower"] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        // Clean output
        {
            $project: {
                text: 1,
                isBookmarked: 1,
                views: 1,
                likeCount: 1,
                commentCount: 1,
                isLiked: 1,
                userDetails: 1,
                createdAt: 1,
                updatedAt: 1,
                isFollowed: 1
            }
        },
        {
            $sort: { createdAt: -1 }
        }
    ]);

    res.status(200).json(new ApiResponse(200, "Replies fetched successfully.", replies));
});

// Create a reply to a comment
const createReplyComment = asyncHandler(async (req, res) => {
    const { text } = req.body;
    const { commentId } = req.params;

    validateId(commentId);
    const userId = req.user._id;

    if (!userId) throw new ApiErrors(401, "Unauthorized, please login");

    const parentComment = await Comment.findById(commentId);
    if (!parentComment) throw new ApiErrors(404, "Parent comment not found");

    const childComment = await Comment.create(
        {
            text,
            commentBy: userId,
            parentComment: parentComment
        })
    if (!childComment) throw new ApiErrors(400, "Failed to create a new reply!");
    const updatedParentComment = await Comment.findByIdAndUpdate(
        commentId,

        { $push: { replies: childComment._id } },
        { new: true }
    ).populate("replies", "text commentBy ");

    await childComment.populate({
        path: "commentBy",
        select: "-password -coverImage -refreshToken -isGoogleUser",
      });

    res.status(201).json(new ApiResponse(201, "Reply created successfully.", childComment));
});

// incremnt of views count

export {
    createComment,
    updateComment,
    deleteComment,
    getAllPostComments,
    getComment,
    createReplyComment,
    getCommentReplies
}
