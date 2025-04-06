import React from 'react'
import { Button, Container, Input, Sidebarfooter } from '../index'
import { HiDotsHorizontal } from "react-icons/hi";
function Rightsidebar() {
    return (
        <Container className=' hidden  w-1/4 min-h-screen px-4 py-1.5 md:flex flex-col  items-center'>
            <Input placeholder="Search" className="border-black/50 border  w-full rounded-3xl">
                <div className='w-4 h-4 opacity-60'>
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-18jsvk2 r-lwhw9o r-cnnz9e"><g><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path></g></svg>
                </div>
            </Input>
            <div className='w-full border-black/50 border  min-h-fit p-2.5 rounded-xl my-2.5  flex flex-col gap-3'>
                <h1 className=' text-2xl font-bold'>Subscribe to Premium</h1>
                <h6 className=' text-xl font-light'>Subscribe to unlock new features and if eligible, receive a share of revenue.</h6>
                <Button classname=" px-3 w-fit ml-2 font-semibold text-white bg-blue-500 py-1"> Subscribe</Button>
            </div>
            <div className='w-full border-black/50 border  min-h-fit p-2.5 rounded-xl my-2.5  flex flex-col gap-3'>
                <h1 className='font-bold text-xl'>What’s happening</h1>
                <div className='flex justify-between items-center hover:bg-gray-200/20 p-1 rounded-sm'>
                    <div>
                        <h1 className='text-sm '>Trending in India</h1>
                        <h6 className='text-sm '>#AIDeepfake</h6>
                    </div>
                    <div className=' p-1.5  text-xl hover:bg-blue-400/55 rounded-full'>
                        <HiDotsHorizontal />
                    </div>
                </div>

            </div>
            <div className='w-full border-black/50 border  min-h-fit p-2.5 rounded-xl my-2.5  flex flex-col gap-3'>
                <h1 className='font-bold text-xl'>Who to follow</h1>
                <div className='flex w-full justify-between items-center  '>
                    <div className='flex gap-3 justify-center items-center '>
                        <img className='w-10 h-10 rounded-full object-center' src="/1.jpeg" alt="profile image" />
                        <div>
                            <p className='leading-6'>fullName</p>
                            <p className=' leading-3 text-gray-800/80'>@userName</p>
                        </div>
                    </div>
                    <Button classname=" sm:px-4 sm:py-2 w-fit ml-2 font-semibold text-white bg-black "> Follow</Button>
                </div>
            </div>
            <Sidebarfooter />
        </Container>

    )
}

export default Rightsidebar
