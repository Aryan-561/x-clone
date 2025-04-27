import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getPostById } from "../../features/post/postSlice";
import { Card, PostDetails } from "../../component";
import { FaArrowLeft } from "react-icons/fa6";
import { getAllPostComments } from "../../features";

function Post(){
    const {postId} = useParams()
    const location = useLocation()
    console.log("Location",location)
    const {error, message, loading, post} = useSelector(state=>state.post)
    
    const dispatch = useDispatch()

    console.log("PostId:",String(postId))
    useEffect(()=>{
        dispatch(getPostById(postId))
        dispatch(getAllPostComments({postId}))
    },[dispatch])
    
    
    return(
        <>
        
            <PostDetails/>
            
        </>
    )
}

export default Post;