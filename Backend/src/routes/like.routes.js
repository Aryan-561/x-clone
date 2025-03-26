import {
    getAllLikePost,
    toggleCommentLike,
    togglePostLike,
    getAllLikeComment
} from "../controllers/like.controller.js";

import { Router } from "express";
import verifyJwt from "../middleware/auth.middleware.js";

const router = Router();

// Toggle like on a post
router.post("/toggle/post/:postId", verifyJwt, togglePostLike);

// Toggle like on a comment
router.post("/toggle/comment/:commentId", verifyJwt, toggleCommentLike);

// Get all likes on a post
router.get("/posts",verifyJwt, getAllLikePost);

// Get all likes on a comment
router.get("/comments", getAllLikeComment);

export default router;
