import mongoose, {Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; 

const postSchema = Schema({
    createdBy:{
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

postSchema.plugin(mongooseAggregatePaginate);

export const Post = mongoose.model("Post",postSchema)