import ApiErrors from "../utils/ApiErrors.js"
import ApiResponse from "../utils/ApiResponse.js"
import {Subscription} from "../models/subscription.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import mongoose, { isValidObjectId } from "mongoose"

// fn for toogle subscription
const toggleSubscription = asyncHandler(async(req, res)=>{
    
    const {followingId} = req.params
    
    if(!followingId?.trim()){
        throw new ApiErrors(400, "Following Id is required!")
    }

    if(!isValidObjectId(followingId)){
        throw new ApiErrors(400, "Invalid following id!")
    }

    if(followingId==req.user._id){
        throw new ApiErrors(403, "Can't follow ownself!")
    }

    const isFollowing = await Subscription.findOne({following:followingId, follower:req.user?._id})

    if(isFollowing){
        const delteSubscription = await Subscription.findByIdAndDelete(isFollowing?._id)

        if(!delteSubscription){
            throw new ApiErrors(404, "Subscrition not found!")
        }

        return res.status(200).json(new ApiResponse(200, "Unfollow the User", {}))
    }

    const subscriptionDoc = await Subscription.create({
        following:followingId,
        follower:req.user?._id
    })

    if(!subscriptionDoc){
        throw new ApiErrors(400, "Failed to follow the user!")
    }

    return res.status(200).json(new ApiResponse(200,"Follow the User successfully!", subscriptionDoc))

}) 


// fn for fetched user's all followers 
const getUserFollower = asyncHandler(async(req, res)=>{
    const {userId} = req.params

    if(!userId){
        throw new ApiErrors(400, "user id is required!")
    }

    if(!isValidObjectId(userId)){
        throw new ApiErrors(400, "invalid user id!")
    }

    const follower = await Subscription.aggregate([

        {
            $match:{
                following: new mongoose.Types.ObjectId(userId)
            }
        },

        {
            $lookup:{
                from:"users",
                localField:"follower",
                foreignField:"_id",
                as:"followerDetails",
            }
        },

        {
            $unwind:"$followerDetails"
        },

        {
            $project:{
                _id:"$followerDetails._id",
                username:"$followerDetails.userName",
                fullName:"$followerDetails.fullName",
                profileImage:"$followerDetails.profileImage",
                bio:"$followerDetails.bio"
            }
        }

    ])

    if(!follower){
        throw new ApiErrors(400, "failed to fetched user followers!")
    }

    return res.status(200).json(new ApiResponse(200, "User followers fetched successfully.", follower))
})


// fn for fetched user's all following
const getUserFollowing = asyncHandler(async(req, res)=>{
    const {userId} = req.params

    if(!userId){
        throw new ApiErrors(400, "user id is required!")
    }

    if(!isValidObjectId(userId)){
        throw new ApiErrors(400, "invalid user id!")
    }

    const following = await Subscription.aggregate([

        {
            $match:{
                follower: new mongoose.Types.ObjectId(userId)
            }
        },

        {
            $lookup:{
                from:"users",
                localField:"following",
                foreignField:"_id",
                as:"followingDetails",
            }
        },

        {
            $unwind:"$followingDetails"
        },

        {
            $project:{
                _id:"$followingDetails._id",
                username:"$followingDetails.userName",
                fullName:"$followingDetails.fullName",
                profileImage:"$followingDetails.profileImage",
                bio:"$followingDetails.bio"
            }
        }

    ])

    if(!following){
        throw new ApiErrors(400, "failed to fetched user following!")
    }

    return res.status(200).json(new ApiResponse(200, "User following fetched successfully.", following))
})


export {toggleSubscription, getUserFollower, getUserFollowing}