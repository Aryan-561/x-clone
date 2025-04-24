import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import {
    getCurrentUser,
    updateUserAccountDetails,
    updateUserCoverImage,
    updateUserProfileImage
} from '../../features';
import { Container, Input, Button, X, EventLoading } from '../index';
import { RxCross2 } from "react-icons/rx";
import { FaSave } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Avatar from '../Card/Avatar';

function EditPage({ onClose, setShowEditPage }) {
    const { currentUser, loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
    }, [dispatch]);

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

    const onSubmit = async (data) => {
        const profileImage = inputRefProfile.current?.files[0];
        const coverImage = inputRefCover.current?.files[0];

        if (profileImage) {
            await dispatch(updateUserProfileImage(profileImage));
        }
        if (coverImage) {
            await dispatch(updateUserCoverImage(coverImage));
        }

        dispatch(updateUserAccountDetails({
            username: data.userName,
            fullname: data.fullName,
            bio: data.bio,
            link: data.link
        }));

        dispatch(getCurrentUser());
        setShowEditPage(prev => !prev);
        navigate("/profile");
    };

    return (
        <>
            {
                loading && <EventLoading />
            }
            <Container className="fixed top-0 left-0  w-full overflow-x-hidden
                    h-full flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                <div className="relative bg-black text-white w-[90%] max-w-md p-4 rounded-xl border border-white/10 shadow-xl">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex items-center justify-between mb-4">
                            <Button className="p-1 rounded-full hover:bg-red-500" onBtnClick={onClose}>
                                <RxCross2 />
                            </Button>
                            <h2 className="text-lg font-semibold">Edit Profile</h2>
                            <Button className="p-1 rounded-full hover:bg-blue-500" type="submit">
                                <FaSave />
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
                                    className="rounded-md"
                                    type="text"
                                    id="fullName"
                                    {...register("fullName", {
                                        required: "Full name is required",
                                        maxLength: {
                                            value: 20,
                                            message: "Full name must not exceed 20 characters"
                                        }
                                    })}
                                    placeholder="Full Name"
                                />
                                {errors.fullName && <p className="text-red-400 text-xs">{errors.fullName.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="userName" className="text-sm font-semibold">Username</label>
                                <Input
                                    className="rounded-md"
                                    type="text"
                                    id="userName"
                                    {...register("userName", {
                                        required: "Username is required",
                                        maxLength: {
                                            value: 20,
                                            message: "Username must not exceed 20 characters"
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
                                <Input className="rounded-md w-full" id="bio" {...register("bio")} placeholder="Bio" />
                            </div>
                            <div>
                                <label htmlFor="link" className="text-sm font-semibold">Link</label>
                                <Input className="rounded-md" type="text" id="link" {...register("link")} placeholder="Link" />
                            </div>
                            <div className='flex justify-between items-center '>
                                <div>
                                    <label htmlFor="profileImage" className="text-sm font-semibold w-full">Profile Image</label>
                                    <Input className="hidden" type="file" id="profileImage" ref={inputRefProfile} />
                                    <Button

                                        type="button"
                                        className="cursor-pointer rounded-sm mt-2 px-1 border"
                                        onBtnClick={(e) => {
                                            inputRefProfile.current.click()
                                            e.preventDefault()
                                        }
                                        }
                                    >
                                        Upload
                                    </Button>
                                </div>
                                <div>
                                    <label htmlFor="coverImage" className="text-sm font-semibold w-full">Cover Image</label>
                                    <Input className="hidden" type="file" id="coverImage" ref={inputRefCover} />
                                    <Button
                                        type="button"
                                        className="cursor-pointer rounded-sm mt-2 px-1 border"
                                        onBtnClick={(e) => {
                                            inputRefCover.current.click()
                                            e.preventDefault()
                                        }
                                        }
                                    >
                                        Upload
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Container>

        </>
    );
}

export default EditPage;
