import  { Router } from 'express';
import { createUser } from '../controllers/userController.js';
import upload from '../middleware/multer.middleware.js';
const router = Router()
//  user create route  and use multer (upload) for  upload files
router.
    route("/create").post(upload.fields([
        { name: 'profileImage', maxCount: 1 },
        { name: 'coverImage', maxCount: 1 }
    ]), createUser)

export default router;