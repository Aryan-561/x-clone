import { configureStore } from "@reduxjs/toolkit"
import { authSlice, userSlice } from "../features"
const store = configureStore({
    reducer: {
        authReducer: authSlice,
        userReducer: userSlice

    }
})

export default store