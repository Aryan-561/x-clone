
import { axiosPrivate } from '../utils/axios.instance';

class Likeservice {
    async togglePostLike(postId) {
        try {
            const response = await axiosPrivate.post(`/like/toggle/post/${postId}`, {}, {
                withCredentials: true
            })
            console.log("response", response.data)
            return response.data
        } catch (error) {
            console.log("Likeservice :: togglePostLike :: Errors", error.response?.data?.message);
            throw new Error(`Likeservice :: togglePostLike :: Errors ${error.response?.data?.message || "something went wrong while togglePostLike "}`)
        }
    }
    async toggleCommentLike(commentId) {
        try {
            const response = await axiosPrivate.post(`/like/toggle/comment/${commentId}`, {}, {
                withCredentials: true
            })
            console.log("response", response.data)
            return response.data
        } catch (error) {
            console.log("Likeservice :: toggleCommentLike :: Errors", error.response?.data?.message);
            throw new Error(`Likeservice :: toggleCommentLike :: Errors ${error.response?.data?.message || "something went wrong while toggleCommentLike "}`)
        }
    }
    async getAllLikePost() {
        try {
            const response = await axiosPrivate.get(`/like/posts`, {
                withCredentials: true
            })
            console.log("response", response.data)
            return response.data
        } catch (error) {
            console.log("Likeservice :: getAllLikePost :: Errors", error.response?.data?.message);
            throw new Error(`Likeservice :: getAllLikePost :: Errors ${error.response?.data?.message || "something went wrong while getAllLikePost "}`)

        }
    }
    async getAllLikeComment() {
        try {
            const response = await axiosPrivate.get(`/like/comments`, {
                withCredentials: true
            })
            console.log("response", response.data)
            return response.data
        } catch (error) {
            console.log("Likeservice :: getAllLikeComment :: Errors", error.response?.data?.message);
            throw new Error(`Likeservice :: getAllLikeComment :: Errors ${error.response?.data?.message || "something went wrong while getAllLikeComment "}`)

        }

    }
}
const likeServices = new Likeservice()
export {
    likeServices
}