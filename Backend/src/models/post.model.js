import mongoose, {Schema} from "mongoose"

const postSchema = Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required
    },

    text:{
        type:String,
        required
    },

    media:{
        type:String, //cloundinary link
    },

    comment:[
        {
            type:Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],

    like:[
        {
            type:Schema.Types.ObjectId,
            ref:"Like"
        }
    ],
    views:{
        type:Number,
        default:0
    }

},{timestamps})

export const Post = mongoose.model("Post",postSchema)