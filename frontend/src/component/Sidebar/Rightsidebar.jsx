import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Container, Input, ProfileSearch, Sidebarfooter } from '../index';
import { HiDotsHorizontal } from "react-icons/hi";
import { getRandomUser, search } from '../../features';
import { useSelector, useDispatch } from 'react-redux';

function Rightsidebar() {
    const dispatch = useDispatch();
    const { searchResults, success, randomUser } = useSelector((state) => state.user);
    const inputRef = useRef();
    const { register, handleSubmit } = useForm();
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (data) => {
        const trimmed = data.name.trim();
        setSearchValue(trimmed);
        if (trimmed !== '') {
            dispatch(search(trimmed));
        }
    };
    useEffect(() => {
        dispatch(getRandomUser())
    }, [dispatch])
    return (
        <Container className='hidden col-span-2 xl:col-span-3 h-screen px-4 py-1.5 lg:flex sticky top-0 flex-col border-l border-l-white/20 mr-4 items-center'>
            <form
                onSubmit={handleSubmit(handleSearch)}
                onBlur={()=>{}}
                className="w-full"
            >
                <Input
                    placeholder="Search"
                    className="w-full pl-10 rounded-3xl relative px-4 py-2 border border-white/30 focus:bg-blue-500/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    {...register('name')}
                    onChange={(e) => {
                        const value = e.target.value;
                        setSearchValue(value);
                        handleSearch({ name: value });
                    }}
                    ref={inputRef}
                >
                    <div className='w-4 h-4'>
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="w-full h-full text-white"
                            style={{ fill: 'white' }}
                        >
                            <g>
                                <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
                            </g>
                        </svg>
                    </div>
                </Input>
            </form>

            {searchValue && success && (
                <div className='bg-black rounded-2xl mx-0.5 top-14  right-1 absolute px-3 py-3.5'>
                    <div className='rounded-3xl border border-gray-200/15 shadow-xs shadow-white/45 hide-scrollbar px-5 py-2 max-h-80 overflow-y-auto space-y-2'>
                        {searchResults?.data?.map(({ userName, profileImage, bio, fullName, _id }) => (
                            <Link onClick={() => setTimeout(() => setSearchValue(''), 200)}
                                to={`/${userName}`} key={_id}>
                                <ProfileSearch
                                    userName={userName}
                                    profileImage={profileImage.url}
                                    bio={bio}
                                    fullName={fullName}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <div className='w-full border-black/50 border min-h-fit p-2.5 rounded-xl my-2.5 flex flex-col gap-3'>
                <h1 className='font-bold text-xl'>What’s happening</h1>
                <div className='flex justify-between items-center hover:bg-gray-200/20 p-1 rounded-sm'>
                    <div>
                        <h1 className='text-sm'>Trending in India</h1>
                        <h6 className='text-sm'>#AIDeepfake</h6>
                    </div>
                    <div className='p-1.5 text-xl hover:bg-blue-400/55 rounded-full'>
                        <HiDotsHorizontal />
                    </div>
                </div>
            </div>

            <div className='w-full border-white/15 border min-h-fit p-2.5 rounded-xl my-2.5 flex flex-col gap-3'>
                <h1 className='font-bold text-xl'>Who to follow</h1>
                {
                    randomUser?.data?.map(({ userName, profileImage, bio, fullName, _id }) =>
                        <Link to={`/${userName}`} key={_id}>
                            <ProfileSearch
                                userName={userName}
                                profileImage={profileImage.url}
                                bio={bio}
                                fullName={fullName} />
                        </Link>)
                }
            </div>

            <Sidebarfooter />
        </Container>
    );
}

export default Rightsidebar;
