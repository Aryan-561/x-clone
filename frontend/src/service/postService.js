
import { axiosPrivate } from '../utils/axios.instance';


export class PostService {
    
    async getAllPost() {
        try {
            const response = await axiosPrivate.get('/post', {
                withCredentials: true,
            });
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.log("Post Service :: getAllPost :: Errors", error.response?.data?.message);
            throw new Error(`Post Service :: getAllPost :: Errors ${error.response?.data?.message || "something went wrong while getAllPost"}`)
        }
    }

    async getUserPost(userId) {
        try {
            const response = await axiosPrivate.get(`/post/user/${userId}`,{withCredentials: true,});
            return response.data;
        } catch (error) {
            console.log("Post Service :: getUserPost :: Errors", error.response?.data?.message);
            throw new Error(`Post Service :: getUserPost :: Errors ${error.response?.data?.message || "something went wrong while getUserPost"}`)
        }
    }

    async getFollowingUserPost() {
        try {
            const response = await axiosPrivate.get(`/post/following`,{withCredentials: true,});
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.log("Post Service :: getFollowingUserPost :: Errors", error.response?.data?.message);
            throw new Error(`Post Service :: getFollowingUserPost :: Errors ${error.response?.data?.message || "something went wrong while getFollowingUserPost"}`)
        }
    }

    async getPostById(postId){
        try {
            const response = await axiosPrivate.get(`/post/${postId}`,{withCredentials: true,})
            console.log(response.data)
            return response.data
        } catch (error) {
            console.log("Post Service :: getPostById :: Errors", error.response?.data?.message);
            throw new Error(`Post Service :: getPostById :: Errors ${error.response?.data?.message || "something went wrong while getPostById"}`)
        }
    }

    async createPost({text,media}){
        try {
            const formData = new FormData()
            formData.append('text', text)
            formData.append('media',media)
            const response = await axiosPrivate.post(`/post/create`, formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                withCredentials: true,
            })
            console.log(response.data)
            return response.data
        } catch (error) {
            console.log("Post Service :: createPost :: Errors", error.response?.data?.message);
            throw new Error(`Post Service :: createPost :: Errors ${error.response?.data?.message || "something went wrong while createPost"}`)
        }
    }

   async updatePost({postId,text}){
        try {
            const response = await axiosPrivate.patch(`/post/update/${postId}`,{text},{
                headers:{
                    'content-type':'application/json; charset=UTF-8'
                },
                withCredentials: true
            })
            console.log(response.data)
            return response.data
        } catch (error) {
            console.log("Post Service :: updatePost :: Errors", error.response?.data?.message);
            throw new Error(`Post Service :: updatePost :: Errors ${error.response?.data?.message || "something went wrong while updatePost"}`)
        }
   }

   async deletePost(postId){
        try {
            const response = await axiosPrivate.delete(`/post/delete/${postId}`,{withCredentials: true,})
            console.log(response.data)
            return response.data
        } catch (error) {
            console.log("Post Service :: deletePost :: Errors", error.response?.data?.message);
            throw new Error(`Post Service :: deletePost :: Errors ${error.response?.data?.message || "something went wrong while deletePost"}`)
        }
    }

}

const postService = new PostService();
export default postService;