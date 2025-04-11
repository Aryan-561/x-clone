import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userServices } from "../../service/index"


const loginUser = createAsyncThunk("loginUser", userServices.loginUser)
const jwtRefreshToken = createAsyncThunk("jwtRefreshToken", userServices.jwtRefreshToken)
const logoutUser = createAsyncThunk("logoutUser", userServices.logoutUser)

const initialState = {
    refreshToken: null,
    accessToken: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    message: null 
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const { accessToken, refreshToken } = action.payload
                state.refreshToken = refreshToken
                state.accessToken = accessToken
                state.isAuthenticated = true
                state.loading = false;
                state.error = null;
                state.message = "Login successful";
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
                state.message = "Login failed";
            })

            .addCase(jwtRefreshToken.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(jwtRefreshToken.fulfilled, (state, action) => {
                const { accessToken } = action.payload
                state.accessToken = accessToken
                state.isAuthenticated = true;
                state.loading = false;
                state.error = null;
                state.message = "Token refreshed successfully";
            })
            .addCase(jwtRefreshToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.message = "Token refresh failed";
            })

            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.refreshToken = null
                state.accessToken = null
                state.isAuthenticated = false
                state.loading = false;
                state.error = null;
                state.message = "Logout successful";
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.message = "Logout failed";
            })
    }
})


export {
    loginUser,
    jwtRefreshToken,
    logoutUser
}
export default authSlice.reducer
