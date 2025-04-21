import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features';
import { Container, Googleauthentication, X } from '../index.js';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    // Accessing state from Redux
    const { loading, error, message } = useSelector((state) => state.auth); // Ensure it's state.auth
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { handleSubmit, register, formState: { errors }, reset } = useForm();

    const loginSubmit =  (data) => {
        try {
            // Dispatch the login action
            const result =  dispatch(loginUser({
                email: data.email,
                password: data.password,
            }))

            console.log("Login successful", result);
            // Navigate after successful login
            navigate("/home");
            reset();
        } catch (err) {
            console.error("Login failed:", err.message || err);
            reset();
        }
    };

    return (
        <Container className="w-full  inset-0 absolute bg-gray-950/85 flex items-center justify-center text-white px-3">
            <div className="w-full max-w-xl text-center bg-black p-8 shadow-white/50 rounded-2xl shadow-sm">
                {/* Close Button */}
                <div className="w-full flex justify-center mb-4">
                    <X className="w-16 rounded-full" image="xLight.png" imageAlt="close" />
                </div>
                <h1 className="text-3xl font-semibold font-serif mb-6">Sign in to X</h1>

                {/* Google Login */}
                <div className="flex items-center justify-center w-full py-3">
                    <Googleauthentication />
                </div>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow h-px bg-zinc-700"></div>
                    <span className="px-4 text-zinc-400">or</span>
                    <div className="flex-grow h-px bg-zinc-700"></div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(loginSubmit)} className="flex flex-col gap-4">
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
                            autoComplete="current-password"
                            className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register('password', { required: 'Password is required' })}
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-xl mt-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>

                {/* Show error or message */}
                {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
                {message && <p className={`${error?"text-red-500 text-sm text-center mt-2":"text-green-500 text-sm text-center mt-2"}`}>{message}</p>}

                {/* Signup Link */}
                <p className="text-sm text-zinc-400 text-center my-6">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
                </p>
            </div>
        </Container>
    );
}

export default Login;
