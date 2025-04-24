import React from 'react'
import Container from '../Container/Container'
import Avatar from '../Card/Avatar'
import { Button } from "../index"
function ProfileSearch({ children, profileImage, fullName, userName, bio, ...props }) {
    return (
        <Container className='w-full border-white/5 border rounded-2xl  mb-1.5'>
            <div className=' sm:px-4 py-3 m-2  px-2 flex  items-center gap-4 rounded-lg hover:bg-white/10 transition duration-200'>
                <div>
                    <Avatar classname='w-10 h-10' profileImage={profileImage} />

                </div>
                <div className='flex flex-col justify-center'>
                    <h1 className='font-semibold text-white text-sm leading-tight'>{fullName || "Full Name"}</h1>
                    <h6 className='text-gray-400 text-xs mb-1'>@{userName || "username"}</h6>
                    <p className='text-gray-300 text-xs line-clamp-2 max-w-sm'>
                        {bio || "A man doesn't die when he stops breathing. A man dies when he is forgotten."}
                    </p>
                </div>
            </div>
            {children}
        </Container>
    )
}

export default ProfileSearch
