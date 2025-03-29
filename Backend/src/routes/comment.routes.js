import { Router } from "express";
const router = Router();
import {
    createComment,
    updateComment,
    deleteComment,
    getAllPostComments,
    getComment,
    createReplyComment,
    getCommentReplies
} from "../controllers/comment.controller.js";

import verifyJwt from "../middleware/auth.middleware.js";

// Comment Routes
router.post("/create/:postId", verifyJwt, createComment);
router.get("/:commentId", getComment);
router.put("/:commentId", verifyJwt, updateComment);
router.delete("/:commentId", verifyJwt, deleteComment);

// Reply Routes
router.post("/reply/:commentId", verifyJwt, createReplyComment);
router.get("/replies/:commentId", getCommentReplies);

// Get all comments for a post
router.get("/post/:postId", getAllPostComments);

export default router;
