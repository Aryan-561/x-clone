import {Router} from "express"
import verifyJwt from "../middleware/auth.middleware.js"
import upload from "../middleware/multer.middleware.js"
import { createPost, deletePost, getAllPost, getFollowerPost, getPostById, getUserPost, updatePost } from "../controllers/post.controllers.js"

const router =  Router()

router.route("/").get(verifyJwt, getAllPost)
router.route("/:userId").get(verifyJwt, getUserPost)
router.route("/following/:userId").get(verifyJwt, getFollowingUserPost)

router.route("/create").post(verifyJwt, upload.single("media"), createPost)

router.route("/update/:postId").patch(verifyJwt, updatePost)
router.route("/:postId").get(verifyJwt, getPostById)
router.route("/delete/:postId").delete(verifyJwt, deletePost)


export default router;