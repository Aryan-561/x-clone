import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Avatar, Button, EventLoading } from "../../component";
import { FaArrowLeft } from "react-icons/fa6";
import {
  getUserFollower,
  getUserFollowing,
  toggleFollowBtn,
  toggleSubscription,
} from "../../features/subscription/subscriptionSlice";

import { getUserDetails } from "../../features";

function UserList({connectionType}) {
  const {username} = useParams()
 
  const [users, setUsers] = useState([]);
  const { getUser, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { follower, following, loading } = useSelector((state) => state.subscription);
  
  const userId = getUser?.data?._id;
  const currentUserId = currentUser?.data?._id;
  const isCurrentUser = userId == currentUserId
  useEffect(()=>{
    dispatch(getUserDetails(username))
  },[username])
  useEffect(() => {
    if (!userId) return;
  
    if (connectionType === "follower") {
      dispatch(getUserFollower(userId));
    } else {
      dispatch(getUserFollowing(userId));
    }
  }, [connectionType, getUser, dispatch]);
  
  useEffect(() => {
    setUsers(connectionType === "follower" ? follower : following);
  }, [follower, following, connectionType]);

  const handleFollowBtn=(e, id)=>{
    e.preventDefault()
    dispatch(toggleSubscription(id))
    dispatch(toggleFollowBtn({id, connectionType}))
  }

  return (
    <>
      <Container className=" col-span-5 w-full sm:w-[85%] lg:w-full   pb-4 border border-t-0 border-gray-600">
      {<>
        <div className="  z-1 sticky top-0 bg-black/70 backdrop-blur-sm ">
          <div className="flex space-x-1 sm:space-x-4 py-1 sm:py-2  px-4">

          <button
            className="hover:bg-white/10 p-2 rounded-full cursor-pointer"
            onClick={(e) => navigate(-1)}
            >
            <FaArrowLeft />
          </button>
          <div>

          <div className="text-lg sm:text-xl font-bold ">{getUser?.data?.fullName}</div>
          <div className="text-gray-400  text-xs/5  sm:text-xs/4 p-0 m-0">@{getUser?.data?.userName}</div>
          </div>
        </div>
        <div className="text-white grid grid-cols-2  border-b border-gray-600 bg-transparent xl:text-lg font-semibold">
          <button
            className={` flex items-center justify-center cursor-pointer hover:bg-white/10 `}
            onClick={() => {
              navigate(`/${username}/follower`)
            }}
            >
            <div className={`py-2 border-b-4 ${
              connectionType == "follower"
              ? " border-sky-400"
              : "border-b-transparent"
            }`}>
             Followers
            </div>
          </button>
          <button
            className={`flex items-center justify-center  cursor-pointer bg-transparent  hover:bg-white/10 `}
            onClick={() => {
              navigate(`/${username}/following`)
            }}
            >
            <div className={`py-2 border-b-4${
              connectionType == "following"
              ? " border-sky-400"
              : "border-b-transparent"
            }`}>
             Following
            </div>
          </button>
        </div>
              </div>
        <div>{loading && <EventLoading/>}</div>
        <div className="flex flex-col gap-1 text-white   bg-black    p-2 sm:p-4 ">
          {users.length>0 && users.map((user) => (
            <Link className="my-2" key={user?._id} to={`/${user?.username}`}>
              <div className="flex">
                <Avatar userDetails={user} />
                <div className="flex flex-col  px-2 w-[90%]  justify-between">
                  <div className="flex w-full  justify-between  gap-2">
                    <div className="flex flex-col">
                      <div className="font-bold text-xs/5   sm:text-lg/5 p-0 m-0">
                        {user?.fullName}
                      </div>
                      <div className="text-gray-400 text-xs/5  sm:text-base/5 p-0 m-0">
                        @{user?.username}
                      </div>
                    </div>
                    <div>
                        {user && (
                            <Button
                            className={` group  py-1 px-4   font-semibold cursor-pointer    ${user?.isFollowed?"hover:border-red-500 hover:bg-red-500/10 hover:text-red-500 text-white border-white w-28 border":"bg-white text-black hover:bg-white/85"}  ${currentUserId == user._id?"hidden":"block"}`}
                              onBtnClick={(e)=>(handleFollowBtn(e,user?._id))}
                            >
                              {user?.isFollowed?
                                <>
                                <span className="block group-hover:hidden">Following</span>
                                <span className="hidden group-hover:block">Unfollow</span>
                                </>:"Follow"}
                            </Button>
                        )}
                  </div>
                  </div>
                    <div>
                        {user?.bio}
                    </div>
                </div>
              </div>
            </Link>
          ))}
          {!loading && users.length==0 &&<>
            {connectionType=="follower"?
              (<div className="w-[80%] mx-auto text-xl pt-6 sm:text-3xl flex justify-center items-center font-bold text-center">{isCurrentUser?`You don't have any followers yet`:`@${username} don't have any followers yet `}</div>)

              :(<div className="text-xl w-[80%] mx-auto  pt-6 sm:text-3xl flex justify-center items-center font-bold text-center">{isCurrentUser?`You isn't following anyone`:`@${username} isn't following anyone`}</div>)}  
          </>}
        </div>
        </>}
     </Container>
    </>
  );
}

export default UserList;
