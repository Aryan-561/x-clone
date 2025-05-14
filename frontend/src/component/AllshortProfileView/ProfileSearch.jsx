import React from 'react'
import Container from '../Container/Container'
import Avatar from '../Card/Avatar'
import { Button } from "../index"
function ProfileSearch({ children, follower, following, profileImage, fullName, userName, bio, link, ...props }) {
    return (
        <Container className='w-full border-white/5 border rounded-2xl  mb-1.5'>
            <div className=' sm:px-4 py-3 m-2  px-2 flex tems-center gap-4 rounded-lg hover:bg-white/10 transition duration-200'>
                <div>
                    <Avatar classname='w-10 sm:w-15 h-10 sm:h-15' profileImage={profileImage} />

                </div>
                <div className='flex flex-col justify-center max-w-sm truncate '>
                    <h1 className='font-semibold hover:underline text-white text-xl leading-tight'>{fullName || "Fullname"}</h1>
                    <h6 className='text-gray-300 text-xs mb-1'>@{userName || "username"}</h6>
                    <p className='text-gray-400 text-xs line-clamp-2 max-w-sm'>
                        {bio || ""}
                    </p>
                    <div
                        className="  text-blue-500 hover:text-blue-700 transition-colors truncate break-words text-[12px] max-w-full "
                    >
                        {link?.replace(/^https?:\/\//, "") || ""}
                    </div>
                    <div className='flex text-sm font-sans mt-3 text-white/90 gap-x-2.5'>
                        <div className='hover:underline'>{follower ||  "0"}{""} Follower</div>
                        <div className='hover:underline'>{following || "0"}{""} Following</div>
                    </div>
                </div>
            </div>
            {children}
        </Container>
    )
}

export default ProfileSearch
