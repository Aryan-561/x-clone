import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bookmarkService } from "../../service";


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


  export const toggleBookmarkedPost = createAsyncThunk("bookmark/toggleBookmarkedPost", bookmarkService.toggleBookmarkedPost)

  export const toggleBookmarkedComment = createAsyncThunk("bookmark/toggleBookmarkedComment", bookmarkService.toggleBookmarkedComment)

  export const getAllbookmarkedPost = createAsyncThunk("bookmark/getAllbookmarkedPost", bookmarkService.getAllbookmarkedPost)

  export const getAllbookmarkedComment = createAsyncThunk("bookmark/getAllbookmarkedComment", bookmarkService.getAllbookmarkedComment)


  const initialState = {
    bookmarkedPost:[],
    bookmarkedComment:[],
    loading: false,
    error: null,
    message: null,
    status: "idle",
  }


  const bookmarkSlice = createSlice({
    name:'bookmark',
    initialState,
    extraReducers:(builder)=>{

        builder
        .addCase(toggleBookmarkedPost.pending, setLoading)
        .addCase(toggleBookmarkedPost.rejected, setError)
        .addCase(toggleBookmarkedPost.fulfilled, (state, action)=>{
            setSuccess(state)
            state.message = action.payload.message
        })

        builder
        .addCase(toggleBookmarkedComment.pending, setLoading)
        .addCase(toggleBookmarkedComment.rejected, setError)
        .addCase(toggleBookmarkedComment.fulfilled, (state, action)=>{
            setSuccess(state)
            state.message = action.payload.message
        })

        builder
        .addCase(getAllbookmarkedPost.pending, setLoading)
        .addCase(getAllbookmarkedPost.rejected, (state, action)=> setError(state, action, "Failed to Fetched the Bookmarked Post!"))
        .addCase(getAllbookmarkedPost.fulfilled, (state, action)=>{
            setSuccess(state)
            state.bookmarkedPost = action.payload.data
            state.message = "Fetched Bookmarked Post"
        })

        builder
        .addCase(getAllbookmarkedComment.pending, setLoading)
        .addCase(getAllbookmarkedComment.rejected, (state, action)=> setError(state, action, "Failed to Fetched the Bookmarked Comment!"))
        .addCase(getAllbookmarkedComment.fulfilled, (state, action)=>{
            setSuccess(state)
            state.bookmarkedComment = action.payload.data
            state.message = "Fetched Bookmarked Post"
        })

    }
  })


export default bookmarkSlice.reducer