import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import postService from '../../service/postService'


export const getAllPost = createAsyncThunk("getAllPost",postService.getAllPost)

export const getPostById = createAsyncThunk("getPostById", postService.getPostById)

export const getFollowingUserPost = createAsyncThunk("getFollowingUserPost", postService.getFollowingUserPost)

export const createPost = createAsyncThunk("createPost", postService.createPost)

export const updatePost = createAsyncThunk("updatePost", postService.updatePost)

export const deletePost = createAsyncThunk("deletePost", postService.deletePost)


// Initial State
const initialState = { 
    allPost:[],
    followingUserPost:[],
    post:{},
    loading: false,
    error: null,
    message:null
};

const postSlice = createSlice({
    name:'post',
    initialState,
    extraReducers:(builder)=>{

        // fetch all post
        builder.addCase(getAllPost.pending, (state, action)=>{
            state.loading = true
        })
        builder.addCase(getAllPost.rejected, (state, action)=>{
            state.loading = false
            state.error = action.error.message
            state.message = "Failed to Fetched All Posts!"
        })
        builder.addCase(getAllPost.fulfilled, (state, action)=>{
            state.loading = false,
            state.allPost = action.payload.data
            state.error = null;
        })

        // fetch following user post by id
        builder.addCase(getFollowingUserPost.pending, (state, action)=>{
            state.loading = true
        })
        builder.addCase(getFollowingUserPost.rejected, (state, action)=>{
            state.loading = false
            state.error = action.error.message
            state.message = "Failed to Fetched Following User Post!"
        })
        builder.addCase(getFollowingUserPost.fulfilled, (state, action)=>{
            state.loading = false,
            state.followingUserPost = action.payload.data
            state.error = null;
        })

        // fetch post by id
        builder.addCase(getPostById.pending, (state, action)=>{
            state.loading = true
        })
        builder.addCase(getPostById.rejected, (state, action)=>{
            state.loading = false
            state.error = action.error.message
            state.message = "Failed to Fetched Post!"
        })
        builder.addCase(getPostById.fulfilled, (state, action)=>{
            state.loading = false,
            state.post = action.payload.data
            state.error = null;
        })

        // create post
        builder.addCase(createPost.pending, (state, action)=>{
            state.loading = true
        })
        builder.addCase(createPost.rejected, (state, action)=>{
            state.loading = false
            state.error = action.error.message
            state.message = "Failed to Create Post!"
        })
        builder.addCase(createPost.fulfilled, (state, action)=>{
            state.loading = false,
            state.allPost = [action.payload.data, ...state.allPost]
            state.message = action.payload.message
            state.error = null;
        })

        // update post
        builder.addCase(updatePost.pending, (state, action)=>{
            state.loading = true
        })
        builder.addCase(updatePost.rejected, (state, action)=>{
            state.loading = false
            state.error = action.error.message
            state.message = "Failed to Update Post!"
        })
        builder.addCase(updatePost.fulfilled, (state, action)=>{
            state.loading = false,
            state.message = action.payload.message
            state.error = null;
        })

        // delete post
        builder.addCase(deletePost.pending, (state, action)=>{
            state.loading = true
        })
        builder.addCase(deletePost.rejected, (state, action)=>{
            state.loading = false
            state.error = action.error.message
            state.message = "Failed to Delete Post!"
        })
        builder.addCase(deletePost.fulfilled, (state, action)=>{
            state.loading = false,
            state.message = action.payload.message
            state.error = null;
        })


    }
})

export default postSlice.reducer;