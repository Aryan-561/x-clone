import mongoose, {Schema} from "mongoose";

const bookmarkSchema =  Schema({

    post:{
        type:Schema.Types.ObjectId,
        ref:"Post"
    },

    comment:{
        type:Schema.Types.ObjectId,
        ref:"Comment"
    },

    bookmarkedBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true})

export const Bookmark = mongoose.model("Bookmark", bookmarkSchema)