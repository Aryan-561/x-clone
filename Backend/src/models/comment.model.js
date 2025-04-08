import mongoose, { Schema } from "mongoose";

const commentSchema = Schema({

    text: {
        type: String,
        required: true
    },

    commentBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        // required: true

    },
    parentComment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },

    replies: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],


    views: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    }


}, { timestamps: true })

export const Comment = mongoose.model("Comment", commentSchema)