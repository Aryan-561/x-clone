import axios from "axios";
import { axiosPrivate } from '../utils/axios.instance';

class Userservice {
    async createUser({ profileImage, coverImage, username, fullname, email, password, bio, link }) {
        try {
            const formData = new FormData()
            formData.append("profileImage", profileImage);
            formData.append("coverImage", coverImage);
            formData.append("userName", username);
            formData.append("fullName", username);
            formData.append("email", email);
            formData.append("password", password);

            const response = await axios.post('http://localhost:4444/api/v1/users/create', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log("Create user response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Create user error:", error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || "Failed to create user");
        }
    }

    async loginUser({ username, email, password }) {
        try {
            const response = await axiosPrivate.post('/users/login', {
                userName: username,
                email,
                password
            });
            console.log("Login response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Login error:", error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || "Failed to login");
        }
    }

    async deleteUser() {
        try {
            const response = await axiosPrivate.delete('/users/deleteuser');
            console.log("Delete user response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Delete user error:", error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || "Failed to delete user");
        }
    }

    async jwtRefreshToken() {
        try {
            console.log("Attempting to refresh token...");
            const response = await axiosPrivate.post('/users/re-refreshtoken');
            console.log("Refresh token response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Token refresh error:", error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || "Failed to refresh token");
        }
    }

    async logoutUser() {
        try {
            const response = await axiosPrivate.get('/users/logout');
            console.log("Logout response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Logout error:", error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || "Failed to logout");
        }
    }

    async updateUserAccountDetails({ username, fullname, email, bio, link }) {
        try {
            const response = await axiosPrivate.post('/users/update-account-details', {
                userName: username,
                fullName: fullname,
                email,
                bio,
                link
            });
            console.log("Update account response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Update account error:", error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || "Failed to update account");
        }
    }

    async updateUserCoverImage(coverImage) {
        try {
            const formData = new FormData()
            formData.append("coverImage", coverImage)
            const response = await axiosPrivate.patch('/users/update-coverImage', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log("Update cover image response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Update cover image error:", error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || "Failed to update cover image");
        }
    }

    async updateUserProfileImage(profileImage) {
        try {
            const formData = new FormData()
            formData.append("profileImage", profileImage)
            const response = await axiosPrivate.patch('/users/update-profileimage', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log("Update profile image response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Update profile image error:", error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || "Failed to update profile image");
        }
    }

    async getCurrentUser() {
        try {
            const response = await axiosPrivate.get('/users');
            console.log("Get current user response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Get current user error:", error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || "Failed to get current user");
        }
    }

    async search(search) {
        try {
            const response = await axiosPrivate.get(`/users/search/${search}`);
            console.log("Search response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Search error:", error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || "Failed to search");
        }
    }

    async getUserDetails(username) {
        try {
            const response = await axiosPrivate.get(`/users/username/${username}`);
            console.log("Get user details response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Get user details error:", error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || "Failed to get user details");
        }
    }

    async resendEmailVerification(email) {
        try {
            const response = await axiosPrivate.post('/users/resend-verification', { email });
            console.log("Resend verification response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Resend verification error:", error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || "Failed to resend verification");
        }
    }

    async getUserPost(username) {
        try {
            const response = await axiosPrivate.get(`/post/user/${username}`);
            console.log("Get user posts response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Get user posts error:", error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || "Failed to get user posts");
        }
    }

    async Googleauthentication(credential) {
        try {
            const response = await axiosPrivate.post('/users/google-login', { credential });
            console.log("Google auth response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Google auth error:", error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || "Failed to authenticate with Google");
        }
    }

    async getRandomUser() {
        try {
            const response = await axiosPrivate.get('/users/randomuser');
            console.log("Get random user response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Get random user error:", error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || "Failed to get random user");
        }
    }
}

const userServices = new Userservice();
export { userServices };