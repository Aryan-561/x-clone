import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features';
import { useNavigate } from 'react-router-dom';

function SmallLogoutCard({ memoizedUserData, className }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onlogout = () => {
        dispatch(logoutUser())
        navigate("/")
    }

    return (
        <div className={`${className} items-center justify-center flex flex-col border rounded-2xl px-1.5 bottom-20 shadow-sm bg-black shadow-white/45 absolute gap-1 py-2.5 w-fit`}>
            <button onClick={() =>
                navigate("signup")} className='w-fit border border-white/10 font-semi-bold text-sm hover:bg-white/10 rounded-md py-1 px-1.5'>Add an existing account</button>
            <button onClick={onlogout} className='w-fit border border-white/10 font-semi-bold text-sm hover:bg-white/10 rounded-md py-1 px-1.5'>Log out {memoizedUserData?.userName}</button>
            <div className='text-center justify-center flex items-center'>
                <IoIosArrowDown className='' />
            </div>

        </div>)
}

export default SmallLogoutCard