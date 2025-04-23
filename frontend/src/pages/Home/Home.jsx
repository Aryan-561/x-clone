import React, { useState } from 'react'
import { Container, EventLoading, Card, CreatePost} from '../../component'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPost, getFollowingUserPost } from '../../features/post/postSlice'
import { Link } from 'react-router-dom'
function Home() {
    const [feedType, setFeedType] =  useState("for you")

    const {error, message, loading, allPost, followingUserPost} =  useSelector(state=>state.post)
    // console.log(state)

    const dispatch = useDispatch()
    const data = {
    _id: "67e56f660c5450ddd5a2dd68",
    text: "abc-1",
    media: {
      url: "https://res.cloudinary.com/dnnpmvrds/image/upload/v1743089529/tweetDb/wgnzwip71cgkljusjjtc.png",
      publicId: "tweetDb/wgnzwip71cgkljusjjtc",
      resourseType: "image",
    },
    views: 0,
    likeCount: 0,
    commentCount: 0,
    isLiked: false,
    isBookmarked: false,
    userDetails: {
      userId: "67e56f4b0c5450ddd5a2dd60",
      fullName: "arnav",
      profileImage: {
        url: "https://res.cloudinary.com/dnnpmvrds/image/upload/v1743089502/tweetDb/avqlmw2cvezc26zadtww.png",
        publicId: "tweetDb/avqlmw2cvezc26zadtww",
      },
      bio: "arnav",
      follower: 1,
      following: 2,
    },
    createdAt: "2025-03-27T15:31:50.160Z",
    updatedAt: "2025-03-27T15:31:50.160Z",
  };



    return (
        <>
            <Container className=' col-span-5 w-full  sm:w-[85%] lg:w-full   pb-4 border border-t-0 border-gray-600'>
                <div className="text-white flex justify-evenly items-center border-l border-b border-gray-600 bg-black/50 backdrop-blur-md sticky top-0 xl:text-lg font-semibold">
                    <button 
                        className={`p-2 border-b-4 ${feedType=="for you"?" border-sky-400":"border-b-transparent"}`}
                        onClick={()=>{dispatch(getAllPost())
                            setFeedType("for you")}}
                    >For You</button>
                    <button 
                        className={`p-2 border-b-4 ${feedType=="following"?" border-sky-400":"border-b-transparent"}`}
                        onClick={()=>{dispatch(getFollowingUserPost())
                            setFeedType("following")}}
                    >Following</button>
                </div>

                <div>
                    <CreatePost classname={""} />
                    {
                        feedType=="for you" && (loading?(<EventLoading/>):(allPost.map(post=>(
                            <Link to={`/${post?.userDetails?.username}/post/${post?._id}`} key={post?._id}>
                            <Card data={post}/>
                            </Link>
                        ))))
                    }
                    {
                        feedType=="following" && (loading?(<EventLoading/>):(followingUserPost.map(post=>(
                            <Link to={`/${post?.userDetails?.username}/post/${post?._id}`} key={post?._id}>
                            <Card data={post}/>
                            </Link>
                        ))))
                    }
                    <Link to={`/${data?.username}/post/${data?._id}`}>
                        <Card data={data}/>
                    </Link>
                    <Link to={`/${data?.username}/post/${data?._id}`}>
                        <Card data={data}/>
                    </Link>
                    <Link to={`/${data?.username}/post/${data?._id}`}>
                        <Card data={data}/>
                    </Link>
                    

                </div>
            </Container>
        </>
    )
}

export default Home
