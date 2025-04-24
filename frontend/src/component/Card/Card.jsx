import React from "react";
import Avatar from "./Avatar";
import Media from "./Media";
import ActionBar from "./ActionBar";
import ProfileHeader from "./ProfileHeader";
function Card({ data }) {
 


  return (
    <>
      <div className="text-white   bg-black   border-b border-gray-600 p-4 ">
        <div className="flex gap-2">

          {/* Profile image */}
          <Avatar userDetails={data?.userDetails || data?.createdBy} />
          <div className="w-[80%] ">
            <div className="flex flex-row gap-1 items-center ">

              <ProfileHeader userDetails={data?.userDetails||data?.createdBy} classname={"flex-row items-center gap-1 "} />

              <div className=" text-gray-400">
                <div className="h-[3px] w-[3px] rounded-full bg-gray-400 relative top-0.5"></div>
              </div>

              <div className="text-gray-400 text-sm sm:text-base">5 April, 2025</div>
            </div>

            {/* text or content */}
            <div className="">{data?.text}</div>

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


