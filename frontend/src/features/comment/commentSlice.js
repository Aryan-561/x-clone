import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commentServices } from "../../service";

const createComment = createAsyncThunk(
    "comment/createComment",
    commentServices.createComment
);

const updateComment = createAsyncThunk(
    "comment/updateComment",
    commentServices.updateComment
);

const deleteComment = createAsyncThunk(
    "comment/deleteComment",
    commentServices.deleteComment
);

const getAllPostComments = createAsyncThunk(
    "comment/getAllPostComments",
    commentServices.getAllPostComments
);

const getCommentReplies = createAsyncThunk(
    "comment/getCommentReplies",
    commentServices.getCommentReplies
);

const createReplyComment = createAsyncThunk(
    "comment/createReplyComment",
    commentServices.createReplyComment
);

const getComment = createAsyncThunk("comment/getComment", commentServices.getComment);

const initialState = {
    comments: [],
    replies: [],
    commentByid: null,
    loading: false,
    error: null,
    message: null,
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        resetCommentState: (state) => {
            state.comments = [];
            state.replies = [];
            state.commentByid = null;
            state.loading = false;
            state.error = null;
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Create Comment
            .addCase(createComment.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.comments.unshift(action.payload.data);
                state.loading = false;
                state.message = "Comment created successfully";
            })
            .addCase(createComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.message = "Failed to create comment";
            })

            // Update Comment
            .addCase(updateComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                const updated = action.payload;
                state.comments = state.comments.map((c) =>
                    c._id === updated._id ? updated : c
                );
                state.loading = false;
                state.message = "Comment updated successfully";
            })
            .addCase(updateComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.message = "Failed to update comment";
            })

            // Delete Comment
            .addCase(deleteComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                const deletedId = action.payload._id;
                state.comments = state.comments.filter((c) => c._id !== deletedId);
                state.loading = false;
                state.message = "Comment deleted successfully";
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.message = "Failed to delete comment";
            })

            // Get All Post Comments
            .addCase(getAllPostComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllPostComments.fulfilled, (state, action) => {
                state.comments = action.payload.data;
                state.loading = false;
            })
            .addCase(getAllPostComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Get Replies
            .addCase(getCommentReplies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCommentReplies.fulfilled, (state, action) => {
                state.replies = action.payload;
                state.loading = false;
            })
            .addCase(getCommentReplies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // get comment by id
            .addCase(getComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getComment.fulfilled, (state, action) => {
                state.commentByid = action.payload;
                state.loading = false;
            })
            .addCase(getComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Create Reply Comment
            .addCase(createReplyComment.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(createReplyComment.fulfilled, (state, action) => {
                const reply = action.payload;
                const parentId = reply.parentId || reply.commentId;

                if (state.replies[parentId]) {
                    state.replies[parentId].push(reply);
                } else {
                    state.replies[parentId] = [reply];
                }

                state.loading = false;
                state.message = "Reply created successfully";
            })
            .addCase(createReplyComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.message = "Failed to create reply";
            });
    },
});

export const { resetCommentState } = commentSlice.actions;

export {
    createComment,
    updateComment,
    deleteComment,
    getAllPostComments,
    getCommentReplies,
    createReplyComment,
    getComment
};

export default commentSlice.reducer;
