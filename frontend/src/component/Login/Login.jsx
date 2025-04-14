import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    loginUser,
    getCurrentUser,
    search,
    jwtRefreshToken,
    logoutUser,
    togglePostLike,
    toggleCommentLike,
    getAllLikeComment,
    getAllLikePost,
    getAllPostComments,
    createComment,
    updateComment,
    getCommentReplies,
    createReplyComment
} from '../../features';

function Login() {
    const dispatch = useDispatch();
    const { loading, status, error } = useSelector((state) => state.user);

    // Using fixed postId and commentId for testing
    const postId = "67f58cd30538a517404860c3"; // Example postId
    const commentId = "67fc04e6c01a52bf8e16a21f"; // Example commentId

    // Predefined comment text for testing
    const predefinedText = "This is a test comment";
    const predefinedUpdateText = "This is an updated comment";
    const predefinedReplyText = "This is a reply to a comment";

    const handleLogin = () => {
        dispatch(loginUser({ username: "arnav", password: "arnav" }));
    };

    const handleGetCurrentUser = () => {
        dispatch(getCurrentUser());
    };

    const handleSearchUser = () => {
        dispatch(search("arnav"));
    };

    const handleRefreshToken = () => {
        dispatch(jwtRefreshToken());
    };

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    const handlePostToggleLike = () => {
        dispatch(togglePostLike("67f42340df76176de448a225"));
    };

    const handleCommentToggleLike = () => {
        dispatch(toggleCommentLike(commentId));
    };

    const handleGetAllLikedPosts = () => {
        dispatch(getAllLikePost());
    };

    const handleGetAllLikedComments = () => {
        dispatch(getAllLikeComment());
    };

    const handleGetAllPostComments = () => {
        dispatch(getAllPostComments({ postId }));
    };

    // Create comment action
    const handleCreateComment = () => {
        dispatch(createComment({ postId, text: predefinedText }));
    };

    // Update comment action
    const handleUpdateComment = () => {
        dispatch(updateComment({ commentId, text: predefinedUpdateText }));
    };

    // Get comment replies action
    const handleGetCommentReplies = () => {
        dispatch(getCommentReplies({ commentId }));
    };

    // Create reply comment action
    const handleCreateReplyComment = () => {
        dispatch(createReplyComment({ commentId, text: predefinedReplyText }));
    };

    const buttonClass = "text-lg bg-amber-400/20 hover:bg-amber-400/40 transition rounded-xl px-4 py-2 w-fit";

    return (
        <div className="flex flex-col gap-6 p-6 max-w-xl mx-auto font-sans">
            <h2 className="text-3xl font-bold text-center mb-4">Login Testing Panel</h2>

            <div className="flex flex-col gap-3">
                <h3 className="text-xl font-semibold">Auth Actions</h3>
                <button onClick={handleLogin} className={buttonClass}>Login</button>
                <button onClick={handleGetCurrentUser} className={buttonClass}>Get Current User</button>
                <button onClick={handleSearchUser} className={buttonClass}>Search</button>
                <button onClick={handleRefreshToken} className={buttonClass}>Refresh Token</button>
                <button onClick={handleLogout} className={buttonClass}>Logout</button>
            </div>

            <div className="flex flex-col gap-3 mt-4">
                <h3 className="text-xl font-semibold">Like Actions</h3>
                <button onClick={handlePostToggleLike} className={buttonClass}>Toggle Post Like</button>
                <button onClick={handleCommentToggleLike} className={buttonClass}>Toggle Comment Like</button>
                <button onClick={handleGetAllLikedComments} className={buttonClass}>Get All Liked Comments</button>
                <button onClick={handleGetAllLikedPosts} className={buttonClass}>Get All Liked Posts</button>
            </div>

            <div className="flex flex-col gap-3 mt-4">
                <h3 className="text-xl font-semibold">Post Comments Actions</h3>
                <button onClick={handleGetAllPostComments} className={buttonClass}>Get All Post Comments</button>
                <button onClick={handleCreateComment} className={buttonClass}>Create Comment</button>
                <button onClick={handleUpdateComment} className={buttonClass}>Update Comment</button>
                <button onClick={handleGetCommentReplies} className={buttonClass}>Get Comment Replies</button>
                <button onClick={handleCreateReplyComment} className={buttonClass}>Create Reply Comment</button>
            </div>

            <div className="mt-6 text-center">
                {loading && <p className="text-yellow-600">Processing...</p>}
                {status && <p className="text-green-600 font-medium">Action successful! ✅</p>}
                {error && <p className="text-red-600 font-medium">Error: {error}</p>}
            </div>
        </div>
    );
}

export default Login;
