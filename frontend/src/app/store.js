import { configureStore } from "@reduxjs/toolkit"
import authSlice from "../features/auth/authSlice"
import userSlice from "../features/user/userSlice"
const store = configureStore({
    reducer: {
        authReducer:authSlice,
        userReducer: userSlice
        
    }
})

export default store