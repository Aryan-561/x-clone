import axios from "axios";
import { commentBaseUrl } from "../constants";

class CommentService {

    async createComment({ postId, text }) {
        try {
            const response = await axios.post(`${commentBaseUrl}/create/${postId}`, {
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
            const response = await axios.put(`${commentBaseUrl}/${commentId}`, {
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
            const response = await axios.delete(`${commentBaseUrl}/${commentId}`, {
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
        console.log("helo",commentId)
        try {
            const response = await axios.get(`${commentBaseUrl}/${commentId}`, {
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
            const response = await axios.get(`${commentBaseUrl}/post/${postId}`, {
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
            const response = await axios.get(`${commentBaseUrl}/replies/${commentId}`, {
                withCredentials: true
            });
            console.log("CommentService :: getCommentReplies :: response", response);
            return response.data;
        } catch (error) {
            console.log("CommentService :: getCommentReplies :: Error", error.response?.data?.message);
            throw new Error(`CommentService :: getCommentReplies :: ${error.response?.data?.message || "Something went wrong"}`);
        }
    }

    async createReplyComment({ commentId, text }) {
        try {
            const response = await axios.post(`${commentBaseUrl}/reply/${commentId}`, {
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
