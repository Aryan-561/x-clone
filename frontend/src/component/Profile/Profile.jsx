import React, { useEffect, useState, useMemo } from 'react';
import { FaArrowLeft } from "react-icons/fa6";
import { Card, Container, EventLoading, X } from "../index";
import { getCurrentUser, getUserPost, getAllLikePost, getAllLikeComment } from '../../features';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../Card/Avatar';
import { formatJoinDate } from '../../data/date';
import { SlCalender } from "react-icons/sl";
import { FaLink } from "react-icons/fa6";
import {  Link, useNavigate } from 'react-router-dom';

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activityType, setActivityType] = useState("post")

    const { error, message, loading, currentUser, userPost } = useSelector((state) => state.user);
    // const state = useSelector((state) => state.user);
    // console.log("userState", state)

    const { likedComments, likedPosts } = useSelector((state) => state.like);
    // const likeState = useSelector((state) => state.like);
    // console.log("like state", likeState)

    useEffect(() => {
        dispatch(getCurrentUser());
        dispatch(getUserPost())
        dispatch(getAllLikePost())
        dispatch(getAllLikeComment())
    }, [dispatch]);
    

    const memoizedUserData = useMemo(() => currentUser?.data, [currentUser]);

    const userAllPost = useMemo(() => {
        if (activityType !== "post" || loading) return null
        return userPost?.data?.length === 0 ? <div className="w-full h-[40vh] flex justify-center items-center text-lg sm:text-xl lg:text-2xl font-semibold"><div>Posts not Found!</div></div> : userPost?.data?.map((post) => <Card  key={post._id} data={post} />)
    }, [activityType, loading, userPost])

    const userAllLikePost = useMemo(() => {
        if (activityType !== "likePosts" || loading) return null
        return likedPosts?.data?.length > 0 ? likedPosts?.data?.map((post) => <Card key={post._id} data={post} />) : null
    }, [activityType, loading, likedPosts])

    const userAllLikeComment = useMemo(() => {
        if (activityType !== "likeComments" || loading) return null
        return likedComments?.data?.length > 0 ? likedComments?.data?.map((post) => <Card key={post._id}  data={post} forPost={false} />) : null
    }, [activityType, loading, likedComments])

    return (
        <Container className=' border-x   sm:w-[85%] lg:w-full border-white/10 col-span-5 w-full min-h-min relative '>
            <div className=' flex  justify-start items-center mb-1.5   relative bg-transparent '>
                <div onClick={() => navigate(-1)}  className=' text-xl border  p-1  hover:bg-white/15 rounded-full text-center h-1/12 mx-7'>
                    <FaArrowLeft />
                </div>
                <div className='mt-2.5 sm:w-2xl'>
                    <h1 className='font-semibold text-white text-xl leading-tight truncate'>{memoizedUserData?.fullName || "Full Name"}</h1>
                    <h6 className='text-gray-400 text-xs mb-1 truncate'>@{memoizedUserData?.userName || "username"}</h6>
                </div>
            </div>
            <div className=''>
                <X className="     sm:max-h-48 sm:min-h-48 max-h-28  w-full border border-white/5 bg-gray-400" image={memoizedUserData?.coverImage?.url || "/default/deafaultCoverimage.png"} />
            </div>
            <div className='   sm:bottom-16 bottom-12 relative'>
                <Avatar profileImage={memoizedUserData?.profileImage?.url} classname=' border-[3px] absolute  inset-x-6 border-black/80 h-15 sm:w-28 w-15 sm:h-28' />
            </div>
            <div className='  sm:ml-3.5 flex   flex-col gap-y-1 border-white/35  min-h-32 mt-10 px-2 py-1.5'>
                <h1 className='font-semibold font-serif text-white text-2xl leading-tight truncate'>{memoizedUserData?.fullName || "Full Name"}</h1>
                <h6 className=' hover:underline-offset-1  text-gray-400 text-sm mb-1 truncate'>@{memoizedUserData?.userName || "username"}</h6>
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
                    <Link className='hover:underline' to={`/${memoizedUserData?.userName}/follower`}>  {userPost?.data?.length > 1
                        ? userPost.data[0]?.userDetails?.follower ?? "69"
                        : "69"}{" "}  follower</Link>
                    <Link className="hover:underline" to={`/${memoizedUserData?.userName}/following`}>  {userPost?.data?.length > 1
                        ? userPost.data[0]?.userDetails?.following ?? "69"
                        : "69"}{" "}  following</Link>
                </div>
            </div>
            <div className=' w-full  my-2.5 flex justify-evenly items-center'>
                <Link to="compose/edit" className=' relative'>
                    <span className=' border border-white/20 hover:bg-blue-500/75 hover:shadow-2xs   cursor-pointer transition rounded-2xl py-1 px-3.5'>Edit profile</span>

                </Link>
                <div className='text-center '>
                    {loading && <EventLoading />}
                </div>
                <div className='border flex justify-center items-center gap-2.5 border-white/20 hover:bg-blue-500/75 hover:shadow-2xs cursor-pointer transition rounded-2xl py-1 px-3.5'>
                    <span><X image="/verifed.png" className='w-4 h-4 bg-black rounded-full  text-center' /></span>
                    <span>get verifed</span>
                </div>
            </div>

            <div className='flex  justify-around  mx-2.5 my-2.5 items-center border border-white/5 rounded-md'>

                <div onClick={() => {setActivityType("post") 
                }} className={`w-full text-center hover:bg-white/5 py-0.5 rounded-sm ${activityType==="post"?"bg-white/15":""}`}>Post</div>
                <div className={`w-full text-center hover:bg-white/5 py-0.5 rounded-sm ${activityType ==="likePosts"?"bg-white/15":""}`} onClick={() => setActivityType("likePosts")}>Likes</div>
                <div onClick={() => setActivityType("likeComments")} className={`w-full text-center hover:bg-white/5 py-0.5 rounded-sm whitespace-nowrap ${activityType ==="likeComments"?"bg-white/15":""}`} >comments</div>

            </div>

            <div className='px-1.5  text-black'>
                {
                    loading ? (<EventLoading />) : <>
                        {activityType === "post" && userAllPost}
                        {activityType === "likePosts" && userAllLikePost}
                        {activityType === "likeComments" && userAllLikeComment}</>
                }
                
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
