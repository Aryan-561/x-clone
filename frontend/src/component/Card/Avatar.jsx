import React from "react";

const Avatar = ({ userDetails, postOwnerDetails, commentData
  , classname = "w-8 h-8 sm:w-10 sm:h-10", profileImage = "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
}) => {

  const defaultImg = "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png";

  const [hasLoaded, setHasLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const handleLoading = () => {
    setHasError(false);
    setHasLoaded(true);
  }

  const handleError = () => {
    setHasError(true);
  }

  return (
    <>
      <div className={`rounded-full overflow-hidden ${classname}`}>
        {(!hasLoaded || hasError) && <img src={defaultImg} draggable='false' className="w-full h-full rounded-full" alt="profile-img" />}

        
        {!hasError && <img
          src={`${userDetails?.profileImage?.url || profileImage}`}
          draggable='false'
          className={`w-full h-full rounded-full ${hasLoaded?'block':'hidden'}`}
          alt="profile-img"
          onLoad={handleLoading}
          onError={handleError}
        />}
      </div>
    </>
  )
}

export default Avatar;