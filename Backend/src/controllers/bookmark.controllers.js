import ApiErrors from "../utils/ApiErrors.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Bookmark } from "../models/bookmark.model.js";
import mongoose, { isValidObjectId } from "mongoose";

// fn for add/remove bookmarked on posts
const toggleBookmarkedPost = asyncHandler(async(req, res)=>{

    const {postId} = req.params

    if(!postId){
        throw new ApiErrors(400, "post id is required!")
    }

    if(!isValidObjectId(postId)){
        throw new ApiErrors(400, "Invalid post Id!")
    }

    const isBookmarked = await Bookmark.findOne({post:postId,bookmarkedBy:req.user._id})

    if(isBookmarked){
        const removeBookmarked = await Bookmark.findByIdAndDelete(isBookmarked._id)

        if(!removeBookmarked){
            throw new ApiErrors(400, "Failed to remove bookmraked on post!")
        }

        return res.status(200).json(new ApiResponse(200, "removed bookmarked from post.",{}))
    }

    const bookmarked = await Bookmark.create({
        bookmarkedBy:req.user._id,
        post:postId
    })

    return res.status(200).json(new ApiResponse(200, "added bookmarked on the post.", bookmarked))

})



// fn for add/remove bookmarked on comments
const toggleBookmarkedComment = asyncHandler(async(req, res)=>{

    const {commentId} = req.params

    if(!commentId){
        throw new ApiErrors(400, "comment id is required!")
    }

    if(!isValidObjectId(commentId)){
        throw new ApiErrors(400, "Invalid comment Id!")
    }

    const isBookmarked = await Bookmark.findOne({comment:commentId,bookmarkedBy:req.user._id})

    if(isBookmarked){
        const removeBookmarked = await Bookmark.findByIdAndDelete(isBookmarked._id)

        if(!removeBookmarked){
            throw new ApiErrors(400, "Failed to remove bookmraked on comment!")
        }

        return res.status(200).json(new ApiResponse(200, "removed bookmarked from comment.",{}))
    }

    const bookmarked = await Bookmark.create({
        bookmarkedBy:req.user._id,
        comment:commentId
    })

    return res.status(200).json(new ApiResponse(200, "added bookmarked on the post.", bookmarked))

})


// fn for get all posts which bookmarked by user
const getAllbookmarkedPost = asyncHandler(async(req, res)=>{

    const bookmarkedPosts = await Bookmark.aggregate([

        {
            $match:{
                bookmarkedBy: new mongoose.Types.ObjectId(req.user._id),
                post:{$exists:true}
            }
        },

        {
            $lookup:{
                from:"posts",
                localField:"post",
                foreignField:"_id",
                as:"bookmarkedPost",
                pipeline:[
                    {
                        $lookup:{
                            from:"users",
                            localField:"createdBy",
                            foreignField:"_id",
                            as:"user",
                            pipeline:[
                                {
                                    $lookup:{
                                        from:"subscriptions",
                                        localField:"_id",
                                        foreignField:"follower",
                                        as:"followingDoc"
                                    },
                                },
                                {
                                    $lookup:{
                                        from:"subscriptions",
                                        localField:"_id",
                                        foreignField:"following",
                                        as:"followerDoc"
                                    },
                                }
                            ]
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
                                bio:"$user.bio",
                                follower:{$size:"$user.followerDoc"},
                                following:{$size:"$user.followingDoc"}
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
            $unwind:"$bookmarkedPost"
        },

        {
            $project:{
                _id:"$bookmarkedPost._id",
                text:"$bookmarkedPost.text",
                media:"$bookmarkedPost.media",
                userDetails:"$bookmarkedPost.userDetails",
                createdAt:"$bookmarkedPost.createdAt",
                updatedAt:"$bookmarkedPost.updatedAt",
                bookmarkedAt: "$createdAt"
            }
        },

        {
            $sort:{
                bookmarkedAt:-1
            }
        },

        {
            $skip:(Number(page)-1)*Number(limit)
        },

        {
            $limit:Number(limit)
        }

    ])

    if(!bookmarkedPosts){
        throw new ApiErrors(400, "Failed to fetched the bookmarked posts!")
    }

    return res.status(200).json(new ApiResponse(200, "Bookmarked posts fetched successfully.", bookmarkedPosts))

})


// fn for get all comments which bookmarked by user
const getAllbookmarkedComment = asyncHandler(async(req, res)=>{
    const {page=1, limit=20} = req.query
    const bookmarkedComments = await Bookmark.aggregate([

        {
            $match:{
                bookmarkedBy: new mongoose.Types.ObjectId(req.user._id),
                comment:{$exists:true}
            }
        },

        {
            $lookup:{
                from:"comments",
                localField:"comment",
                foreignField:"_id",
                as:"bookmarkedComment",
                pipeline:[
                    {
                        $lookup:{
                            from:"users",
                            localField:"commentBy",
                            foreignField:"_id",
                            as:"user",
                            pipeline:[
                                {
                                    $lookup:{
                                        from:"subscriptions",
                                        localField:"_id",
                                        foreignField:"follower",
                                        as:"followingDoc"
                                    },
                                },
                                {
                                    $lookup:{
                                        from:"subscriptions",
                                        localField:"_id",
                                        foreignField:"following",
                                        as:"followerDoc"
                                    },
                                }
                            ]
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
                                bio:"$user.bio",
                                follower:{$size:"$user.followerDoc"},
                                following:{$size:"$user.followingDoc"}
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
            $unwind:"$bookmarkedComment"
        },

        {
            $project:{
                _id:"$bookmarkedComment._id",
                text:"$bookmarkedComment.text",
                userDetails:"$bookmarkedComment.userDetails",
                createdAt:"$bookmarkedComment.createdAt",
                updatedAt:"$bookmarkedComment.updatedAt",
                bookmarkedAt: "$createdAt"
            }
        },

        {
            $sort:{
                bookmarkedAt:-1
            }
        },

        {
            $skip:(Number(page)-1)*Number(limit)
        },

        {
            $limit:Number(limit)
        }

    ])

    if(!bookmarkedComments){
        throw new ApiErrors(400, "Failed to fetched the bookmarked comments!")
    }

    return res.status(200).json(new ApiResponse(200, "Bookmarked comments fetched successfully.", bookmarkedComments))

})

export {toggleBookmarkedPost, toggleBookmarkedComment, getAllbookmarkedPost, getAllbookmarkedComment}
