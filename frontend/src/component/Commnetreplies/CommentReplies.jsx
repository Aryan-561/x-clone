import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {  Link, useNavigate } from "react-router-dom"; // added Link import
import { Card, CreatePost, EventLoading, FormattingTime ,ActionBar, Avatar, Button} from "..";
import { FaArrowLeft } from "react-icons/fa6";
import { toggleSubscription } from "../../features/subscription/subscriptionSlice";
function CommentReplies() {
    
    const { replies, loading, commentByid } = useSelector((state) => state.comment);
    console.log(commentByid)
    
    
    const navigate =useNavigate()
    const dispatch = useDispatch();
    
    

    const handleFollowBtn = () => {
        dispatch(toggleSubscription(post?.userDetails?.userId));
        setIsFollowed(true);
      };
    
    return (
        <div className="col-span-5 w-full sm:w-[85%] lg:w-full pb-4 border border-t-0 border-gray-600 relative">
              {loading && <EventLoading className="absolute top-1/2 left-1/2" />}
              <div className="flex space-x-1 sm:space-x-4 py-1 sm:py-2  px-4 z-1 sticky top-0 bg-black/70 backdrop-blur-sm ">
                <button
                  className="hover:bg-white/10 p-2 rounded-full cursor-pointer"
                  onClick={(e) => navigate(-1)}
                >
                  <FaArrowLeft />
                </button>
                <div className="text-lg sm:text-xl font-bold ">Comment</div>
              </div>
              <div className="flex flex-col gap-1 text-white   bg-black   border-b border-gray-600 p-2 sm:p-4 ">
                <div className="flex items-center justify-between">
                  <Link className="flex items-center gap-2" to={`/${commentByid?.userDetails?.username}`}>
                    <Avatar userDetails={commentByid?.userDetails} />
                    <div className="flex flex-col">
                      <div className="font-bold text-xs/5   sm:text-lg/5 p-0 m-0">
                        {commentByid?.userDetails?.fullName}
                      </div>
                      <div className="text-gray-400 text-xs/5  sm:text-base/5 p-0 m-0">
                        @{commentByid?.userDetails?.username}
                      </div>
                    </div>
                  </Link>
                  {!commentByid?.userDetails?.isFollowed || false && (
                    <Button
                      key={commentByid?._id}
                      className={`bg-white text-black py-1 px-3 font-semibold cursor-pointer hover:bg-white/85`}
                      onBtnClick={handleFollowBtn}
                    >
                      Follow
                    </Button>
                  )}
                </div>
                <div>

                  <div className="text-sm sm:text-lg py-2">{commentByid?.text}</div>
                </div>

                <div className="font-mono flex gap-2">
                  {commentByid?.createdAt && <FormattingTime key={commentByid?._id} timestamp={commentByid?.createdAt} isFullDetails={true} />}
                  <div className=" text-gray-400">
                    <div className="h-[3px] w-[3px] rounded-full bg-gray-400 relative top-1.5 sm:top-3"></div>
                  </div>
                  <div className="text-gray-400 text-xs sm:text-base">
                    {commentByid?.views || 0} Views
                  </div>
                </div>
                
                <ActionBar
                  key={commentByid?._id}
                  commentCount={commentByid?.commentCount}
                  likeCount={commentByid?.likeCount}
                  isLiked={commentByid?.isLiked}
                  isBookmarked={commentByid?.isBookmarked}
                  views={commentByid?.views}
                  id={commentByid?._id}
                  className={'border-y border-gray-600 py-2'}
                  forPost={false}
                />

              </div>
              
            <div>
                <CreatePost key={commentByid?._id} isPost={false} forReply={true} />
              </div>

              

            {replies.length > 0 ? (
                replies.map((reply, index) => (
                    <Link
                        key={reply._id || index}
                        to={`/${reply?.userDetails?.username}/comment/${reply._id}`}
                    >
                        <Card data={reply} forPost={false} />
                    </Link>
                ))
            ) : (
                <div className="text-center text-gray-400 my-4">No replies yet</div>
            )}
        </div>
    );
}

export default CommentReplies;
