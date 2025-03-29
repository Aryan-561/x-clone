import {Router} from 'express'
import verifyJwt from "../middleware/auth.middleware.js"
import { getUserFollower, toggleSubscription , getUserFollowing} from '../controllers/subscription.controllers.js'
const router = Router()

router.route("/toggle/:followingId").post(verifyJwt, toggleSubscription)

router.route("/:userId/follower").get(verifyJwt, getUserFollower)

router.route("/:userId/following").get(verifyJwt, getUserFollowing)

export default router