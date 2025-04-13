import { configureStore } from "@reduxjs/toolkit"
import { authReducer, userReducer, postReducer,likeReducer } from "../features"
const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        post: postReducer,
        like: likeReducer

    }
})

export default store