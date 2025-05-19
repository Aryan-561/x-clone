import React, { useState } from "react";
import Avatar from "./Avatar";
import Media from "./Media";
import ActionBar from "./ActionBar";
import ProfileHeader from "./ProfileHeader";
import { FiTrash2 } from "react-icons/fi";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../features/post/postSlice";
import { deleteComment } from "../../features";
function Card({ data, forPost=true }) {
  const [isDeleted, setIsDeleted] = useState(false)
  const user = useSelector(state=>state?.user?.currentUser?.data)
  

  const dispatch = useDispatch()

  const handleDeleteBtn = (e)=>{
    e.preventDefault()
    if((data?.userDetails?.userId==user?._id || data?.createdBy?._id==user?._id) && forPost){
      const postId = data._id
      dispatch(deletePost(postId))
      setIsDeleted(true)
      console.log(data._id," Post deleted.")
    }
    if((data?.userDetails?.userId==user?._id||data?.commentBy?._id==user?._id)&& !forPost){
      const commentId = data._id
      dispatch(deleteComment({commentId}))
      setIsDeleted(true)
      console.log(data._id," Comment deleted.")
    }
  }

  return (
    <>
      {!isDeleted &&
        <div className="text-white   bg-black   border-b border-gray-600 p-2 sm:p-4 ">
        <div className="flex gap-2 relative">
          {user?._id && (data?.userDetails?.userId==user?._id || data?.createdBy?._id==user?._id || data?.commentBy?._id==user?._id) &&
          <div className="absolute right-1 sm:right-2 top-1">
            <Button  className={`hover:bg-white/10 hover:text-red-500 p-2 rounded-full cursor-pointer text-center`} onBtnClick={handleDeleteBtn}>
              <FiTrash2/>
            </Button>
          </div>}
          <div>
            
          </div>

          {/* Profile image */}
          <Avatar userDetails={data?.userDetails || data?.createdBy || data?.commentBy} />
          <div className="w-[80%]">
            <div className="flex flex-row ">

              <ProfileHeader userDetails={data?.userDetails || data?.createdBy || data?.commentBy} classname={""} timestamp={data?.createdAt} />


            </div>

            {/* text or content */}
            <div className="text-sm sm:text-lg  ">{data?.text}</div>

            {/* Media  */}
            {(data?.media) && (
              <Media media={data?.media} />
            )}

            <ActionBar
              commentCount={data?.commentCount}
              likeCount={data?.likeCount}
              isLiked={data?.isLiked}
              isBookmarked={data?.isBookmarked}
              views={data?.views}
              id={data?._id}
              forPost={forPost}
            />
          </div>
        </div>
      </div>}
    </>
  );
}

export default Card;