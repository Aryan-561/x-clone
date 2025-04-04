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
    const comment = await Comment.findById(commentId).populate("commentBy", "username email");

    if (!comment) throw new ApiErrors(404, "Comment not found");

    res.status(200).json(new ApiResponse(200, "Comment fetched successfully.", comment));
});

// Get all comments for a post
// const getAllPostComments = asyncHandler(async (req, res) => {
//     const { postId } = req.params;
//     validateId(postId);
//     const comments = await Comment.find({ post: postId }).populate("commentBy", "username email");

//     res.status(200).json(new ApiResponse(200, "Comments fetched successfully.", comments));
// });
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
                as: "commentBy"
            }
        },
        {
            $unwind: "$commentBy"
        },
        {
            $lookup: {
                from: "likes",
                localField: "likes",
                foreignField: "_id",
                as: "likes"

            }
        },
        {
            $addFields: { likeCount: { $size: "$likes" } }
        },
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
            $unwind: "$commentBy"
        },
        {
            $project: {
                _id: 1,
                text: 1,
                createdAt: 1,
                replies: 1,
                likeCount: "$likeCount",
                commentBy: {
                    _id: "$commentBy._id",
                    username: "$commentBy.userName",
                    email: "$commentBy.email",
                    profileImage: "$commentBy.profileImage"
                },
                "postOwnerDetails.followingCount": 1, // show zero, may check it
                "postOwnerDetails.followerCount": 1


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

    const comments = await Comment.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(commentId)
            }
        },
        {
            $lookup: {
                from: "comments",
                localField: "replies",
                foreignField: "_id",
                as: "replies"
            }
        },
        {
            $unwind: { path: "$replies", preserveNullAndEmptyArrays: true }
        },
        {
            $lookup: {
                from: "users",
                localField: "replies.commentBy",
                foreignField: "_id",
                as: "replies.commentBy"
            }
        },
        {
            $unwind: { path: "$replies.commentBy", preserveNullAndEmptyArrays: true }
        },
        {
            $lookup: {
                from: "comments",
                localField: "replies.replies",
                foreignField: "_id",
                as: "replies.replies"
            }
        },
        {
            $group: {
                _id: "$_id",
                replies: {
                    $push: {
                        _id: "$replies._id",
                        text: "$replies.text",
                        commentBy: {
                            _id: "$replies.commentBy._id",
                            username: "$replies.commentBy.username",
                            profileImage: "$replies.commentBy.profileImage",
                            fullName: "$replies.commentBy.fullName",
                            bio: "$replies.commentBy.bio",
                        },
                        replies: "$replies.replies" // Nested replies
                    }
                }
            }
        }
    ]);

    const replies = comments.length > 0 ? comments[0].replies : [];

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

    res.status(201).json(new ApiResponse(201, "Reply created successfully.", updatedParentComment));
});

export {
    createComment,
    updateComment,
    deleteComment,
    getAllPostComments,
    getComment,
    createReplyComment,
    getCommentReplies
}
