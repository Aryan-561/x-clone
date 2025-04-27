import React from "react";
import Avatar from "./Avatar";
import Media from "./Media";
import ActionBar from "./ActionBar";
import ProfileHeader from "./ProfileHeader";

function Card({ data, postData, commentData }) {

  console.log("data", commentData?.commentDetails?._id)
  // console.log("postdata",postData)


  return (
    <>
      <div className="text-white   bg-black   border-b border-gray-600 p-2 sm:p-4 ">
        <div className="flex gap-2">

          {/* Profile image */}
          <Avatar commentData={commentData?.commentOwnerDetails} postOwnerDetails={postData?.postOwnerDetails} userDetails={data?.userDetails || data?.createdBy} />
          <div className="w-[80%]">
            <div className="flex flex-row ">

              <ProfileHeader commentOwnerDetails={commentData?.commentOwnerDetails} postOwnerDetails={postData?.postOwnerDetails} userDetails={data?.userDetails || data?.createdBy} classname={""} timestamp={postData?.postDetails?.createdAt || data?.createdAt || commentData?.commentDetails?.createdAt} />


            </div>

            {/* text or content */}
            <div className="text-sm sm:text-lg  ">{data?.text || postData?.postDetails?.text || commentData.commentDetails.text}</div>

            {/* Media  */}
            {(data?.media || postData?.postDetails?.media || commentData?.commentDetails?.media) && (
              <Media media={data?.media || postData?.postDetails?.media || commentData?.commentDetails?.media} />
            )}

            <ActionBar
              commentCount={data?.commentCount || postData?.postDetails?.commentCount || commentData?.commentDetails?.commentCount}
              likeCount={data?.likeCount || postData?.postDetails?.likeCount || commentData?.commentDetails?.likeCount}
              isLiked={data?.isLiked || postData?.postDetails?.isLiked || commentData?.commentDetails?.isLiked}
              isBookmarked={data?.isBookmarked || postData?.postDetails?.isBookmarked || commentData?.commentDetails?.isBookmarked}
              views={data?.views || postData?.postDetails?.views || commentData?.commentDetails?.views}
              postId={data?._id || postData?.postDetails?._id }
              commentId={commentData?.commentDetails?._id}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;


