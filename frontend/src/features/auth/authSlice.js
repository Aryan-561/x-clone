import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userServices } from "../../service/userService.js"


const loginUser = createAsyncThunk("loginUser", userServices.loginUser)
const jwtRefreshToken = createAsyncThunk("jwtRefreshToken", userServices.jwtRefreshToken)
const logoutUser = createAsyncThunk("logoutUser", userServices.logoutUser)

const initialState = {
    refreshToken: null,
    accessToken: null,
    isAuthenticated: false,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const { accessToken, refreshToken } = action.payload
                state.refreshToken = refreshToken
                state.accessToken = accessToken
                state.isAuthenticated = true
                state.loading = false;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            .addCase(jwtRefreshToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(jwtRefreshToken.fulfilled, (state, action) => {
                const { accessToken } = action.payload
                state.accessToken = accessToken
                state.isAuthenticated = true;
                state.loading = false;
                state.error = null;
            })
            .addCase(jwtRefreshToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.refreshToken = null
                state.accessToken = null
                state.isAuthenticated = false
                state.loading = false;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})


export {
    loginUser,
    jwtRefreshToken,
    logoutUser
}
export default authSlice.reducer