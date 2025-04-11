
import { userBaseUrl } from "../constants";
import axios from "axios";
class Userservice {
    async createUser({ profileImage, coverImage, username, fullname, email, password, bio, link }) {
        try {
            const formData = new FormData()
            formData.append("profileImage", profileImage);
            formData.append("coverImage", coverImage);

            // append all your other fields
            formData.append("userName", username);
            formData.append("fullName", fullname);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("bio", bio);
            formData.append("link", link);

            // console.log("formdaraq, formData")
            const response = await axios.post(`${userBaseUrl}/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log("response", response)
            return response.data

        } catch (error) {
            console.log("Userservice :: createUser :: Errors", error.response?.data?.message);
            throw new Error(`Userservice :: createUser :: Errors ${error.response?.data?.message || "something went wrong while createUser"}`)
        }
    }

    async loginUser({ username, email, password }) {
        try {
            const response = await axios.post(`${userBaseUrl}/login`, {
                userName: username,
                email,
                password

            })
            console.log("response", response.data.data);
            return response.data.data
        } catch (error) {
            console.log("Userservice :: loginUser :: Errors", error.response?.data?.message);
            throw new Error(`Userservice :: loginUser :: Errors ${error.response?.data?.message || "something went wrong while loginUser"}`)
        }
    }

    async deleteUser() {
        try {
            const response = await axios.delete(`${userBaseUrl}/deleteuser`, {
                withCredentials: true,
            })
            console.log("response", response)
            return response
        } catch (error) {
            console.log("Userservice :: deleteUser :: Errors", error.response?.data?.message);
            throw new Error(`Userservice :: deleteUser :: Errors ${error.response?.data?.message || "something went wrong while deleteUser"}`)
        }
    }

    async jwtRefreshToken() {
        try {
            const response = await axios.post(`${userBaseUrl}/re-refreshtoken`,
                {},
                {
                    withCredentials: true
                }
            )
            console.log("response", response)
            return response

        } catch (error) {
            console.log("Userservice :: jwtRefreshToken :: Errors", error.response?.data?.message);
            throw new Error(`Userservice :: jwtRefreshToken :: Errors ${error.response?.data?.message || "something went wrong while jwtRefreshToken"}`)
        }
    }

    async logoutUser() {
        try {
            const response = await axios.get(`${userBaseUrl}/logout`, { withCredentials: true })
            console.log("response", response)
            return response
        } catch (error) {
            console.log("Userservice :: logoutUser :: Errors", error.response?.data?.message);
            throw new Error(`Userservice :: logoutUser :: Errors ${error.response?.data?.message || "something went wrong while logoutUser"}`)

        }
    }

    async updateUserAccountDetails({ username, fullname, email, bio, link }) {
        try {
            const response = await axios.post(`${userBaseUrl}/update-account-details`, {
                userName: username,
                fullName: fullname,
                email,
                bio,
                link
            }, {
                withCredentials: true
            })
            console.log("response", response)
            return response
        } catch (error) {
            console.log("Userservice :: updateUserAccountDetails :: Errors", error.response?.data?.message);
            throw new Error(`Userservice :: updateUserAccountDetails :: Errors ${error.response?.data?.message || "something went wrong while updateUserAccountDetails"}`)
        }
    }
    async updateUserCoverImage(coverImage) {
        try {
            const formData = new FormData()
            formData.append("coverImage", coverImage)
            const response = await axios.patch(`${userBaseUrl}/update-coverImage`, formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
            console.log("response", response)
            return response
        } catch (error) {
            console.log("Userservice :: updateUserCoverImage :: Errors", error.response?.data?.message);
            throw new Error(`Userservice :: updateUserCoverImage :: Errors ${error.response?.data?.message || "something went wrong while updateUserCoverImage"}`)

        }
    }
    async updateUserProfileImage(profileImage) {
        try {
            const formData = new FormData()
            formData.append("profileImage", profileImage)
            const response = await axios.patch(`${userBaseUrl}/update-profileimage`, formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
            console.log("response", response)
            return response
        } catch (error) {
            console.log("Userservice :: updateUserProfileImage :: Errors", error.response?.data?.message);
            throw new Error(`Userservice :: updateUserProfileImage :: Errors ${error.response?.data?.message || "something went wrong while updateUserProfileImage"}`)

        }
    }

    async getCurrentUser() {
        try {
            const response = await axios.get(`${userBaseUrl}`, {
                withCredentials: true
            })

            console.log("response", response)
            return response

        } catch (error) {
            console.log("Userservice :: getCurrentUser :: Errors", error.response?.data?.message);
            throw new Error(`Userservice :: getCurrentUser :: Errors ${error.response?.data?.message || "something went wrong while getCurrentUser"}`)
        }

    }
    async search(search) {
        try {
            const response = await axios.get(`${userBaseUrl}/search/${search}`
            )
            console.log("response", response)
            return response
        } catch (error) {

            console.log("Userservice :: searchUser :: Errors", error.response?.data?.message);
            throw new Error(`Userservice :: searchUser :: Errors ${error.response?.data?.message || "something went wrong while searchUser"}`)
        }
    }
}

const userServices = new Userservice();
export {
    userServices
}