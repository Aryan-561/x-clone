import mongoose, {Schema} from "mongoose";

const commentSchema = Schema({
  
    text:{
        type:String,
        required:true
    },

    commentBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },

    post:{
        type:Schema.Types.ObjectId,
        ref:"Post"
    },

    replies:[
        {
            type:Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]

},{timestamps:true})

export const Comment  =  mongoose.model("Comment", commentSchema)