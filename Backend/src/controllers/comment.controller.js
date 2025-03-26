import { Comment } from "../models/comment.model.js";
import asyncHandler from "../utils/asyncHandler.js";

// create a new comment
const createComment = asyncHandler(async (req, res) => {
    console.log("hello world");
})

// update a comment by id
const updateComment = asyncHandler(async (req, res) => {
    console.log("hello world");
})

// delete a comment by id
const deleteComment = asyncHandler(async (req, res) => {
    console.log("hello world");
})

// get a single comment by id
const getComment = asyncHandler(async (req, res) => {
    console.log("hello world");
})

// get all comments by post id
const getAllPostComment = asyncHandler(async (req, res) => {
    console.log("hello world");
})

// reply to a comment by id
const replyToComment = asyncHandler(async (req, res) => {
    console.log("hello world");
})

const createReplyComment = asyncHandler(async (req, res) => {
    console.log("hello world");
})



export {
    createComment,
    updateComment,
    deleteComment,
    getAllPostComment,
    getComment,
    replyToComment,
    createReplyComment
};  