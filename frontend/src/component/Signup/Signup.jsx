import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from "../../features";
import { Container, Googleauthentication, X } from '../index.js';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { loading, error, message } = useSelector((state) => state.user);
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm();

    const signupSubmit = async (data) => {
        try {
            const resultAction = await dispatch(createUser({
                username: data.username,
                email: data.email,
                password: data.password,
            }));

            // Check if the action was fulfilled
            if (createUser.fulfilled.match(resultAction)) {
                navigate("/home");
            }

            reset();
        } catch (err) {
            console.error("Signup failed:", err.message || err);
            reset();
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
        <Container className="w-full  inset-0 absolute bg-gray-950/85 flex items-center justify-center text-white px-3">
            <div className="w-full max-w-xl text-center bg-black px-8 shadow-white/50 rounded-2xl shadow-sm">
                {/* Close Button */}
                <div className="w-full flex justify-center mb-4">
                    <X className="w-16 rounded-full" image="xLight.png" imageAlt="close" />
                </div>

                <h1 className="text-3xl font-semibold font-serif mb-6 whitespace-nowrap">Create your account</h1>

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

                    {/* Name */}
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            autoComplete="username"
                            className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register('username', {
                                required: 'Username is required', validate: (value) =>
                                    /^\S+$/.test(value) || 'Username should not contain spaces',
                            })}
                        />
                        {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
                    </div>

                    {/* Email */}
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

                    {/* Password */}
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

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-xl mt-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>
                {/* Error */}
                {error && (
                    <p className={`text-sm text-center mt-2 ${error ? "text-red-500" : "text-green-500"}`}>
                        {error}
                    </p>
                )}
                {/* Message */}
                {message && (
                    <p className={`text-sm text-center mt-2 ${error ? "text-red-500" : "text-green-500"}`}>
                        {message}
                    </p>
                )}

                {/* Login Link */}
                <p className="text-sm text-zinc-400 text-center my-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">Log in</Link>
                </p>
            </div>
        </Container>
    );
}

export default Signup;
