// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//     loginUser,
//     getCurrentUser,
//     search,
//     jwtRefreshToken,
//     logoutUser,
//     togglePostLike,
//     toggleCommentLike,
//     getAllLikeComment,
//     getAllLikePost,
//     getAllPostComments,
//     createComment,
//     updateComment,
//     getCommentReplies,
//     createReplyComment
// } from '../../features';

// function Login() {
//     const dispatch = useDispatch();
//     const { loading, status, error } = useSelector((state) => state.user);

//     // Using fixed postId and commentId for testing
//     const postId = "67f58cd30538a517404860c3"; // Example postId
//     const commentId = "67fc04e6c01a52bf8e16a21f"; // Example commentId

//     // Predefined comment text for testing
//     const predefinedText = "This is a test comment";
//     const predefinedUpdateText = "This is an updated comment";
//     const predefinedReplyText = "This is a reply to a comment";

//     const handleLogin = () => {
//         dispatch(loginUser({ username: "arnav", password: "arnav" }));
//     };

//     const handleGetCurrentUser = () => {
//         dispatch(getCurrentUser());
//     };

//     const handleSearchUser = () => {
//         dispatch(search("arnav"));
//     };

//     const handleRefreshToken = () => {
//         dispatch(jwtRefreshToken());
//     };

//     const handleLogout = () => {
//         dispatch(logoutUser());
//     };

//     const handlePostToggleLike = () => {
//         dispatch(togglePostLike("67f42340df76176de448a225"));
//     };

//     const handleCommentToggleLike = () => {
//         dispatch(toggleCommentLike(commentId));
//     };

//     const handleGetAllLikedPosts = () => {
//         dispatch(getAllLikePost());
//     };

//     const handleGetAllLikedComments = () => {
//         dispatch(getAllLikeComment());
//     };

//     const handleGetAllPostComments = () => {
//         dispatch(getAllPostComments({ postId }));
//     };

//     // Create comment action
//     const handleCreateComment = () => {
//         dispatch(createComment({ postId, text: predefinedText }));
//     };

//     // Update comment action
//     const handleUpdateComment = () => {
//         dispatch(updateComment({ commentId, text: predefinedUpdateText }));
//     };

//     // Get comment replies action
//     const handleGetCommentReplies = () => {
//         dispatch(getCommentReplies({ commentId }));
//     };

//     // Create reply comment action
//     const handleCreateReplyComment = () => {
//         dispatch(createReplyComment({ commentId, text: predefinedReplyText }));
//     };

//     const buttonClass = "text-lg bg-amber-400/20 hover:bg-amber-400/40 transition rounded-xl px-4 py-2 w-fit";

//     return (
//         <div className="flex flex-col gap-6 p-6 max-w-xl mx-auto font-sans">
//             <h2 className="text-3xl font-bold text-center mb-4">Login Testing Panel</h2>

//             <div className="flex flex-col gap-3">
//                 <h3 className="text-xl font-semibold">Auth Actions</h3>
//                 <button onClick={handleLogin} className={buttonClass}>Login</button>
//                 <button onClick={handleGetCurrentUser} className={buttonClass}>Get Current User</button>
//                 <button onClick={handleSearchUser} className={buttonClass}>Search</button>
//                 <button onClick={handleRefreshToken} className={buttonClass}>Refresh Token</button>
//                 <button onClick={handleLogout} className={buttonClass}>Logout</button>
//             </div>

//             <div className="flex flex-col gap-3 mt-4">
//                 <h3 className="text-xl font-semibold">Like Actions</h3>
//                 <button onClick={handlePostToggleLike} className={buttonClass}>Toggle Post Like</button>
//                 <button onClick={handleCommentToggleLike} className={buttonClass}>Toggle Comment Like</button>
//                 <button onClick={handleGetAllLikedComments} className={buttonClass}>Get All Liked Comments</button>
//                 <button onClick={handleGetAllLikedPosts} className={buttonClass}>Get All Liked Posts</button>
//             </div>

//             <div className="flex flex-col gap-3 mt-4">
//                 <h3 className="text-xl font-semibold">Post Comments Actions</h3>
//                 <button onClick={handleGetAllPostComments} className={buttonClass}>Get All Post Comments</button>
//                 <button onClick={handleCreateComment} className={buttonClass}>Create Comment</button>
//                 <button onClick={handleUpdateComment} className={buttonClass}>Update Comment</button>
//                 <button onClick={handleGetCommentReplies} className={buttonClass}>Get Comment Replies</button>
//                 <button onClick={handleCreateReplyComment} className={buttonClass}>Create Reply Comment</button>
//             </div>

//             <div className="mt-6 text-center">
//                 {loading && <p className="text-yellow-600">Processing...</p>}
//                 {status && <p className="text-green-600 font-medium">Action successful! ✅</p>}
//                 {error && <p className="text-red-600 font-medium">Error: {error}</p>}
//             </div>
//         </div>
//     );
// }

// export default Login;


import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features'; // You'll need to create this action

function Login() {
    const dispatch = useDispatch();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const loginSubmit = (data) => {
        console.log(data);
        dispatch(loginUser({
            email: data.email,
            password: data.password,
        }));
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-black text-white px-4">
            <div className="w-full max-w-md bg-zinc-900 p-8 shadow-white/50 rounded-2xl shadow-sm">
                <h1 className="text-3xl font-bold font-sans mb-6">Welcome Back</h1>

                <form onSubmit={handleSubmit(loginSubmit)} className="flex flex-col gap-4">
                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: 'Invalid email address',
                                },
                            })}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">{errors.email.message}</span>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register('password', {
                                required: 'Password is required',
                            })}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm">{errors.password.message}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-xl mt-2"
                    >
                        Log In
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow h-px bg-zinc-700"></div>
                    <span className="px-4 text-zinc-400">or</span>
                    <div className="flex-grow h-px bg-zinc-700"></div>
                </div>

                {/* Google Login */}
                <button className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-xl hover:bg-gray-200 transition">
                    <FcGoogle size={20} />
                    Log in with Google
                </button>

                {/* Signup Link */}
                <p className="text-sm text-zinc-400 text-center mt-6">
                    Don't have an account?{' '}
                    <a href="#" className="text-blue-500 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;
