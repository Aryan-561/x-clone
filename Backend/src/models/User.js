import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken"
import conf from "../conf/conf.js";
import bcrypt from "bcryptjs"
const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true
        },
        coverImage: {
            type: String,
        },
        profileImage: {
            type: String,
        },
        // will back here soon
        bio: {
            type: String,
        },
        link: {
            type: String,
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// hash the password before saving it to the database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password =  await bcrypt.hash(this.password, 10);
    next();
});
//  compare the password
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

// genrate access token
userSchema.methods.generateAccessToken = function () {
    const token = jwt.sign({
        id: this._id,
        email: this.email,
        userName: this.userName,
    },
        conf.accessSecretToken,
        { expiresIn: "15m" }
    )
    return token;
}

// generate refresh token
userSchema.methods.generateRefreshToken = async function () {
    const token = jwt.sign({
        id: this._id,
    },
        conf.refreshSecretToken,
        { expiresIn: "7d" })
    return token;
}
const User = model("User", userSchema);
export default User;
