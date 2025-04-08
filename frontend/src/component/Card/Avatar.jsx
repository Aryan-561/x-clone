import React from "react";

const Avatar = ({userDetails, classname})=>{

    return(
        <>
            <div className={`rounded-full  w-12 h-12 overflow-hidden ${classname}`}>
            <img
              src={
                userDetails?.profileImage.url ||
                "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
              }
              className="w-full h-full rounded-full"
              alt="profile-img"
            />
          </div>
        </>
    )
}

export default Avatar;