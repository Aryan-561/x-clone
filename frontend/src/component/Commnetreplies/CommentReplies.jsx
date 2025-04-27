import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComment, getCommentReplies } from "../../features";
import { useParams, Link } from "react-router-dom"; // added Link import
import { Card } from "..";

function CommentReplies() {
    const dispatch = useDispatch();
    const { postId, commentId } = useParams();

    const { replies, loading, commentByid } = useSelector((state) => state.comment);

    useEffect(() => {
        if (postId && commentId) {
            dispatch(getCommentReplies({ postId, commentId }));
            dispatch(getComment(commentId));
        }
    }, [dispatch, postId, commentId]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="col-span-5 w-full sm:w-[85%] lg:w-full pb-4 border border-t-0 border-gray-600">
            {commentByid?.data?.[0] && (
                <Link to={`/post/${postId}/comment/${commentByid.data[0]._id}`}>
                    <Card data={commentByid.data[0]} forPost={false} />
                </Link>
            )}

            {replies?.data?.length > 0 ? (
                replies.data.map((reply, index) => (
                    <Link
                        key={reply._id || index}
                        to={`/post/${postId}/comment/${reply._id}`}
                    >
                        <Card data={reply} forPost={false} />
                    </Link>
                ))
            ) : (
                <div className="text-center text-gray-400 my-4">No replies yet</div>
            )}
        </div>
    );
}

export default CommentReplies;
