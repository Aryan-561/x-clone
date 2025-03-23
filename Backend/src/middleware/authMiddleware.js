import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.model.js";
import ApiErrors from "../utils/ApiErrors.js";
import conf from "../conf/conf.js";

// Middleware to verify JWT token and attach user to request object
const verifyJwt = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies.accessToken;
        // console.log("token", token);
        if (!token) {
            throw new ApiErrors(401, "Unauthorized, please login");
        }
        const decoded = jwt.verify(token, conf.accessSecretToken);
        const user = await User.findById(decoded.id).select(" -password -refreshToken");
        if (!user) {
            throw new ApiErrors(404, "User not found, please re-check user details");
        }

        // decode information from accesstoken and add to req.user
        req.user = user
        next()

    } catch (error) {

        console.error("Error verifying token", error);
        if (error.name === "TokenExpiredError") {
            throw new ApiErrors(401, "Session expired, please re-login");
        }
        if (error.name === "JsonWebTokenError") {
            throw new ApiErrors(401, "Invalid token, please login again");
        }

        throw new ApiErrors(500, "Failed to authenticate token");

    }
})
export default verifyJwt