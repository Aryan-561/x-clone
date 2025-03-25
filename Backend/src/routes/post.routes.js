import {Router} from "express"
import verifyJwt from "../middleware/auth.middleware.js"
import upload from "../middleware/multer.middleware.js"
import { createPost } from "../controllers/post.controllers.js"

const router =  Router()

router.route("/create").post(verifyJwt, upload.single("media"), createPost)

export default router;