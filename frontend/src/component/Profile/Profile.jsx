import React, { useEffect, useState, useMemo } from 'react';
import { FaArrowLeft } from "react-icons/fa6";
import { Container, EditPage, EventLoading, ProfileSearch, X } from "../index";
import { getCurrentUser } from '../../features';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../Card/Avatar';
import { formatJoinDate } from '../../data/date';
import { SlCalender } from "react-icons/sl";
import { FaLink } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function Profile() {


    const { error, message, loading, currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [showEditPage, setShowEditPage] = useState(false)
    const state = useSelector((state) => state.user);
    // console.log("satte", state)
    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch, showEditPage]);
    const handleEdit = (e) => {
        setShowEditPage(prev => !prev)
        e.stopPropagation()
        e.preventDefault();

    }
    const memoizedUserData = useMemo(() => currentUser?.data, [currentUser]);

    return (
        <Container className=' border-x border-white/10 col-span-5 w-full min-h-min relative '>
            <div className=' flex  justify-start items-center mb-1.5   relative bg-transparent '>
                <div className=' text-xl text-center h-1/12 mx-7'>
                    <FaArrowLeft />
                </div>
                <div className='mt-2.5'>
                    <h1 className='font-semibold text-white text-xl leading-tight'>{memoizedUserData?.fullName || "Full Name"}</h1>
                    <h6 className='text-gray-400 text-xs mb-1'>@{memoizedUserData?.userName || "username"}</h6>
                </div>
            </div>
            <div className=''>
                <X className="    max-h-48 sm:max-h-48 sm:min-h-48  w-full border border-white/5 bg-gray-400" image={memoizedUserData?.coverImage?.url || "/default/deafaultCoverimage.png"} />
            </div>
            <div className='  inset-x-6 bottom-16 relative'>
                <Avatar profileImage={memoizedUserData?.profileImage?.url} classname=' border-[3px] absolute  border-black/80 h-20 sm:w-28 w-20 sm:h-28' />
            </div>
            <div className='  sm:ml-3.5 flex  flex-col gap-y-1 border-white/35 w-full min-h-32 mt-10 px-2 py-1.5'>
                <h1 className='font-semibold font-serif text-white text-2xl leading-tight'>{memoizedUserData?.fullName || "Full Name"}</h1>
                <h6 className=' hover:underline-offset-1  text-gray-400 text-sm mb-1'>@{memoizedUserData?.userName || "username"}</h6>
                <p className='font-light font-sans  text-white text-sm leading-tight'>{memoizedUserData?.bio || "scars on  back, told the story of  fight of great warrior."}</p>
                <div className='text-xs text-gray-300/60 flex justify-start items-center gap-3.5 '>
                    <SlCalender />
                    <span>{formatJoinDate(memoizedUserData?.createdAt)}</span>
                </div>
                <div className='text-xs text-gray-300/60  hover:text-gray-200/60 flex justify-start items-center gap-3.5 '>
                    <FaLink />
                    <a target="_blank" href={memoizedUserData?.link}>{(memoizedUserData?.link)}</a>
                </div>
                <div className='flex text-sm  text-shadow-gray-700 justify-start gap-3.5 items-center'>
                    <Link className='hover:underline' to={`/${memoizedUserData?.userName}/follower`}>{memoizedUserData?.follower || "69"}   follower</Link>
                    <Link className="hover:underline" to={`/${memoizedUserData?.userName}/following`}>{memoizedUserData?.following || "69"}   following</Link>
                </div>
            </div>
            <div className=' w-full  my-2.5 flex justify-evenly items-center'>
                <div onClick={handleEdit} className=' relative'>
                    <span className=' border border-white/20 hover:bg-blue-500/75 hover:shadow-2xs   cursor-pointer transition rounded-2xl py-1 px-3.5'>Edit profile</span>
                    {showEditPage && (
                        <div onClick={(e) => e.stopPropagation()} className="absolute z-50 top-full mt-2">
                            <EditPage setShowEditPage={setShowEditPage} />
                        </div>
                    )}
                </div>

                <div className='border flex justify-center items-center gap-2.5 border-white/20 hover:bg-blue-500/75 hover:shadow-2xs cursor-pointer transition rounded-2xl py-1 px-3.5'>
                    <span><X image="/verifed.png" className='w-4 h-4 bg-black rounded-full  text-center' /></span>
                    <span>get verifed</span>
                </div>
            </div>
            <div className='flex  justify-around  mx-2.5 my-2.5 items-center border border-white/15 rounded-md'>
                <div className='w-full text-center hover:bg-white/5 py-0.5 rounded-sm'>Like</div>
                <div className='w-full text-center hover:bg-white/5 py-0.5 rounded-sm'>Replies</div>
                <div className='w-full text-center hover:bg-white/5 py-0.5 rounded-sm'>Post</div>
            </div>
            <div className='px-1.5'>
                <ProfileSearch />
                <ProfileSearch />
                <ProfileSearch />
            </div>
            <div className='flex  flex-col justify-center items-center my-1.5 '>
                <span>
                    {error && <p className="text-red-700 text-sm">{error}</p>}
                </span>

                <span>
                    {message && <p className={`${error ? "text-red-500 text-xs border rounded-2xl px-2 mt-2" : "text-green-500 text-xs border rounded-2xl px-2 mt-2"}`}>{message}</p>}
                </span>
            </div>
        </Container>
    );
}

export default Profile;
