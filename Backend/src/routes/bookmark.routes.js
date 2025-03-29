import {Router} from "express"
import verifyJwt from "../middleware/auth.middleware.js";
import { getAllbookmarkedComment, getAllbookmarkedPost, toggleBookmarkedComment, toggleBookmarkedPost } from "../controllers/bookmark.controllers.js";

const router = Router()

// route for add/remove bookmarked on post
router.route("/t/post/:postId").post(verifyJwt, toggleBookmarkedPost)

// route for add/remove bookmarked on comment
router.route("/t/comment/:commentId").post(verifyJwt, toggleBookmarkedComment)

// route for get all posts which bookmarked by user 
router.route("/posts").get(verifyJwt, getAllbookmarkedPost)

// route for get all comments which bookmarked by user 
router.route("/comments").get(verifyJwt, getAllbookmarkedComment)

export default router;