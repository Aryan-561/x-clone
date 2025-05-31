import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, loginUser, resendEmailVerification } from "../../features";
import { Container, Googleauthentication, X } from '../index.js';
import { Link, useNavigate } from 'react-router-dom';
import { resetUserState } from '../../features/user/userSlice.js';

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, message } = useSelector((state) => state.user);
    const [showVerificationPrompt, setShowVerificationPrompt] = React.useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        watch
    } = useForm();



    const signupSubmit = async (data) => {
        try {
            const resultAction = await dispatch(createUser({
                username: data.username,
                email: data.email,
                password: data.password,
                fullname: data.fullname ?? "",
                bio: data.bio ?? "",
                link: data.link ?? "",
            }));

            setNewEmail(data.email)
            setNewPassword(data.password)
            if (createUser.fulfilled.match(resultAction)) {
                resetUserState();
                setShowVerificationPrompt(true);
            }
            resetUserState();


            reset();
        } catch (err) {
            console.error("Signup failed:", err.message || err);
            reset();
            resetUserState();

        }
    };


    const handleCheckVerification = async () => {
        try {
// console.log("password", newPassword)
// console.log("email", newEmail)

            const resultAction = await dispatch(loginUser({
                email: newEmail,
                password: newPassword
            }));

            if (loginUser.fulfilled.match(resultAction)) {
                console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++", loginUser.fulfilled
                );
                setShowVerificationPrompt(false)
                navigate("/home");
            } else {
                alert("Email not verified or invalid credentials.");
                console.log(resultAction); // Log this to see the backend error message
                alert(resultAction.payload?.message || "Something went wrong");
                resetUserState();

            }
        } catch (err) {
            console.error("Login failed:", err);
            alert("Something went wrong.");
            resetUserState();

        }
    };
    const handleResendVerification = async () => {
        if (!newEmail) {
            alert("Email not found. Please try signing up again.");
            return;
        }

        try {
            const actionResult = await dispatch(resendEmailVerification(newEmail));
            if (resendEmailVerification.fulfilled.match(actionResult)) {
                alert("Verification email sent successfully!");
            } else {
                alert(actionResult.payload?.message || "Failed to resend verification email.");
            }
        } catch (error) {
            console.error("Resend failed:", error);
            alert("Something went wrong while resending verification email.");
        }
    };

    const passwordValidation = {
        required: "Password is required",
        minLength: { value: 8, message: "Password must be at least 8 characters" },
        maxLength: { value: 20, message: "Password must be less than 20 characters" },
        pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
            message: "Must include one letter, number, and special character"
        }
    };

    return (
        <Container className="w-full flex-col bg-gray-800 flex items-center justify-center text-white p-3">
            {!showVerificationPrompt ? (
                <div className="w-full max-w-xl text-center bg-black px-8 shadow-white/50 rounded-2xl shadow-sm">
                    {/* Close Button */}
                    <div className="w-full flex justify-center mb-4">
                        <X className="w-16 rounded-full" image="xLight.png" imageAlt="close" />
                    </div>

                    <h1 className="text-xl md:text-3xl  font-semibold font-serif mb-6 whitespace-nowrap">Create your account</h1>

                    {/* Google Auth */}
                    <div className="flex items-center justify-center w-full py-3">
                        <Googleauthentication />
                    </div>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-grow h-px bg-zinc-700"></div>
                        <span className="px-4 text-zinc-400">or</span>
                        <div className="flex-grow h-px bg-zinc-700"></div>
                    </div>

                    {/* Signup Form */}
                    <form onSubmit={handleSubmit(signupSubmit)} className="flex flex-col gap-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Name"
                                autoComplete="username"
                                className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('username', {
                                    required: 'Username is required',
                                    validate: value => /^\S+$/.test(value) || 'Username should not contain spaces',
                                })}
                            />
                            {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                autoComplete="email"
                                className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                        message: 'Invalid email address',
                                    },
                                })}
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                autoComplete="new-password"
                                className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('password', passwordValidation)}
                            />
                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-xl mt-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {loading ? "Signing up..." : "Sign Up"}
                        </button>
                    </form>

                    {/* Error & Message */}
                    {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
                    {message && <p className="text-green-500 text-sm text-center mt-2">{message}</p>}

                    <p className="text-sm text-zinc-400 text-center my-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-500 hover:underline">Log in</Link>
                    </p>
                </div>
            ) : (
                <div className="bg-black text-white flex flex-col items-center justify-center min-h-1/4 w-full max-w-xl text-center px-8 shadow-white/50 rounded-2xl shadow-sm">
                    <h1 className="text-2xl font-semibold mb-4">Verify Your Email</h1>
                    <p className="text-gray-400 mb-6 text-center max-w-md">
                        A verification link has been sent to your email. Once you've clicked the link, come back here and continue.
                    </p>

                    <div className='flex justify-between items-center gap-x-2.5'>
                        <button
                            onClick={handleCheckVerification}
                            className="bg-blue-600 text-sm  px-4 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            I’ve Verified My Email
                        </button>
                        <button
                            onClick={handleResendVerification}
                            className="bg-green-600 text-sm px-4 py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!newEmail}
                        >
                            Resend Verification Email
                        </button>

                    </div>
                </div>
            )}
        </Container>
    );
}

export default Signup;
