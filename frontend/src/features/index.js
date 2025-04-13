
// authSlice
import authReducer from "./auth/authSlice"
import { loginUser, jwtRefreshToken, logoutUser } from "./auth/authSlice"

// userslice
import userReducer from "./user/userSlice"
import {createUser,deleteUser,getCurrentUser,search,updateUserAccountDetails,updateUserProfileImage,updateUserCoverImage} from "./user/userSlice"

// postSlice
import postReducer from "./post/postSlice"

// subscriptionSlice
import subscriptionReducer from "./subscription/subscriptionSlice"

// bookmarkSlice
import bookmarkReducer from "./bookmark/bookmarkSlice"

export {
    authReducer,
    userReducer,
    loginUser,
    jwtRefreshToken,
    logoutUser,
    postReducer,
    createUser,
    deleteUser,
    getCurrentUser,
    search,
    updateUserAccountDetails,
    updateUserCoverImage,
    updateUserProfileImage,
    subscriptionReducer,
    bookmarkReducer,
}