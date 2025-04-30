import {Router} from "express"
import verifyJwt from "../middleware/auth.middleware.js"
import upload from "../middleware/multer.middleware.js"
import { createPost, deletePost, getAllPost, getFollowingUserPost, getPostById, getUserPost, updatePost } from "../controllers/post.controllers.js"

const router =  Router()

//route for get all post
router.route("/").get(verifyJwt, getAllPost)

//route for get all user's post
router.route("/user/:username").get(verifyJwt, getUserPost)

//route for get all following user's post
router.route("/following").get(verifyJwt, getFollowingUserPost)

// route for create post
router.route("/create").post(verifyJwt, upload.single("media"), createPost)

// route for update post
router.route("/update/:postId").patch(verifyJwt, updatePost)

//route for get post by id
router.route("/:postId").get(verifyJwt, getPostById)

//route for delete post
router.route("/delete/:postId").delete(verifyJwt, deletePost)


export default router;