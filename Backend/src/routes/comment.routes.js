import { Router } from "express";
const router = Router();
import {
    createComment,
    updateComment,
    deleteComment,
    getAllPostComments,
    getComment,
    createReplyComment,
    getCommentReplies,
    getAllUserComment
} from "../controllers/comment.controller.js";

import verifyJwt from "../middleware/auth.middleware.js";

// Comment Routes
router.post("/create/:postId", verifyJwt, createComment);
router.get("/:commentId", verifyJwt, getComment);
router.put("/:commentId", verifyJwt, updateComment);
router.delete("/:commentId", verifyJwt, deleteComment);

// Reply Routes
router.post("/reply/:commentId", verifyJwt, createReplyComment);
router.get("/replies/:commentId", verifyJwt, getCommentReplies);

// Get all comments for a post
router.get("/post/:postId", verifyJwt, getAllPostComments);
router.get("/c/:username", verifyJwt, getAllUserComment);

export default router;
