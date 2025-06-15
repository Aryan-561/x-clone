
import { axiosPrivate } from '../utils/axios.instance';



export class BookmarkService{

    async toggleBookmarkedPost(postId){
        try {
            
            const response = await axiosPrivate.post(`/bookmark/t/post/${postId}`,{},{withCredentials: true,})
            
            console.log(response.data)
            return response.data

        } catch (error) {
            
            console.log("Bookmark Service :: toggleBookmarkedPost :: Errors", error.response?.data?.message);

            throw new Error(`Bookmark Service :: toggleBookmarkedPost :: Errors ${error.response?.data?.message || "something went wrong while toggleBookmarkedPost"}`)

        }
    }

    async toggleBookmarkedComment(commentId){
        try {
            
            const response = await axiosPrivate.post(`/bookmark/t/comment/${commentId}`,{},{withCredentials: true,})
            
            console.log(response.data)
            return response.data

        } catch (error) {
            
            console.log("Bookmark Service :: toggleBookmarkedComment :: Errors", error.response?.data?.message);

            throw new Error(`Bookmark Service :: toggleBookmarkedComment :: Errors ${error.response?.data?.message || "something went wrong while toggleBookmarkedComment"}`)

        }
    }

    async getAllbookmarkedPost(){
        try {
            
            const response = await axiosPrivate.get(`/bookmark/posts`,{withCredentials: true,})
            
            console.log(response.data)
            return response.data

        } catch (error) {
            
            console.log("Bookmark Service :: getAllbookmarkedPost :: Errors", error.response?.data?.message);

            throw new Error(`Bookmark Service :: getAllbookmarkedPost :: Errors ${error.response?.data?.message || "something went wrong while getAllbookmarkedPost"}`)

        }
    }


    async getAllbookmarkedComment(){
        try {
            
            const response = await axiosPrivate.get(`/bookmark/comments`,{withCredentials: true,})
            
            console.log(response.data)
            return response.data

        } catch (error) {
            
            console.log("Bookmark Service :: getAllbookmarkedComment :: Errors", error.response?.data?.message);

            throw new Error(`Bookmark Service :: getAllbookmarkedComment :: Errors ${error.response?.data?.message || "something went wrong while getAllbookmarkedComment"}`)

        }
    }

}

const bookmarkService = new BookmarkService()
export {bookmarkService}