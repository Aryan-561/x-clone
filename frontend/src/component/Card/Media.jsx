import React, { useEffect, useRef } from "react";

let currentlyPlaying = null; // global variable to track currently playing video

const Media = ({ media }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const videoEl = videoRef.current;

        if (entry.isIntersecting) {
          // Pause any currently playing video
          if (currentlyPlaying && currentlyPlaying !== videoEl) {
            currentlyPlaying.pause();
          }

          // Play this video and set it as currently playing
          videoEl.play();
          currentlyPlaying = videoEl;
        } else {
          if (videoEl) {
            videoEl.pause();
          }
        }
      },
      { threshold: 0.8 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full my-3 bg-black outline outline-offset-1 outline-gray-600 rounded-2xl overflow-hidden">
      {media?.resourseType === "image" ? (
        <img
          src={media.url}
          className="w-full h-auto object-contain max-h-[500px]"
          alt=""
        />
      ) : (
        <video
          className="w-full h-auto object-contain max-h-[500px]"
          ref={videoRef}
          muted
          controls
          loop
          playsInline
          src={media.url}
        ></video>
      )}
    </div>
  );
};

export default Media;
