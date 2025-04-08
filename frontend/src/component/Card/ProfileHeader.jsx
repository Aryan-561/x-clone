import React from "react";

const ProfileHeader = ({userDetails, classname})=>{
    return(
        <>
            <div className={`flex ${classname}`}>
            <div className="font-bold text-lg">
                {userDetails?.fullName || "abc"}
              </div>

              <div className="text-gray-400">
                {userDetails?.username || "@abc"}
              </div>
            </div>
        </>
    )
}

export default ProfileHeader;