
import { axiosPrivate } from '../utils/axios.instance';

class CommentService {

    async createComment({ postId, text }) {
        try {
            const response = await axiosPrivate.post(`/comment/create/${postId}`, {
                text
            }, {
                withCredentials: true
            });
            console.log("CommentService :: createComment :: response", response);
            return response.data;
        } catch (error) {
            console.log("CommentService :: createComment :: Error", error.response?.data?.message);
            throw new Error(`CommentService :: createComment :: ${error.response?.data?.message || "Something went wrong"}`);
        }
    }

    async updateComment({ commentId, text }) {
        try {
            const response = await axiosPrivate.put(`/comment/${commentId}`, {
                text
            }, {
                withCredentials: true
            });
            console.log("CommentService :: updateComment :: response", response);
            return response.data;
        } catch (error) {
            console.log("CommentService :: updateComment :: Error", error.response?.data?.message);
            throw new Error(`CommentService :: updateComment :: ${error.response?.data?.message || "Something went wrong"}`);
        }
    }

    async deleteComment({ commentId }) {
        try {
            const response = await axiosPrivate.delete(`/comment/${commentId}`, {
                withCredentials: true
            });
            console.log("CommentService :: deleteComment :: response", response);
            return response.data;
        } catch (error) {
            console.log("CommentService :: deleteComment :: Error", error.response?.data?.message);
            throw new Error(`CommentService :: deleteComment :: ${error.response?.data?.message || "Something went wrong"}`);
        }
    }

    async getComment(commentId) {
        try {
            const response = await axiosPrivate.get(`/comment/${commentId}`, {
                withCredentials: true
            });
            console.log("CommentService :: getComment :: response", response);
            return response.data;
        } catch (error) {
            console.log("CommentService :: getComment :: Error", error.response?.data?.message);
            throw new Error(`CommentService :: getComment :: ${error.response?.data?.message || "Something went wrong"}`);
        }
    }

    async getAllPostComments({ postId }) {
        try {
            const response = await axiosPrivate.get(`/comment/post/${postId}`, {
                withCredentials: true
            });
            console.log("CommentService :: getAllPostComments :: response", response);
            return response.data;
        } catch (error) {
            console.log("CommentService :: getAllPostComments :: Error", error.response?.data?.message);
            throw new Error(`CommentService :: getAllPostComments :: ${error.response?.data?.message || "Something went wrong"}`);
        }
    }

    async getCommentReplies({ commentId }) {
        try {
            const response = await axiosPrivate.get(`/comment}/replies/${commentId}`, {
                withCredentials: true
            });
            console.log("CommentService :: getCommentReplies :: response", response);
            return response.data;
        } catch (error) {
            console.log("CommentService :: getCommentReplies :: Error", error.response?.data?.message);
            throw new Error(`CommentService :: getCommentReplies :: ${error.response?.data?.message || "Something went wrong"}`);
        }
    }

    async getAllUserComment(username) {
        try {
            const response = await axiosPrivate.get(`/comment/c/${username}`, {
                withCredentials: true
            });
            console.log("CommentService :: getAllUserComment :: response", response.data);
            return response.data;
        } catch (error) {
            console.log("CommentService :: getAllUserComment :: Error", error.response?.data?.message);
            throw new Error(`CommentService :: getAllUserComment :: ${error.response?.data?.message || "Something went wrong in getAllUserComment"}`);
        }
    }
    async createReplyComment({ commentId, text }) {
        try {
            const response = await axiosPrivate.post(`/comment/reply/${commentId}`, {
                text
            }, {
                withCredentials: true
            });
            console.log("CommentService :: createReplyComment :: response", response);
            return response.data;
        } catch (error) {
            console.log("CommentService :: createReplyComment :: Error", error.response?.data?.message);
            throw new Error(`CommentService :: createReplyComment :: ${error.response?.data?.message || "Something went wrong"}`);
        }
    }
}
const commentServices = new CommentService();
export {
    commentServices
}
