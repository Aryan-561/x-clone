import React, { useEffect, useState, useMemo } from 'react';
import { FaArrowLeft } from "react-icons/fa6";
import { Card, Container, EventLoading, X } from "../index";
import { getCurrentUser, getUserPost, getAllLikePost, getAllLikeComment, getUserDetails, getAllUserComment } from '../../features';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../Card/Avatar';
import { formatJoinDate } from '../../data/date';
import { SlCalender } from "react-icons/sl";
import { FaLink } from "react-icons/fa6";
import { Link, useNavigate, useParams } from 'react-router-dom';

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { username } = useParams()
    const [activityType, setActivityType] = useState("post");

    const { error, message, loading, currentUser, userPost, getUser } = useSelector((state) => state.user);
    const { likedComments, likedPosts } = useSelector((state) => state.like);
    const { userComment } = useSelector((state) => state.comment);
    const memoizedUserData = useMemo(() => currentUser?.data, [currentUser]);

    const memoizedUserDetails = useMemo(() => getUser?.data, [getUser]);
    const isViewingOwnProfile = username === memoizedUserData?.userName;

    useEffect(() => {
        dispatch(getCurrentUser());

        if (username) {
            dispatch(getUserDetails(username));
        }
    }, [dispatch, username, isViewingOwnProfile]);


    useEffect(() => {
        if (!username) return;

        switch (activityType) {
            case "post":
                dispatch(getUserPost(username));
                break;
            case "replies":
                dispatch(getAllUserComment(username));
                break;
            case "likePosts":
                if (isViewingOwnProfile) dispatch(getAllLikePost());
                break;
            case "likeComments":
                if (isViewingOwnProfile) dispatch(getAllLikeComment(username));
                break;
            default:
                break;
        }
    }, [activityType, dispatch, username, isViewingOwnProfile]);

    const userAllPost = useMemo(() => {
        if (activityType !== "post" || loading) return null;
        return !userPost?.data?.length || userPost?.data?.length === 0 ?
            <div className="w-full h-[40vh] text-white flex justify-center items-center text-lg sm:text-xl lg:text-2xl font-semibold">
                <div> No Posts Yet!</div>
            </div> : userPost?.data?.map((post, index) =>
                <Link to={`/${memoizedUserDetails?.userName}/post/${post?._id}`} key={index}>
                    <Card key={post._id} data={post} />
                </Link>);
    }, [activityType, loading, userPost]);

    const userAllComment = useMemo(() => {
        if (activityType !== "replies" || loading) return null;
        return !userComment?.data?.length || userComment?.data?.length === 0 ?
            <div className="w-full h-[40vh] flex justify-center items-center text-lg sm:text-xl lg:text-2xl text-white font-semibold">
                <div> No Replies yet !</div>
            </div> : userComment?.data?.map((comment, index) =>
                <Link to={`/${memoizedUserDetails?.userName}/comment/${comment?._id}`} key={index}>
                    <Card forPost={false} key={comment._id} data={comment} />
                </Link>);
    }, [activityType, loading, userComment]);

    const userAllLikePost = useMemo(() => {
        if (activityType !== "likePosts" || loading) return null;
        return !likedPosts?.data?.length || likedPosts?.data?.length > 0 ?
            <div className="w-full h-[40vh] text-white flex justify-center items-center text-lg sm:text-xl lg:text-2xl font-semibold">
                <div>No like post by user yet!</div>
            </div> : likedPosts?.data?.map((post, index) =>
                <Link to={`/${memoizedUserDetails?.userName}/post/${post?._id}`} key={index}>
                    <Card key={post._id} data={post} />
                </Link>)
    }, [activityType, loading, likedPosts]);

    const userAllLikeComment = useMemo(() => {
        if (activityType !== "likeComments" || loading) return null;
        return !likedComments?.data?.length || likedComments?.data?.length === 0 ?
            <div className="w-full h-[40vh] text-white flex justify-center items-center text-lg sm:text-xl lg:text-2xl font-semibold">
                <div>No like comment by user yet!</div>
            </div> : likedComments?.data?.map((comment, index) =>
                <Link to={`/${memoizedUserDetails?.userName}/comment/${comment?._id}`} key={index}>
                    <Card forPost={false} key={comment._id} data={comment} />
                </Link>)
    }, [activityType, loading, likedComments]);

    return (
        <Container className=' border-x   sm:w-[85%] lg:w-full border-white/10 col-span-5 w-full min-h-min relative '>
            {/* Profile Header */}
            <div className=' flex justify-start items-center mb-1.5 relative bg-transparent'>
                <div onClick={() => navigate(-1)} className=' text-xl p-1 hover:bg-white/15 rounded-full text-center h-1/12 mx-7'>
                    <FaArrowLeft />
                </div>
                <div className='mt-2.5 sm:w-2xl'>
                    <h1 className='font-semibold text-white text-xl leading-tight truncate'>{memoizedUserDetails?.fullName || "Full Name"}</h1>
                    <h6 className='text-gray-400 text-xs mb-1 truncate'>@{memoizedUserDetails?.userName || "username"}</h6>
                </div>
            </div>

            {/* Cover Image */}
            <div className=''>
                <X className="sm:max-h-48 sm:min-h-48 max-h-28 w-full border border-white/5 bg-gray-400" image={memoizedUserDetails?.coverImage?.url || "/default/deafaultCoverimage.png"} />
            </div>

            {/* Avatar */}
            <div className='sm:bottom-16 bottom-12 relative'>
                <Avatar profileImage={memoizedUserDetails?.profileImage?.url} classname=' border-[3px] absolute inset-x-6 border-black/80 h-15 sm:w-20 w-15 sm:h-20' />
            </div>

            {/* Profile Info */}
            <div className='sm:ml-3.5 flex flex-col gap-y-1 border-white/35 min-h-32 mt-10 px-2 py-1.5'>
                <h1 className='font-semibold font-serif text-white text-2xl leading-tight truncate'>{memoizedUserDetails?.fullName || "Full Name"}</h1>
                <h6 className='text-gray-400 text-sm mb-1 truncate'>@{memoizedUserDetails?.userName || "username"}</h6>
                <p className='font-light font-sans text-white text-sm leading-tight'>{memoizedUserDetails?.bio || ""}</p>
                <div className='text-xs text-gray-300/60 flex justify-start items-center gap-3.5'>
                    <SlCalender />
                    <span>{formatJoinDate(memoizedUserDetails?.createdAt)}</span>
                </div>
                <div className='text-xs text-gray-300/60 hover:text-gray-200/60 flex justify-start items-center gap-3.5'>
                    <FaLink />
                    <a target="_blank" href={memoizedUserDetails?.link || ""}>{memoizedUserDetails?.link || ""}</a>
                </div>
                <div className='flex text-sm justify-start gap-3.5 items-center'>
                    <Link className='hover:underline' to={`/${memoizedUserDetails?.userName}/follower`}>
                        {userPost?.data?.length > 1 ? userPost.data[0]?.userDetails?.follower ?? "0" : "0"} follower
                    </Link>
                    <Link className="hover:underline" to={`/${memoizedUserDetails?.userName}/following`}>
                        {userPost?.data?.length > 1 ? userPost.data[0]?.userDetails?.following ?? "69" : "69"} following
                    </Link>
                </div>
            </div>

            {/* Edit Profile and Verification */}
            {isViewingOwnProfile && <div className='w-full my-2.5 flex justify-evenly items-center'>
                <Link to="/compose/edit" className='relative'>
                    <span className='border border-white/20 hover:bg-blue-500/75 hover:shadow-2xs cursor-pointer transition rounded-2xl py-1 px-3.5'>Edit profile</span>
                </Link>
                <div className='text-center'>
                    {loading && <EventLoading />}
                </div>
                <div className='border flex justify-center items-center gap-2.5 border-white/20 hover:bg-blue-500/75 hover:shadow-2xs cursor-pointer transition rounded-2xl py-1 px-3.5'>
                    <span><X image="/verifed.png" className='w-4 h-4 bg-black rounded-full text-center' /></span>
                    <span>get verified</span>
                </div>
            </div>}


            {/* Activity Tabs */}
            <div className='flex justify-around mx-2.5 my-2.5 items-center border border-white/5 rounded-md'>
                <div onClick={() => setActivityType("post")} className={`w-full text-center hover:bg-white/5 py-0.5 rounded-sm ${activityType === "post" ? "bg-white/15" : ""}`}>Post</div>
                <div onClick={() => setActivityType("replies")} className={`w-full text-center hover:bg-white/5 py-0.5 rounded-sm ${activityType === "replies" ? "bg-white/15" : ""}`}>Replies</div>
                {isViewingOwnProfile && <>
                    <div className={`w-full text-center hover:bg-white/5 py-0.5 rounded-sm ${activityType === "likePosts" ? "bg-white/15" : ""}`} onClick={() => setActivityType("likePosts")}>Likes</div>
                    <div onClick={() => setActivityType("likeComments")} className={`w-full text-center hover:bg-white/5 py-0.5 rounded-sm px-1.5 whitespace-nowrap ${activityType === "likeComments" ? "bg-white/15" : ""}`} >Comments</div>
                </>}
            </div>

            {/* Display Content Based on Activity Type */}
            <div className='px-1.5 text-black'>
                {loading ? (<EventLoading />) : <>
                    {activityType === "post" && userAllPost}
                    {activityType === "replies" && userAllComment}
                    {isViewingOwnProfile && activityType === "likePosts" && userAllLikePost}
                    {isViewingOwnProfile && activityType === "likeComments" && userAllLikeComment}</>}
            </div>

            
        </Container>
    );
}

export default Profile;
