import React, { useState } from "react";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { toggleCommentLike, togglePostLike } from "../../features";
import { toggleBookmarkedComment, toggleBookmarkedPost } from "../../features/bookmark/bookmarkSlice";
const ActionBar = ({
  commentCount = 0,
  likeCount = 0,
  isLiked=false,
  isBookmarked=false,
  views = 0,
  id = null,
  forPost=true,
  className,
}) => {

  const [likeStatus, setLikeStatus] = useState(isLiked || false);

  const [bookmarkedStatus, setBookmarkedStatus] = useState(
    isBookmarked || false
  );

  const [like, setLike] = useState(likeCount || 0);
  const dispatch = useDispatch();

  // handler for like button
  const onClickLikeBtn = (e) => {
    e.preventDefault();
    forPost?dispatch(togglePostLike(id)):dispatch(toggleCommentLike(id))
    setLikeStatus((prevStatus) => {
      if (!prevStatus) {
        setLike(like + 1);
      } else {
        setLike(like - 1);
      }
      return !prevStatus;
    });

  };

  // handler for bookmarked button
  const onClickBookmarkBtn = (e) => {
    e.preventDefault();
    forPost?dispatch(toggleBookmarkedPost(id)):dispatch(toggleBookmarkedComment(id))
    setBookmarkedStatus(!bookmarkedStatus);
  };

  return (
    <>
      <div className={`flex justify-evenly  mt-3 text-xs sm:text-base ${className} `}>
        {/* comment  */}
        <div>
          <Button
            floatingText="Reply"
            className={`w-10 h-10  hover:bg-sky-500/15 rounded-full`}
            onBtnClick={e=>e.preventDefault()}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="fill-gray-500 w-5 sm:w-6 lg:w-7 group-hover:fill-sky-500 transition-all dealy-400  r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"
            >
              <g>
                <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
              </g>
            </svg>
            <span className="text-white absolute right-[-10%] top-[20%] group-hover:text-sky-400">
              {commentCount ? commentCount : ""}
            </span>
          </Button>
        </div>

        {/* like */}
        <div>
          <Button
            className={`w-10 h-10  hover:bg-pink-500/20 rounded-full`}
            floatingText="Like"
            onBtnClick={onClickLikeBtn}
          >
            {likeStatus ? (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="currentColor"
                className=" text-pink-500 active:scale-80  w-5 sm:w-6 lg:w-7 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"
              >
                <g>
                  <path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                </g>
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="currentColor"
                className=" text-gray-500 group-hover:text-pink-500 active:scale-80 transition-all dealy-400 w-5 sm:w-6 lg:w-7 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"
              >
                <g>
                  <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                </g>
              </svg>
            )}

            <span className="text-white absolute right-[5%] top-[28%] sm:right-[-10%] sm:top-[20%] group-hover:text-pink-400">
              {like ? like : ""}
            </span>
          </Button>
        </div>

        {/* views */}
        <div>
          <Button
            className="w-10 h-10 hover:bg-sky-600/20 rounded-full"
            floatingText="Views"
            onBtnClick={e=>e.preventDefault()}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="fill-gray-500 group-hover:fill-sky-600 transition-all dealy-400 w-5 sm:w-6 lg:w-7  r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"
            >
              <g>
                <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path>
              </g>
            </svg>
            <span className="text-white absolute right-[-10%] top-[20%] group-hover:text-sky-400">
              {views ? views : ""}
            </span>
          </Button>
        </div>

        {/* bookmark */}
        <div>
          <Button
            className="w-10 h-10  hover:bg-sky-500/20 rounded-full"
            floatingText="Bookmark"
            onBtnClick={onClickBookmarkBtn}
          >
            {bookmarkedStatus?(
              <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="fill-sky-500 w-5 sm:w-6 lg:w-7 active:scale-80 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi">
              <g>
                <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5z"></path>
              </g>
            </svg>
            
            ):(<svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="fill-gray-500 group-hover:fill-sky-500 active:scale-80 transition-all dealy-400 w-5 sm:w-6 lg:w-7 r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi"
            >
              <g>
                <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path>
              </g>
            </svg>)}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ActionBar;
