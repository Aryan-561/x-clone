import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser, updateUserAccountDetails, updateUserCoverImage, updateUserProfileImage } from '../../features';
import { Container, Input, Button, X } from '../index';
import { RxCross2 } from "react-icons/rx";
import { FaSave } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Avatar from '../Card/Avatar';

function EditPage({ onClose, setShowEditPage }) {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate()
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
    }, [dispatch ]);

    useEffect(() => {
        if (memoizedUserData) {
            reset({
                fullName: memoizedUserData.fullName || '',
                userName: memoizedUserData.userName || '',
                bio: memoizedUserData.bio || '',
                link: memoizedUserData.link || '',
            });
        }
    }, [memoizedUserData, ]);

    const onSubmit = (data) => {
        console.log('Form Data:', data);

        // Collecting file data
        const profileImage = inputRefProfile.current?.files[0];
        const coverImage = inputRefCover.current?.files[0];

        // Dispatching actions
        if (profileImage) {
            dispatch(updateUserProfileImage(profileImage)); // Sending the file to the backend
        }
        if (coverImage) {
            dispatch(updateUserCoverImage(coverImage)); // Sending the file to the backend
        }

        // Dispatching other user data (non-image updates)
        dispatch(updateUserAccountDetails({
            username: data.userName,
            fullname: data.fullName,
            bio: data.bio,
            link: data.link
        }));

        dispatch(getCurrentUser());

        setShowEditPage(prev=>!prev)
        navigate("/profile")
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <Container className="relative bg-black text-white w-[90%] max-w-md p-4 rounded-xl border border-white/10 shadow-xl">
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
                                className="w-full sm:max-h-48 sm:min-h-48 border border-white/5 bg-gray-400"
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
                            <Input className="rounded-md" type="text" id="fullName" {...register("fullName")} placeholder="Full Name" />
                        </div>
                        <div>
                            <label htmlFor="userName" className="text-sm font-semibold">Username</label>
                            <Input className="rounded-md" type="text" id="userName" {...register("userName")} placeholder="Username" />
                        </div>
                        <div>
                            <label htmlFor="bio" className="text-sm font-semibold">Bio</label>
                            <Input className="rounded-md w-full" id="bio" {...register("bio")} placeholder="Bio" />
                        </div>
                        <div>
                            <label htmlFor="link" className="text-sm font-semibold">Link</label>
                            <Input className="rounded-md" type="text" id="link" {...register("link")} placeholder="Link" />
                        </div>
                        <div>
                            <label htmlFor="profileImage" className="text-sm font-semibold w-full">Profile Image</label>
                            <Input className="hidden" type="file" id="profileImage" ref={inputRefProfile} />
                            <Button
                                type="button"
                                className="cursor-pointer rounded-sm mt-2  px-1 border "
                                onBtnClick={() => inputRefProfile.current.click()}
                            >
                                Upload Profile Image
                            </Button>
                        </div>
                        <div>
                            <label htmlFor="coverImage" className="text-sm font-semibold w-full">Cover Image</label>
                            <Input className="hidden" type="file" id="coverImage" ref={inputRefCover} />
                            <Button
                                type="button"
                                className="cursor-pointer rounded-sm mt-2 px-1 border "
                                onBtnClick={() => inputRefCover.current.click()}
                            >
                                Upload Cover Image
                                
                            </Button>
                        </div>
                    </div>
                </form>
            </Container>
        </div>
    );
}

export default EditPage;
