import React ,{useEffect} from "react"
import CommentReplies from "../../component/Commnetreplies/CommentReplies";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getComment, getCommentReplies } from "../../features";


function Comment(){

    const {commentId} = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getComment(commentId))
        dispatch(getCommentReplies({commentId}))
    },[dispatch, commentId])
    return(
        <>
            <CommentReplies/>
        </>
    )
}

export default Comment;