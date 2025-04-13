import { configureStore } from "@reduxjs/toolkit"
import { authReducer, userReducer, postReducer, subscriptionReducer } from "../features"
const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        post: postReducer,
        subscription: subscriptionReducer
    }
})

export default store