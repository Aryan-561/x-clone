import React from "react";
import { FormattingTime } from "../index";
const ProfileHeader = ({ userDetails, postOwnerDetails, commentOwnerDetails
  , classname, timestamp }) => {
  return (
    <>
      <div className={`flex flex-col sm:flex-row sm:gap-1 ${classname}`}>
        <div className="font-bold text-xs   sm:text-lg">
          {userDetails?.fullName ||  postOwnerDetails?.fullName || commentOwnerDetails?.fullName ||"hello"}
        </div>

        <div className="flex space-x-1">

          <div className="text-gray-400 text-xs sm:text-base">
            {userDetails?.username ||postOwnerDetails?.userName|| commentOwnerDetails?.userName||"@abc"}
          </div>
          <div className=" text-gray-400">
            <div className="h-[3px] w-[3px] rounded-full bg-gray-400 relative top-1.5 sm:top-3"></div>
          </div>

          <FormattingTime timestamp={timestamp} />
        </div>
      </div>
    </>
  )
}

export default ProfileHeader;