import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { likeServices } from "../../service";

const togglePostLike = createAsyncThunk("like/togglePostLike", likeServices.togglePostLike);
const toggleCommentLike = createAsyncThunk("like/toggleCommentLike", likeServices.toggleCommentLike);
const getAllLikePost = createAsyncThunk("like/getAllLikePost", likeServices.getAllLikePost);
const getAllLikeComment = createAsyncThunk("like/getAllLikeComment", likeServices.getAllLikeComment);

const initialState = {
    likedPosts: {},
    likedComments: {},
    loading: false,
    message: "like",
    status: null,
    error: null,
};

const likeSlice = createSlice({
    name: "like",
    initialState,
    extraReducers: (builder) => {
        builder
            // Toggle Post Like
            .addCase(togglePostLike.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.status = null;
                state.error = null;
            })
            .addCase(togglePostLike.rejected, (state, action) => {
                state.loading = false;
                state.message = "something went wrong";
                state.error = action.error.message;
                state.status = false;
            })
            .addCase(togglePostLike.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.status = true;
                state.message = action.payload.message;
            })

            // Toggle Comment Like
            .addCase(toggleCommentLike.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.status = null;
                state.error = null;
            })
            .addCase(toggleCommentLike.rejected, (state, action) => {
                state.loading = false;
                state.message = "something went wrong";
                state.error = action.error.message;
                state.status = false;
            })
            .addCase(toggleCommentLike.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.status = true;
                state.message = action.payload.message;
            })

            // Get All Liked Posts
            .addCase(getAllLikePost.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.status = null;
                state.error = null;
            })
            .addCase(getAllLikePost.rejected, (state, action) => {
                state.loading = false;
                state.message = "something went wrong";
                state.error = action.error.message;
                state.status = false;
            })
            .addCase(getAllLikePost.fulfilled, (state, action) => {
                state.likedPosts = action.payload.data;
                state.loading = false;
                state.error = null;
                state.status = true;
                state.message = action.payload.message;
            })

            // Get All Liked Comments
            .addCase(getAllLikeComment.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.status = null;
                state.error = null;
            })
            .addCase(getAllLikeComment.rejected, (state, action) => {
                state.loading = false;
                state.message = "something went wrong";
                state.error = action.error.message;
                state.status = false;
            })
            .addCase(getAllLikeComment.fulfilled, (state, action) => {
                state.likedComments = action.payload.data;
                state.loading = false;
                state.error = null;
                state.status = true;
                state.message = action.payload.message;
            });
    },
});

export default likeSlice.reducer;
export {
    toggleCommentLike,
    togglePostLike,
    getAllLikeComment,
    getAllLikePost,
};
