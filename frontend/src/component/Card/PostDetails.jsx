import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Container, CreatePost, EventLoading, FormattingTime } from "..";
import { FaArrowLeft } from "react-icons/fa6";
import Avatar from "./Avatar";
import { toggleSubscription } from "../../features/subscription/subscriptionSlice";
import Media from "./Media";
import ActionBar from "./ActionBar";


function PostDetails() {
  const navigate = useNavigate();
  const { error, message, loading, post } = useSelector((state) => state.post);

  const commentState = useSelector(state => state.comment)

  const [isFollowed, setIsFollowed] = useState(
    post?.userDetails?.isFollowed || true
  );
  useEffect(() => {
    setIsFollowed(post?.userDetails?.isFollowed);
  }, [post]);
  

  const dispatch = useDispatch();

  const handleFollowBtn = () => {
    dispatch(toggleSubscription(post?.userDetails?.userId));
    setIsFollowed(true);
  };
  return (
    <>
      <Container className="col-span-5 w-full sm:w-[85%] lg:w-full   pb-4 border border-t-0 border-gray-600">
        {loading ? (
          <EventLoading />
        ) : (
          <>
            <div>
              <div className="flex space-x-1 sm:space-x-4 py-1 sm:py-2  px-4 z-1 sticky top-0 bg-black/70 backdrop-blur-sm ">
                <button
                  className="hover:bg-white/10 p-2 rounded-full cursor-pointer"
                  onClick={(e) => navigate(-1)}
                >
                  <FaArrowLeft />
                </button>
                <div className="text-lg sm:text-xl font-bold ">Post</div>
              </div>
              <div className="flex flex-col gap-1 text-white   bg-black   border-b border-gray-600 p-2 sm:p-4 ">
                <div className="flex items-center justify-between">
                  <Link className="flex items-center gap-2" to={`/${post?.userDetails?.username}`}>
                    <Avatar userDetails={post?.userDetails} />
                    <div className="flex flex-col">
                      <div className="font-bold text-xs/5   sm:text-lg/5 p-0 m-0">
                        {post?.userDetails?.fullName}
                      </div>
                      <div className="text-gray-400 text-xs/5  sm:text-base/5 p-0 m-0">
                        @{post?.userDetails?.username}
                      </div>
                    </div>
                  </Link>
                  {!isFollowed && (
                    <Button
                      className={`bg-white text-black py-1 px-3 font-semibold cursor-pointer hover:bg-white/85`}
                      onBtnClick={handleFollowBtn}
                    >
                      Follow
                    </Button>
                  )}
                </div>
                <div>

                  <div className="text-sm sm:text-lg py-2">{post?.text}</div>
                  <div>{post?.media && <Media media={post?.media} />}</div>
                </div>

                <div className="font-mono flex gap-2">
                  {post?.createdAt && <FormattingTime timestamp={post?.createdAt} isFullDetails={true} />}
                  <div className=" text-gray-400">
                    <div className="h-[3px] w-[3px] rounded-full bg-gray-400 relative top-1.5 sm:top-3"></div>
                  </div>
                  <div className="text-gray-400 text-xs sm:text-base">
                    {post?.views || 0} Views
                  </div>
                </div>

                <ActionBar
                  commentCount={post?.commentCount}
                  likeCount={post?.likeCount}
                  isLiked={post?.isLiked}
                  isBookmarked={post?.isBookmarked}
                  views={post?.views}
                  id={post?._id}
                  className={'border-y border-gray-600 py-2'}
                />

              </div>
              <div>
                <CreatePost isPost={false} />
              </div>
              {commentState?.loading && <EventLoading />}
              {commentState?.comments?.map((comment, index) => (
                <Link to={`/${comment?.userDetails?.username}/comment/${comment?._id}`} key={comment?._id}>
                  <Card data={comment} forPost={false} />
                </Link>
              ))}
              
            </div>
          </>
        )}
      </Container>
    </>
  );
}

export default PostDetails;
