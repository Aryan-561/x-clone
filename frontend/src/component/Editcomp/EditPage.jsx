import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import {
    getCurrentUser,
    updateUserAccountDetails,
    updateUserCoverImage,
    updateUserProfileImage
} from '../../features';
import { Container, Input, Button, X } from '../index';
import { RxCross2 } from "react-icons/rx";
import { FaSave } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from '../Card/Avatar';
import { MdDriveFolderUpload } from "react-icons/md";
import { resetUserState } from '../../features/user/userSlice';

function EditPage() {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const inputRefCover = useRef(null);
    const inputRefProfile = useRef(null);
    const memoizedUserData = currentUser?.data;

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch, memoizedUserData?.userName]);

    useEffect(() => {
        if (memoizedUserData) {
            reset({
                fullName: memoizedUserData.fullName || '',
                userName: memoizedUserData.userName || '',
                bio: memoizedUserData.bio || '',
                link: memoizedUserData.link || '',
            });
        }
    }, [memoizedUserData]);

    const onSubmit = async(data) => {
        const profileImage = inputRefProfile.current?.files[0];
        const coverImage = inputRefCover.current?.files[0];

        if (profileImage) {
            await Promise.resolve(dispatch(updateUserProfileImage(profileImage)))
        }
        if (coverImage) {
            await Promise.resolve(dispatch(updateUserCoverImage(coverImage)));
        }

        await Promise.resolve(dispatch(updateUserAccountDetails({
            username: data.userName,
            fullname: data.fullName,
            bio: data.bio,
            link: data.link
        })));

        ( function onDispatch() {
            navigate(`/${data?.userName}`);
        })()
    };
    
    return (

        <Container className="border-x   sm:w-[85%] lg:w-full border-white/10 col-span-5 w-full min-h-full relative">
            <div className=" bg-black text-white  max-w-full p-4 rounded-xl  border-white/10 shadow-xl">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center justify-between mb-4">
                        <Button className="p-1 rounded-full hover:bg-red-500" onBtnClick={() => navigate(-1)}>
                            <RxCross2 />
                        </Button>
                        <h2 className="text-lg font-semibold">Edit Profile</h2>
                        <Button className="px-2  flex gap-x-1.5 text-white/80 hover:text-white justify-center items-center bg-blue-500/80 border rounded-full hover:bg-blue-500/70" type="submit">
                            <span>save</span><FaSave />
                        </Button>
                    </div>

                    <div className="mb-5">
                        <div>
                            <X
                                className="scroll-auto sm:max-h-48 sm:min-h-48 max-h-28  w-full border border-white/5 bg-gray-400"
                                image={memoizedUserData?.coverImage?.url || "/default/deafaultCoverimage.png"}
                            />
                        </div>
                        <div className="relative -top-10 left-4">
                            <Avatar
                                profileImage={memoizedUserData?.profileImage?.url}
                                classname="border-[3px] border-black/80 h-20 w-20 sm:w-28 sm:h-28 absolute"
                            />
                        </div>
                    </div>

                    <div className="space-y-3 mt-20">
                        <div>
                            <label htmlFor="fullName" className="text-sm font-semibold">Full Name</label>
                            <Input
                                className="rounded-md pl-3 bg-"
                                type="text"
                                id="fullName"
                                {...register("fullName", {
                                    required: "Full name is required",
                                    maxLength: {
                                        value: 16,
                                        message: "Full name must not exceed 16 characters"
                                    }
                                })}
                                placeholder="Full Name"
                            />
                            {errors.fullName && <p className="text-red-400 text-xs">{errors.fullName.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="userName" className="text-sm font-semibold">Username</label>
                            <Input
                                className="rounded-md pl-3"
                                type="text"
                                id="userName"
                                {...register("userName", {
                                    required: "Username is required",
                                    maxLength: {
                                        value: 16,
                                        message: "Username must not exceed 16 characters"
                                    },
                                    pattern: {
                                        value: /^[^\s]*$/,
                                        message: "Username cannot contain spaces"
                                    }
                                })}
                                placeholder="Username"
                            />
                            {errors.userName && <p className="text-red-400 text-xs">{errors.userName.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="bio" className="text-sm font-semibold">Bio</label>
                            <Input className="rounded-md pl-3 w-full" id="bio" {...register("bio")} placeholder="Bio" />
                        </div>
                        <div>
                            <label htmlFor="link" className="text-sm font-semibold">Link</label>
                            <Input className="rounded-md pl-3" type="text" id="link" {...register("link")} placeholder="Link" />
                        </div>
                        <div className='flex flex-col text-white/90 gap-y-2.5  my-5'>
                            <div className='flex border justify-center w-full py-2 rounded-md  items-center px-6'>
                                <label htmlFor="profileImage" className="text-sm   font-mono font-semibold whitespace-nowrap ">Profile Image</label>
                                <Input className="hidden" type="file" id="profileImage" ref={inputRefProfile} />
                                <Button
                                    type="button"
                                    className="cursor-pointer rounded-sm mt-2 px-1  border flex justify-center items-center hover:bg-blue-600/50 focus-visible:bg-blue-500  gap-x-1.5"
                                    onBtnClick={(e) => {
                                        inputRefProfile.current.click()
                                        e.preventDefault()
                                    }}
                                >
                                    <span>Upload</span>
                                    <MdDriveFolderUpload />
                                </Button>
                            </div>
                            <div className='flex justify-start w-full  border py-2 rounded-md   items-center px-6 ' >
                                <label htmlFor="coverImage" className="text-sm font-mono font-semibold whitespace-nowrap">Cover Image</label>
                                <Input className="hidden" type="file" id="coverImage" ref={inputRefCover} />
                                <Button
                                    type="button"
                                    className=" border cursor-pointer rounded-sm mt-2 px-1 bg-bl ue-600 flex justify-between gap-x-1.5 hover:bg-blue-600/50 focus:ring-blue-500 focus:ring-1 focus:ring-opacity-50 focus:outline-none items-center"
                                    onBtnClick={(e) => {
                                        inputRefCover.current.click()
                                        e.preventDefault()
                                    }}
                                >
                                    <span>Upload</span>
                                    <MdDriveFolderUpload />
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Container>

    );
}

export default EditPage;
