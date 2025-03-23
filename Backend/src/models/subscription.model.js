import mongoose, {Schema} from "mongoose";

const subscriptionSchema = Schema({
    
    following:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },

    follower:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true})

export const Subscription = mongoose.model("Subscription", subscriptionSchema)