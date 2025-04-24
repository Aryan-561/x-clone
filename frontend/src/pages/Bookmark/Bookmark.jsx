import React, {useState, useMemo, useEffect} from "react";
import { Link } from "react-router-dom";
import { Container, EventLoading, Card} from '../../component'
import { useDispatch, useSelector } from "react-redux";
import { getAllbookmarkedComment, getAllbookmarkedPost } from "../../features/bookmark/bookmarkSlice";
function Bookmark (){
    const [type, setType] = useState("post")
    const {error, message, status, bookmarkedPost, bookmarkedComment, loading } = useSelector(state=>state.bookmark)

    const dispatch = useDispatch()

      const memoizedPostList = useMemo(() => {
        if (type !== "post" || loading) return null;
        return bookmarkedPost.length===0?<div className="w-full h-[40vh] flex justify-center items-center text-lg text-center sm:text-xl lg:text-2xl font-semibold"><div>You doesn't bookmarked any post.</div></div>:bookmarkedPost.map((post) => (
            <Link to={`/${post?.userDetails?.username}/post/${post?._id}`} key={post?._id}>
                <Card data={post} />
            </Link>
        ));
    }, [type, loading, bookmarkedPost]);
    
    const memoizedCommentList = useMemo(() => {
        if (type !== "comment" || loading) return null;
        return bookmarkedComment.length===0?<div className="w-full h-[40vh] flex justify-center items-center text-lg text-center sm:text-xl  lg:text-2xl font-semibold"><div>You doesn't bookmarked any commnet.</div></div>: bookmarkedComment.map((comment) => (
            <Link to={`/${comment?.userDetails?.username}/comment/${comment?._id}`} key={comment?._id}>
                <Card data={comment} />
            </Link>
        ));
    }, [type, loading, bookmarkedComment]);
    
    useEffect(() => {
        if (type === "post") {
          dispatch(getAllbookmarkedPost());
        } else {
          dispatch(getAllbookmarkedComment());
        }
      }, [type, dispatch]);

    return (
        <>
            <Container className=' col-span-5 w-full sm:w-[85%] lg:w-full   pb-4 border border-t-0 border-gray-600'>
                <div className=" p-2 pl-4 font-black  text-xl">Bookmarks</div>
                <div className="text-white flex justify-evenly items-center  border-b border-gray-600 bg-black/50 backdrop-blur-md sticky top-0 xl:text-lg font-semibold">
                    <button 
                        className={`p-2 border-b-4 ${type=="post"?" border-sky-400":"border-b-transparent"}`}
                        onClick={()=>{dispatch(setType("post"))}}
                    >Post</button>
                    <button 
                        className={`p-2 border-b-4 ${type=="comment"?" border-sky-400":"border-b-transparent"}`}
                        onClick={()=>{setType("comment")}}
                    >Comment</button>
                </div>

                <div>
                    {loading ? (
                        <EventLoading />
                            ) : (
                        <>
                        {type === "post" && memoizedPostList}
                        {type === "comment" && memoizedCommentList}
                        </>
                    )}
                    

                </div>
            </Container>
        </>
    )
}

export default Bookmark;