import React, { useState , useEffect, useMemo} from 'react'
import { Container, EventLoading, Card, CreatePost} from '../../component'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPost, getFollowingUserPost } from '../../features/post/postSlice'
import { Link } from 'react-router-dom'
function Home() {
    const [feedType, setFeedType] =  useState("for you")

    const {error, message, loading, allPost, followingUserPost} =  useSelector(state=>state.post)
    // console.log(state)
    const dispatch = useDispatch()


    const memorizeForYouPost = useMemo(()=>{
        if (feedType !== "for you" || loading) return null;
                return allPost.length===0?<div className="w-full h-[40vh] flex justify-center items-center text-lg sm:text-xl lg:text-2xl font-semibold"><div>Posts not Found!</div></div>:allPost.map((post) => (
                    <Link to={`/${post?.userDetails?.username}/post/${post?._id}`} key={post?._id}>
                        <Card data={post} />
                    </Link>
                ));
    },[ allPost, feedType])

    const memorizeFollowingUserPost = useMemo(()=>{
        if (feedType !== "following" || loading) return null;
                return followingUserPost.length===0?<div className="w-full h-[40vh] flex justify-center items-center text-lg sm:text-xl lg:text-2xl font-semibold"><div>Posts not Found!</div></div>:followingUserPost.map((post) => (
                    <Link to={`/${post?.userDetails?.username}/post/${post?._id}`} key={post?._id}>
                        <Card data={post} />
                    </Link>
                ));
    },[ followingUserPost, feedType])

    useEffect(() => {
            if (feedType === "for you") {
                dispatch(getAllPost());
            } else {
                dispatch(getFollowingUserPost());
            }
            }, [feedType]);

    
    return (
        <>
            <Container className=' col-span-5 w-full sm:w-[85%] lg:w-full   pb-4 border border-t-0 border-gray-600'>
                <div className="text-white z-1 flex justify-evenly items-center border-l border-b border-gray-600 bg-black/50 backdrop-blur-md sticky top-0 xl:text-lg font-semibold">
                    <button 
                        className={`p-2 border-b-4 ${feedType=="for you"?" border-sky-400":"border-b-transparent"}`}
                        onClick={()=>{setFeedType("for you")}}
                    >For You</button>
                    <button 
                        className={`p-2 border-b-4 ${feedType=="following"?" border-sky-400":"border-b-transparent"}`}
                        onClick={()=>{setFeedType("following")}}
                    >Following</button>
                </div>

                <div>
                    <CreatePost classname={""} />
                   {loading && <EventLoading />}
                       
                           {feedType === "for you" && memorizeForYouPost}
                           {feedType === "following" && memorizeFollowingUserPost}
                       
                    

                </div>
            </Container>
        </>
    )
}

export default Home
