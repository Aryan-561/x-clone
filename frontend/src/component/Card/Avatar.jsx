import React from "react";

const Avatar = ({ userDetails, classname="w-8 h-8 sm:w-12 sm:h-12 xl:w-14 xl:h-14", profileImage = "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
}) => {
  return (
    <>
      <div className={`rounded-full overflow-hidden ${classname}`}>
        <img
          src={
            userDetails?.profileImage?.url || profileImage || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"

          }
          className="w-full h-full rounded-full"
          alt="profile-img"
        />
      </div>
    </>
  )
}

export default Avatar;