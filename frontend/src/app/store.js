import { configureStore } from "@reduxjs/toolkit"
import { authReducer, userReducer, postReducer } from "../features"
const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        post: postReducer

    }
})

export default store