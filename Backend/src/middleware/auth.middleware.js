import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import ApiErrors from "../utils/ApiErrors.js";
import conf from "../conf/conf.js";

// Middleware to verify JWT token and attach user to request object
const verifyJwt = asyncHandler(async (req, _, next) => {
// console.log('Auth middleware - Request path:', req.path)
// console.log('Auth middleware - Cookies:', req.cookies)
// console.log('Auth middleware - Headers:', req.headers)
    
    try {
        const token = req.cookies?.accessToken;
// console.log("Access token status:", token ? "Present" : "Not present")
        
        if (!token) {
// console.log("No access token found in cookies")
            throw new ApiErrors(401, "Unauthorized, please login");
        }

        try {
// console.log("Attempting to verify token...")
            const decoded = jwt.verify(token, conf.accessSecretToken);
            console.log("Token decoded successfully:", {
                userId: decoded.id,
                email: decoded.email,
                exp: new Date(decoded.exp * 1000).toISOString()
            });

            const user = await User.findById(decoded.id).select("-password -refreshToken");
            if (!user) {
// console.log("User not found for decoded token ID:", decoded.id)
                throw new ApiErrors(404, "User not found");
            }
// console.log("User authenticated successfully:", user._id.toString())
            next();
        } catch (error) {
            console.error("Token verification error:", {
                name: error.name,
                message: error.message,
                expiredAt: error.expiredAt ? new Date(error.expiredAt).toISOString() : undefined
            });
            
            if (error.name === "TokenExpiredError") {
                throw new ApiErrors(401, "Token expired");
            }
            if (error.name === "JsonWebTokenError") {
                throw new ApiErrors(401, "Invalid token");
            }
            throw error;
        }
    } catch (error) {
        console.error("Auth middleware error:", error);
        next(error);
    }
});

export default verifyJwt;