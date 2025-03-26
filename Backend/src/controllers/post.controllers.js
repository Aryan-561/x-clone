import ApiErrors from "../utils/ApiErrors.js"
import ApiResponse from "../utils/ApiResponse.js"
import {Post} from "../models/post.model.js"
// import User from "../models/User.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import { uploadCloudinary } from "../utils/cloudinary.js"
import mongoose, { isValidObjectId } from "mongoose"


// fn for create post
const createPost = asyncHandler(async(req, res)=>{
    const {text} = req.body
    
    if(!text.trim()){
        throw new ApiErrors(400, "Text field is required")
    }

    const mediaLocalFile = req.file?.path

    // if media file attached
    if(mediaLocalFile){
        const mediaFile = await uploadCloudinary(mediaLocalFile)
        
        if(!mediaFile){
            throw new ApiErrors(400, "Something wrong while uploading the media, Please try later!")
        }

        const newPost = await Post.create({
            createdBy:req.user._id,
            text,
            media:{
                url:mediaFile.secure_url,
                publicId:mediaFile.public_id,
                resourseType:mediaFile.resource_type
            }
        })

        if(!newPost){
            throw new ApiErrors(400, "Failed to create a new post!")
        }

        return res.status(200).json(new ApiResponse(200, "Post created successfully.",newPost))

    }

    const newPost = await Post.create({
        createdBy:req.user._id,
        text
    })

    if(!newPost){
        throw new ApiErrors(400, "Failed to create a new post!")
    }

    return res.status(200).json(new ApiResponse(200, "Post created successfully.", newPost))

})


// fn for update post
const updatePost = asyncHandler(async(req, res)=>{

    const {text} = req.body
    const {postId} = req.params
    
    if(!text?.trim()){
        throw new ApiErrors(400, "Text field is required")
    }

    if(!postId){
        throw new ApiErrors(400, "Post id is required!")
    }
    
    if(!isValidObjectId(postId)){
        throw new ApiErrors(400, "Invalid Id!")
    }

    const post =  await Post.findById(postId)

    if(!post){
        throw new ApiErrors(404, "post not found!")
    }

    post.text = text
    await post.save({ValidityState:false})

    return res.status(200).json(new ApiResponse(200, "Post updated successfully.", post))
    
})


const getPostById =  asyncHandler(async(req, res)=>{
    const {postId} = req.params
    
    if(!postId){
        throw new ApiErrors(400, "Post id is required!")
    }
    
    if(!isValidObjectId(postId)){
        throw new ApiErrors(400, "Invalid Id!")
    }

    const post =  await Post.findById(postId)

    if(!post){
        throw new ApiErrors(404,"Post not Fount!")
    }

    return res.status(200).json(new ApiResponse(200, "Post fetched successfully.", post))
    
})


// fn for get all post
const getAllPost = asyncHandler(async(req, res)=>{

    const {page=1, limit=20, } = req.params

    const allPosts = await Post.aggregate([
        {
            $match:{}
        },
        {
            $lookup:{
                from:"users",
                localField:"createdBy",
                foreignField:"_id",
                as:"user",
            }
        },
        {
            $unwind:"$user"
        },
        {
            $addFields:{
                userDetails:{
                    userId:"$user._id",
                    username:"$user.username",
                    fullName:"$user.fullName",
                    profileImage:"$user.profileImage",
                }
                
            }
        },
        {
            $project:{
                _id:1,
                text:1,
                media:1,
                createdAt:1,
                updatedAt:1,
                userDetails:1,

            }
        },
        {
            $skip:(Number(page)-1)*Number(limit)
        },
        {
            $limit:Number(limit)
        }
    ])
    
    if(!allPosts){
        throw new ApiErrors(400, "Failed to fetched the posts")
    }

    if(allPosts.length === 0 ){
        return res.status(404).json(new ApiResponse(404, "Posts not found", []))
    }

    return res.status(200).json(new ApiResponse(200, "Posts fetched successfully", allPosts))

})


// fn for get user post
const getUserPost = asyncHandler(async(req, res)=>{
    const {userId, page=1, limit=10} = req.params

    if(!userId){
        throw new ApiErrors(400, "User id is required!")
    }

    if(!isValidObjectId(userId)){
        throw new ApiErrors(400, "Invalid user id!")
    }

   
    const allPosts = await Post.aggregate([
        {
            $match:{
                createdBy: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"createdBy",
                foreignField:"_id",
                as:"user",
            }
        },
        {
            $unwind:"$user"
        },
        {
            $addFields:{
                userDetails:{
                    userId:"$user._id",
                    username:"$user.username",
                    fullName:"$user.fullName",
                    profileImage:"$user.profileImage",
                }
                
            }
        },
        {
            $project:{
                _id:1,
                text:1,
                media:1,
                createdAt:1,
                updatedAt:1,
                userDetails:1,

            }
        },
        {
            $skip:(Number(page)-1)*Number(limit)
        },
        {
            $limit:Number(limit)
        }
    ])
    
    if(!allPosts){
        throw new ApiErrors(400, "Failed to fetched the posts")
    }

    if(allPosts.length === 0 ){
        return res.status(404).json(new ApiResponse(404, "Posts not found", []))
    }

    return res.status(200).json(new ApiResponse(200, "Posts fetched successfully", allPosts))


})


// fn for get following user post
const getFollowerUserPost = asyncHandler(async(req, res)=>{

    const {userId} = req.params

    if(!userId){
        throw new ApiErrors(400, "User id is required!")
    }

    if(!isValidObjectId(userId)){
        throw new ApiErrors(400, "Invalid user id!")
    }

    const posts = await Subscription.aggregate([

        {
            $match:{
                follower: new mongoose.Types.ObjectId(userId)
            }
        },

        {
            $lookup:{
                from:"posts",
                localField:"following",
                foreignField:"createdBy",
                as:"posts",
                pipeline:[
                    {
                        $lookup:{
                            from:"users",
                            localField:"createdBy",
                            foreignField:"_id",
                            as:"user",
                        }
                    },
                    {
                        $unwind:"$user"
                    },
                    {
                        $addFields:{
                            userDetails:{
                                userId:"$user._id",
                                username:"$user.username",
                                fullName:"$user.fullName",
                                profileImage:"$user.profileImage",
                            }
                            
                        }
                    },

                    {
                        $project:{
                            _id:1,
                            text:1,
                            media:1,
                            createdAt:1,
                            updatedAt:1,
                            userDetails:1,
            
                        }
                    },
                ]
            }
        },

        {
            $unwind:"$posts"
        },

        {
            $project:{
                _id:0,
                posts:1
            }
        }

    ])

    if(!posts){
        throw new ApiErrors(400, "Failed to fetch Followers post!")
    }

    return res.status(200).json(new ApiResponse(200, "Following' user post fetched successfully ", posts))

})


// fn for delete post by id
const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    if (!postId) {
        throw new ApiErrors(400, "Post ID is required!");
    }

    if (!isValidObjectId(postId)) {
        throw new ApiErrors(400, "Invalid ID!");
    }

    const post = await Post.findOneAndDelete({ _id: postId, createdBy: req.user._id });

    if (!post) {
        throw new ApiErrors(404, "Post not found or unauthorized!");
    }

    return res.status(200).json(new ApiResponse(200, "Post deleted successfully.", {}));
});


export {createPost, updatePost, getPostById, getAllPost, getUserPost, getFollowingUserPost, deletePost}