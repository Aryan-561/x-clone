import { configureStore } from "@reduxjs/toolkit"
import { authReducer, userReducer, postReducer, subscriptionReducer, bookmarkReducer } from "../features"
const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        post: postReducer,
        subscription: subscriptionReducer,
        bookmark: bookmarkReducer,
    }
})

export default store