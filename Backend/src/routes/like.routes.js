import { getAllLikePost, toggleCommentLike, togglePostLike } from "../controllers/likes.controller.js";
import  {
    Router,

} from "express"
const router = Router()

router.route("/post/:postId/like").post(togglePostLike)

router.route("/post/:postId/comment/:commentId/like").post(toggleCommentLike)

router.route("/post/:postId/likes").get(getAllLikePost)

export default router;

