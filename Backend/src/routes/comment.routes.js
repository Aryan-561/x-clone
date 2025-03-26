import { Router } from "express";
const router = Router();
import {
    createComment,
    updateComment,
    deleteComment,
    getAllPostComment,
    getComment,
    replyToComment,
    createReplyComment

} from "../controllers/comment.controller.js"

import verifyJwt from "../middleware/auth.middleware.js";

// Create a new comment
router.route("/create").post(verifyJwt, createComment)
router.route("/createreply/commentId").post(verifyJwt, createReplyComment)

// Update a comment
router
    .route("/:commentId")
    .put(verifyJwt, updateComment)
    .delete(verifyJwt, deleteComment)
    .get(getComment)

// Get all replies to a comment
router.route("/replies/:commentId").get(verifyJwt, replyToComment)

// Get all comments for a post
router.route("/getAllPostcomment/:postId").get(getAllPostComment)

export default router;
