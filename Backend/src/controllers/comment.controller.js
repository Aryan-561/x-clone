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
const getAllPostComments = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    validateId(postId);
    const comments = await Comment.find({ post: postId }).populate("commentBy", "username email");

    res.status(200).json(new ApiResponse(200, "Comments fetched successfully.", comments));
});

// Get all replies to a comment
const getCommentReplies = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    validateId(commentId);

    // Fetch the comment and get the replies array
    const comment = await Comment.findById(commentId).populate({
        path: "replies",
        populate: { path: "commentBy", select: "username email" } // Fetch username & email of each replier
    });

    if (!comment) {
        return res.status(404).json(new ApiResponse(404, "Comment not found"));
    }

    res.status(200).json(new ApiResponse(200, "Replies fetched successfully.", comment.replies));
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
            post: parentComment.post
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
};
