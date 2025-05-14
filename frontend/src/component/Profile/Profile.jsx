import React, { useEffect, useState, useMemo } from 'react';
import { FaArrowLeft } from "react-icons/fa6";
import { Button, Card, Container, EventLoading, X } from "../index";
import { getCurrentUser, getUserPost, getAllLikePost, getAllLikeComment, getUserDetails, getAllUserComment } from '../../features';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../Card/Avatar';
import { formatJoinDate } from '../../data/date';
import { SlCalender } from "react-icons/sl";
import { FaLink } from "react-icons/fa6";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toggleSubscription } from '../../features/subscription/subscriptionSlice';


function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { username } = useParams()
    const [activityType, setActivityType] = useState("post");

    const { loading, currentUser, userPost, getUser } = useSelector((state) => state.user);
    const { likedComments, likedPosts } = useSelector((state) => state.like);
    const { userComment } = useSelector((state) => state.comment);
    const memoizedUserData = useMemo(() => currentUser?.data, [currentUser]);

    const memoizedUserDetails = useMemo(() => getUser?.data, [getUser]);
    const isViewingOwnProfile = username === memoizedUserData?.userName;


    const [isFollowed, setIsFollowed] = useState(false);

    // console.log("isFollowed:", isFollowed, new Date());

    const handleFollowBtn = (e, id) => {
        e.preventDefault()
        dispatch(toggleSubscription(id))
        setIsFollowed(!isFollowed)
    }

    useEffect(() => {
        setIsFollowed(getUser?.data?.isFollowed);
    }, [getUser]);

    // useEffect(()=>{

    //     dispatch(getCurrentUser());
    //     console.log("here",new Date)
    // },[])

    useEffect(() => {

        if (username) {
            dispatch(getUserDetails(username));
        }
    }, [username, isViewingOwnProfile]);


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
        return !likedPosts?.data?.length || likedPosts?.data?.length === 0 ?
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
        <Container className=' border-x pb-6  sm:w-[85%] lg:w-full border-gray-600 col-span-5 w-full min-h-min relative '>
            {/* Profile Header */}
            <div className=' flex justify-start items-center mb-1.5  bg-black/50 backdrop-blur-md sticky top-0 z-10'>
                <div onClick={() => navigate(-1)} className=' text-base sm:text-lg p-1 hover:bg-white/15 rounded-full text-center cursor-pointer h-1/12 mx-2'>
                    <FaArrowLeft />
                </div>
                <div className='mt-2.5 sm:w-2xl'>
                    <h1 className='font-semibold text-white text-lg sm:text-xl leading-tight truncate'>{memoizedUserDetails?.fullName || "Full Name"}</h1>
                    <h6 className='text-gray-500 text-sm/5 mb-1 sm:text-sm/4 truncate'>@{memoizedUserDetails?.userName || "username"}</h6>
                </div>
            </div>

            {/* Cover Image */}
            <div className=''>
                <X className="sm:max-h-48 sm:min-h-48 max-h-28 w-full" image={memoizedUserDetails?.coverImage?.url || "/default/deafaultCoverimage.png"} />
            </div>

            {/* Avatar */}
            <div className='sm:bottom-16 bottom-8 relative'>
                <Avatar profileImage={memoizedUserDetails?.profileImage?.url} classname=' border-3 sm:border-5 absolute inset-x-6 border-black/80 h-15 sm:w-32 w-15 sm:h-32' />
            </div>

            {/* Profile Info */}
            <div className='sm:ml-3.5 flex justify-between  gap-x-8 gap-y-1  border-white/35 min-h-32 mt-10 sm:mt-15 px-2 py-1.5'>
                <div className='flex flex-col justify-start items-start gap-2'>
                    <div>
                        <div className='font-semibold text-white text-lg sm:text-2xl  leading-tight truncate'>{memoizedUserDetails?.fullName || "Full Name"}</div>
                        <div className='text-gray-500  text-sm/4 sm:text-base/4 '>@{memoizedUserDetails?.userName || "username"}</div>
                    </div>
                    <p className=' font-sans text-white sm:text-lg  leading-tight my-1'>{memoizedUserDetails?.bio || ""}</p>
                    <div className=' text-[0.8rem] sm:text-[0.9rem] text-gray-300/60 flex justify-start items-center gap-2'>
                        <SlCalender />
                        <span>{formatJoinDate(memoizedUserDetails?.createdAt)}</span>
                    </div>
                    <div className={` text-gray-300/60 hover:text-gray-200/60 flex justify-start items-center gap-3 my-1 ${memoizedUserDetails?.link ? "" : "hidden"}`}>
                        <FaLink />
                        <a target="_blank" href={memoizedUserDetails?.link || ""}>{memoizedUserDetails?.link || ""}</a>
                    </div>
                    <div className='flex text-[0.8rem] sm:text-[0.9rem] my-2 justify-start gap-3.5 items-center'>
                    
                        <Link className='hover:underline' to={`/${memoizedUserDetails?.userName}/follower`}>
                            {memoizedUserDetails?.follower > 0 ? memoizedUserDetails?.follower ?? "0" : "0"} <span className='text-gray-500'>Followers</span>
                        </Link>
                        <Link className="hover:underline" to={`/${memoizedUserDetails?.userName}/following`}>
                            {memoizedUserDetails?.following > 0 ? memoizedUserDetails?.following ?? "0" : "0"} <span className='text-gray-500'>Following</span>
                        </Link>
                    </div>
                </div>
                <div className=''>
                    {!isViewingOwnProfile && (
                        <Button
                            className={` group   py-1 px-2  sm:px-4   font-semibold cursor-pointer    ${isFollowed ? "hover:border-red-500 hover:bg-red-500/10 hover:text-red-500 text-white border-white text-xs w-20 sm:w-28 sm:text-base border" : "bg-white text-black hover:bg-white/85 text-xs sm:text-base"}`}
                            onBtnClick={(e) => (handleFollowBtn(e, getUser?.data?._id))}
                        >
                            {isFollowed ?
                                <>
                                    <span className="block group-hover:hidden">Following</span>
                                    <span className="hidden group-hover:block">Unfollow</span>
                                </> : "Follow"}
                        </Button>
                    )}
                </div>
            </div>

            {/* Edit Profile and Verification */}
            {isViewingOwnProfile && <div className='w-full my-4 flex justify-evenly items-center text-xs sm:text-base'>
                <Link to="/compose/edit" className='relative'>
                    <span className='border border-white/20 hover:bg-blue-500/75 hover:shadow-2xs cursor-pointer transition rounded-2xl py-1 px-3.5 '>Edit profile</span>
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
            <div className='flex justify-around mx-1 sm:mx-2.5 my-2.5 items-center border-b border-gray-600 text-xs sm:text-base'>
                <div onClick={() => setActivityType("post")} className={`w-full text-center hover:bg-white/5 py-0.5 rounded-sm ${activityType === "post" ? "bg-white/15" : ""}`}>Post</div>
                <div onClick={() => setActivityType("replies")} className={`w-full text-center hover:bg-white/5 py-0.5 rounded-sm ${activityType === "replies" ? "bg-white/15" : ""}`}>Replies</div>
                {isViewingOwnProfile && <>
                    <div className={`w-full text-center hover:bg-white/5 py-0.5 rounded-sm ${activityType === "likePosts" ? "bg-white/15" : ""}} `} onClick={() => setActivityType("likePosts")}>Likes</div>
                    <div onClick={() => setActivityType("likeComments")} className={`w-full text-center hover:bg-white/5 py-0.5 rounded-sm px-1.5 whitespace-nowrap ${activityType === "likeComments" ? "bg-white/15" : ""}`} >Comments</div>
                </>}
            </div>

            {/* Display Content Based on Activity Type */}
            <div className=' text-black '>
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