import React from "react";
import Avatar from "./Avatar";
import Media from "./Media";
import ActionBar from "./ActionBar";
import ProfileHeader from "./ProfileHeader";

function Card({ data }) {
 


  return (
    <>
      <div className="text-white   bg-black   border-b border-gray-600 p-2 sm:p-4 ">
        <div className="flex gap-2">

          {/* Profile image */}
          <Avatar userDetails={data?.userDetails || data?.createdBy} />
          <div className="w-[80%]">
            <div className="flex flex-row ">

              <ProfileHeader userDetails={data?.userDetails||data?.createdBy} classname={""} timestamp={data?.createdAt} />

              
            </div>

            {/* text or content */}
            <div className="text-sm sm:text-lg  ">{data?.text}</div>

            {/* Media  */}
            {data?.media && (<Media media={data?.media} />)}

            <ActionBar
              commentCount={data?.commentCount}
              likeCount={data?.likeCount}
              isLiked={data?.isLiked}
              isBookmarked={data?.isBookmarked}
              views={data?.views}
              postId={data?._id}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;


