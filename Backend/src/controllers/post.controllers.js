import ApiErrors from "../utils/ApiErrors.js"
import ApiResponse from "../utils/ApiResponse.js"
import {Post} from "../models/post.model.js"
// import User from "../models/User.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import { uploadCloudinary } from "../utils/cloudinary.js"


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
            user:req.user._id,
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
        user:req.user._id,
        text
    })

    if(!newPost){
        throw new ApiErrors(400, "Failed to create a new post!")
    }

    return res.status(200).json(new ApiResponse(200, "Post created successfully.", newPost))

})



export {createPost}