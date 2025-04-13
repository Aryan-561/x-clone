import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { subscriptionService } from "../../service";


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


export const toggleSubscription = createAsyncThunk(
  "subscription/toggleSubscription",
  subscriptionService.toggleSubscription
);

export const getUserFollower = createAsyncThunk(
  "subscription/getUserFollower",
  subscriptionService.getUserFollower
);

export const getUserFollowing = createAsyncThunk(
  "subscription/getUserFollowing",
  subscriptionService.getUserFollowing
);


// Initial State
const initialState = {
  follower: [],
  following: [],
  loading: false,
  error: null,
  message: null,
  status: "idle",
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  extraReducers: (builder) => {

    // Toggle Subscription
    builder
      .addCase(toggleSubscription.pending, setLoading)
      .addCase(toggleSubscription.rejected, setError)
      .addCase(toggleSubscription.fulfilled, (state, action) => {
        setSuccess(state, action);
        state.message = action.payload.message;
      });

    // Get User Follower
    builder
      .addCase(getUserFollower.pending, setLoading)
      .addCase(getUserFollower.rejected, (state, action) =>
        setError(state, action, "Failed to fetch the Follower!")
      )
      .addCase(getUserFollower.fulfilled, (state, action) => {
        setSuccess(state, action);
        state.follower = action.payload.data;
        state.message = "Fetched Follower";
      });

    // Get User Following
    builder
      .addCase(getUserFollowing.pending, setLoading)
      .addCase(getUserFollowing.rejected, (state, action) =>
        setError(state, action, "Failed to fetch the Following!")
      )
      .addCase(getUserFollowing.fulfilled, (state, action) => {
        setSuccess(state, action);
        state.following = action.payload.data;
        state.message = "Fetched Following";
      });
  },
});

export default subscriptionSlice.reducer;
