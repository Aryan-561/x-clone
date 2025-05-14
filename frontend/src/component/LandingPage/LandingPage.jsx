import React from 'react';
import { Container, X } from '../index';
import {Googleauthentication} from '../';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();

    return (
        <Container className="bg-black text-white min-h-screen w-full flex">
            {/* Left Side - X Logo */}
            <div className="w-1/2 hidden lg:flex justify-center items-center">
                <X className="w-[350px] h-[350px]" image="xLight.png" imageAlt="X Logo" />
            </div>

            {/* Right Side - Signup/Login UI */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-start px-8 sm:px-16 gap-10">
                <div className="flex flex-col gap-4">
                    <h1 className="text-6xl sm:text-7xl font-extrabold">Happening now</h1>
                    <h2 className="text-2xl sm:text-3xl font-semibold">Join today.</h2>
                </div>

                {/* Auth Section */}
                <div className="w-full max-w-sm flex flex-col gap-5">
                    <Googleauthentication />

                    {/* Divider */}
                    <div className="flex items-center my-2">
                        <div className="flex-grow h-px bg-zinc-700"></div>
                        <span className="px-4 text-zinc-400 text-sm">or</span>
                        <div className="flex-grow h-px bg-zinc-700"></div>
                    </div>

                    {/* Create Account */}
                    <button
                        onClick={() => navigate('/signup')}
                        className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-full text-lg w-full"
                    >
                        Create Account
                    </button>

                    <p className="text-xs text-zinc-400 text-start leading-tight">
                        By signing up, you agree to the <span className="text-blue-500 hover:underline">Terms of Service</span> and <span className="text-blue-500 hover:underline">Privacy Policy</span>, including <span className="text-blue-500 hover:underline">Cookie Use</span>.
                    </p>

                    <div className="mt-6">
                        <h3 className="text-lg font-bold mb-2">Already have an account?</h3>
                        <button
                            onClick={() => navigate('/login')}
                            className="border border-zinc-600 hover:bg-indigo-300/10 font-serif transition text-blue-500 font-semibold py-2 rounded-full text-lg w-full"
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default LandingPage;
