import asyncHandler from "../utils/asyncHandler.js";
import Like from "../models/like.model.js";

const togglePostLike = asyncHandler(async (req, res) => {
    console.log("hello1");
})
const toggleCommentLike = asyncHandler(async (req, res) => {
    console.log("hello2");
})
const getAllLikePost = asyncHandler(async (req, res) => {
    console.log("hello3");
})

export { togglePostLike, toggleCommentLike, getAllLikePost };