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
        type:String, //cloundinary link
    },

    views:{
        type:Number,
        default:0
    }

},{timestamps:true})

export const Post = mongoose.model("Post",postSchema)