import React, { useEffect, useState } from 'react';
import { Container, X } from "../../component"; // adjust if these are custom components
import { useNavigate } from 'react-router-dom';

function Comingsoon() {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(getInitialCountdown());

    function getInitialCountdown() {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 7);
        return Math.floor((targetDate.getTime() - Date.now()) / 1000);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (secs) => {
        const d = Math.floor(secs / (3600 * 24));
        const h = Math.floor((secs % (3600 * 24)) / 3600);
        const m = Math.floor((secs % 3600) / 60);
        const s = secs % 60;
        return `${d}d ${h}h ${m}m ${s}s`;
    };

    return (
        <Container className='border-x sm:w-[85%] lg:w-full border-white/10 col-span-5 w-full min-h-screen relative'>
            <div className='flex flex-col justify-center items-center h-[80vh] text-white text-center px-4'>
                <X image="/xLight.png" className=" w-fit h-fit  rounded-full border border-white/5 " />
                <h1 className='text-3xl sm:text-5xl font-bold mt-10'>🚧 Coming Soon</h1>
                <p className='text-gray-300 mt-2 text-lg sm:text-xl'>We're working hard to bring this feature!</p>
                <div className='mt-6 text-2xl font-semibold text-blue-500'>
                    Launching in: <span className='ml-2'>{formatTime(timeLeft)}</span>
                </div>
                <button
                    onClick={() => navigate(-1)}
                    className='mt-8 bg-white text-black px-6 py-2 rounded-full font-semibold  hover:bg-white/85 transition'
                >
                    Go Back
                </button>
            </div>
        </Container>
    );
}

export default Comingsoon;
