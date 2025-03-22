import { Schema, model } from "mongoose";
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true

    },
    fullName: {
        type: String,
        required: true,
        trim: true


    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        // required: true
    },
    coverImage: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    // will back here soon
    bio: {
        type: String
    },
    link: {
        type: String
    },
    refreshToken: {
        type: String
    }
}
    , {
        timestamps: true
    }

)
const User = model("User", userSchema)
export default User;