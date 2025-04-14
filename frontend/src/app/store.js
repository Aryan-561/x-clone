import { configureStore } from "@reduxjs/toolkit"
import { authReducer, userReducer, postReducer,likeReducer,subscriptionReducer,bookmarkReducer,commentReducer } from "../features"
const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        post: postReducer,
        like: likeReducer,
        subscription: subscriptionReducer,
        bookmark: bookmarkReducer,
        comment: commentReducer
    }
})


export default store