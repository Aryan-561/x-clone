import { Router } from 'express';
import {
    createUser,
    currentUser,
    deleteUser,
    jwtRefreshToken,
    loginuser,
    logoutUser,
    updateUserAccountDetails,
    updateUserCoverImage,
    updateUserProfileImage,
    search

} from '../controllers/user.controller.js';
import multer from "multer";

import upload from '../middleware/multer.middleware.js';
import verifyJwt from '../middleware/auth.middleware.js';
const router = Router()
// remove it soon
const parseFormData = multer().none(); // Middleware for text-only FormData

//  user create route  and use multer (upload) for  upload files
router.
    route("/create").post(upload.fields([
        { name: 'profileImage', maxCount: 1 },
        { name: 'coverImage', maxCount: 1 }
    ]), createUser)

// for getting current user
router.route("/").get(verifyJwt, currentUser)

//  user login  and logout route
router.route("/login").post(parseFormData, loginuser)
router.route("/logout").get(verifyJwt, logoutUser)

//  for refreshing token
router.route("/re-refreshtoken").post(verifyJwt, jwtRefreshToken)

//  for updating user details
router.route("/update-account-details").post(parseFormData, verifyJwt, updateUserAccountDetails)
router.route("/update-coverimage").patch(verifyJwt, upload.single('coverImage'), updateUserCoverImage)
router.route("/update-profileimage").patch(verifyJwt,upload.single('profileImage'), updateUserProfileImage)
router.route("/deleteuser").delete(verifyJwt, deleteUser)
router.route("/search/:queries").get(verifyJwt, search)




export default router;