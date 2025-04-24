import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import postService from '../../service/postService'
import { act } from 'react';

const setLoading = (state) => {
    state.loading = true;
    state.status = "loading";
    state.error = null;
    state.message = null;
  };
  
  const setError = (state, action, msg = "Something went wrong") => {
    state.loading = false;
    state.status = "error";
    state.error = action.error?.message || "Unknown error";
    state.message = msg;
  };
  
  const setSuccess = (state) => {
    state.loading = false;
    state.status = "success";
    state.error = null;
  };

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
    message:null,
    status: "idle",
};

const postSlice = createSlice({
    name:'post',
    initialState,
    extraReducers:(builder)=>{

        // fetch all post
        builder.addCase(getAllPost.pending, setLoading)
        builder.addCase(getAllPost.rejected, (state, action)=>setError(state, action, "Failed to Fetched All Posts!"))
        builder.addCase(getAllPost.fulfilled, (state, action)=>{
            setSuccess(state, action)
            state.allPost = action.payload.data
            state.error = null;
            state.message = "Fetched all post."
        })

        // fetch following user post by id
        builder.addCase(getFollowingUserPost.pending, setLoading)
        builder.addCase(getFollowingUserPost.rejected,(state, action)=>setError(state, action, "Failed to Fetched Following User Post!"))
        builder.addCase(getFollowingUserPost.fulfilled, (state, action)=>{
            setSuccess(state, action)
            state.followingUserPost = action.payload.data
            state.message = "Fetched Following user's post"
        })

        // fetch post by id
        builder.addCase(getPostById.pending, setLoading)
        builder.addCase(getPostById.rejected, (state, action)=>{
            setError(state, action,"Failed to Fetched Post!") 
        })
        builder.addCase(getPostById.fulfilled, (state, action)=>{
            setSuccess(state, action)
            state.post = action.payload.data
            state.message = "Fetched Post."
        })

        // create post
        builder.addCase(createPost.pending, setLoading)
        builder.addCase(createPost.rejected, (state, action)=>{
            setError(state, action,"Failed to Create Post!") 
        })
        builder.addCase(createPost.fulfilled, (state, action)=>{
            setSuccess(state, action)
            state.allPost = [action.payload.data, ...state.allPost]
            state.message = "Post created successfully"
        })

        // update post
        builder.addCase(updatePost.pending, setLoading)
        builder.addCase(updatePost.rejected, (state, action)=>{
            setError(state, action,"Failed to Update Post!") 
        })
        builder.addCase(updatePost.fulfilled, (state, action)=>{
            setSuccess(state, action)
            state.message = action.payload.message
        })

        // delete post
        builder.addCase(deletePost.pending, setLoading)
        builder.addCase(deletePost.rejected, (state, action)=>{
            setError(state, action,"Failed to Delete Post!") 
        })
        builder.addCase(deletePost.fulfilled, (state, action)=>{
            setSuccess(state, action)
            state.message = action.payload.message
        })


    }
})

export default postSlice.reducer;