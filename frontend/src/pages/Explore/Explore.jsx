import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { search } from '../../features'
import { Container, Input, ProfileSearch, EventLoading } from '../../component'
import { Link } from 'react-router-dom'
import { resetSearchState, resetUserState } from '../../features/user/userSlice'

function Explore() {
  const { error, message, loading, searchResults, success } = useSelector((state) => state.user)
  // const stateUser = useSelector((state) => state.user)
  // console.log("state", stateUser)
  const dispatch = useDispatch()
  const inputRef = useRef()
  // react-hook-form setup
  const { register, handleSubmit } = useForm()

  // Search function
  const handleSearch = (data) => {
    // You can access the query from `data` here
    if (data.name.trim() !== "") dispatch(search(data.name))
  }
  useEffect(() => {
    return () => {
      dispatch(resetSearchState());
      dispatch(resetUserState())
    };
  }, []);

  return (
    <Container className='col-span-5 pr-3.5 border-l border-white/20  '>
      <div className='  mx-2.5 w-full my-4 '>
        <form onSubmit={handleSubmit(handleSearch)}>
          <Input
            placeholder="what are you looking for ??"
            ref={inputRef}
            className="border pl-10 sm:w-xl w-full border-white/50 focus:bg-blue-500/10 focus:border-blue-500 focus:ring-blue-500 focus:ring-1 rounded-3xl px-4 py-2"
            // Registering the input field with validation
            {...register('name', { required: '' })}
          >
            <div className=' opacity-80'>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-5 h-5"
                style={{ fill: 'white' }}
              >
                <g>
                  <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
                </g>
              </svg>
            </div>
          </Input>
        </form>
      </div>

      <div className=' px-3 py-3.5   hide-scrollbar'>
        <h1 className='text-lg text-center font-semibold mb-2'>{error ? "No user Found" : " "}</h1>
        {loading ? (<EventLoading />) : success && (
          <div className='  rounded-3xl border-white/5 px-5 py-2  hide-scrollbar'>
            <div className='min-h-min  overflow-y-auto hide-scrollbar space-y-2'>
              {success && searchResults?.data?.length > 0 && <h1 className='text-lg font-semibold mb-2'>Search Results :</h1>}
              {success && searchResults?.data?.length > 0 && searchResults?.data?.map(({ userName, profileImage, bio, fullName, _id, follower, following }) => (
                <Link to={`/${userName}`} key={_id}>
                  <ProfileSearch
                    userName={userName}
                    profileImage={profileImage?.url}
                    bio={bio}
                    fullName={fullName}
                    follower={follower}
                    following={following}
                  />
                </Link>
              ))}
            </div>
          </div>
        )
        }


      </div>
      <div className='flex  flex-col justify-center items-center '>
        <span>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </span>

        <span>
          {message && searchResults?.data && <p className={`${error ? "text-red-500 text-xs border rounded-2xl px-2 mt-2" : "text-green-500 text-sm"}`}>{message}</p>}
        </span>
      </div>
    </Container>
  )
}

export default Explore
