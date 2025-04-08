import React, { useState } from "react";
import Button from "../Button/Button";
import Avatar from "./Avatar";
import Media from "./Media";
import ActionBar from "./ActionBar";
import ProfileHeader from "./ProfileHeader";
function Card({ onClickLikeBtn }) {
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
      <div className="text-white bg-black   border-2 border-gray-600 p-4 ">
        <div className="flex gap-2">

          {/* Profile image */}
          <Avatar/>
          <div className="w-[80%] ">
            <div className="flex flex-row gap-1 items-center ">
              
              <ProfileHeader userDetails={data?.userDetails} classname={"flex-row items-center gap-1 "} />

              <div className=" text-gray-400">
                <div className="h-[3px] w-[3px] rounded-full bg-gray-400 relative top-0.5"></div>
              </div>

              <div className="text-gray-400">5 April, 2025</div>
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
              views={data.views}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
  

