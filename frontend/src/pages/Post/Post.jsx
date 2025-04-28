import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPostById } from "../../features/post/postSlice";
import { PostDetails } from "../../component";

import { getAllPostComments } from "../../features";

function Post(){
    const {postId} = useParams()

    
    
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