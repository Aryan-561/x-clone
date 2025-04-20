import React from "react";

const Avatar = ({ userDetails, classname = "w-12 h-12", profileImage = "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
}) => {

  return (
    <>
      <div className={`rounded-full overflow-hidden ${classname}`}>
        <img
          src={
            userDetails?.profileImage.url || profileImage || "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"

          }
          className="w-full h-full rounded-full"
          alt="profile-img"
        />
      </div>
    </>
  )
}

export default Avatar;