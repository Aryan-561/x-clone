import mongoose, {Schema} from "mongoose"

const postSchema = Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    text:{
        type:String,
        required:true
    },

    media:{
        url:{
            type:String, //cloundinary link
        },
        publicId:{
            type:String 
        },
        resourseType:{
            type:String
        }
    },

    views:{
        type:Number,
        default:0
    }

},{timestamps:true})

export const Post = mongoose.model("Post",postSchema)