import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `http://localhost:4444/api/v1/bookmark`
});

export class BookmarkService {
    async toggleBookmarkedPost(postId) {
        try {
            const response = await axiosInstance.post(`/t/post/${postId}`, {}, { withCredentials: true });
            // console.log(response.data);
        } catch (error) {
            // console.log("Bookmark Service :: toggleBookmarkedPost :: Errors", error.response?.data?.message);
        }
    }

    async getBookmarkedPosts() {
        try {
            const response = await axiosInstance.get('/posts', {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            throw new Error(`Bookmark Service :: getBookmarkedPosts :: Errors ${error.response?.data?.message || "something went wrong while getting bookmarked posts"}`);
        }
    }

    async toggleBookmarkedComment(commentId) {
        try {
            const response = await axiosInstance.post(`/t/comment/${commentId}`, {}, { withCredentials: true });
            // console.log(response.data);
            return response.data;
            // console.log(response.data);
            // console.log("Bookmark Service :: toggleBookmarkedComment :: Errors", error.response?.data?.message);
        } catch (error) {
            throw new Error(`Bookmark Service :: toggleBookmarkedComment :: Errors ${error.response?.data?.message || "something went wrong while toggleBookmarkedComment"}`);
            // console.log("Bookmark Service :: toggleBookmarkedComment :: Errors", error.response?.data?.message);
        }
    }

    async getAllbookmarkedPost() {
        try {
            const response = await axiosInstance.get(`/posts`, { withCredentials: true });
            // console.log(response.data);
            return response.data;
        } catch (error) {
            // console.log(response.data);
            throw new Error(`Bookmark Service :: getAllbookmarkedPost :: Errors ${error.response?.data?.message || "something went wrong while getAllbookmarkedPost"}`);
        }
        // console.log("Bookmark Service :: getAllbookmarkedPost :: Errors", error.response?.data?.message);
    }

    async getAllbookmarkedComment() {
        try {
            const response = await axiosInstance.get(`/comments`, { withCredentials: true });
            // console.log(response.data);
            return response.data;
        } catch (error) {
            // console.log("Bookmark Service :: getAllbookmarkedComment :: Errors", error.response?.data?.message);
            // console.log(response.data);
        }
    }
}

// console.log("Bookmark Service :: getAllbookmarkedComment :: Errors", error.response?.data?.message);

const bookmarkService = new BookmarkService();
export { bookmarkService };
