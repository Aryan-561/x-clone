import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import { createUser } from "../../features"
import { useDispatch, useSelector } from 'react-redux';
function Signup() {
    const dispatch = useDispatch()
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const signupSubmit = (data) => {
        console.log(data)
        dispatch(createUser({
            username: data.username,
            email: data.email,
            password: data.password
        }))
    };
    // Password validation with more rules
    const passwordValidation = {
        required: "Password is required",
        minLength: { value: 8, message: "Password must be at least 8 characters" },
        maxLength: { value: 20, message: "Password must be less than 20 characters" },
        // pattern: {
        //     value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        //     message: "Password must contain at least one letter, one number, and one special character"
        // }
    };



    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-black  text-white px-4">
            <div className="w-full max-w-md bg-zinc-900 p-8 shadow-white/50  rounded-2xl shadow-sm">
                <h1 className="text-3xl font-bold font-sans mb-6">Create your account</h1>

                <form onSubmit={handleSubmit(signupSubmit)} className="flex flex-col gap-4">
                    {/* Name */}
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register('username', { required: 'Username is required' })}
                        />
                        {errors.username && (
                            <span className="text-red-500 text-sm">{errors.username.message}</span>
                        )}
                    </div>

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
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register('password', passwordValidation)}
                    />

                    {
                        errors.password && (
                            <span className="text-red-500 text-sm">{errors.password.message}</span>
                        )
                    }

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-xl mt-2"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow h-px bg-zinc-700"></div>
                    <span className="px-4 text-zinc-400">or</span>
                    <div className="flex-grow h-px bg-zinc-700"></div>
                </div>

                {/* Google Sign-up */}
                <button className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-xl hover:bg-gray-200 transition">
                    <FcGoogle size={20} />
                    Sign up with Google
                </button>

                {/* Login Link */}
                <p className="text-sm text-zinc-400 text-center mt-6">
                    Already have an account?{' '}
                    <a href="#" className="text-blue-500 hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Signup;
