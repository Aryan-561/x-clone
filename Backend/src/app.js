import express from 'express';
import cookieParser from "cookie-parser"
import conf from './conf/conf.js';
import cors from 'cors';
const app = express();
// Middleware

// Serve static files from the "public" directory (usually used for frontend)
app.use(express.static('public'))

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors(
    {
        origin: "*",
        methods: ["GET", "POST", "PATCH" , "PUT", "DELETE"],
    }
))

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property
app.use(express.json(
));

// Parse cookies from request headers, available under the req.cookies property
app.use(express.urlencoded({ extended: true }));

// Cookie Parser Middleware ,parse cookies from request headers, available under the req.cookies property
app.use(cookieParser());

import postRouter from "./routes/post.routes.js"
import UserRouter from './routes/user.routes.js';
import likeRouter from './routes/like.routes.js';
import commentRouter from './routes/comment.routes.js'
import subscriptionRouter from "./routes/subscription.routes.js"
import bookmarkRouter from "./routes/bookmark.routes.js"

// Routes
app.use("/api/v1/users", UserRouter)
app.use("/api/v1/post", postRouter)
app.use("/api/v1/like",likeRouter )
app.use("/api/v1/comment",commentRouter )
app.use("/api/v1/subscription", subscriptionRouter)
app.use("/api/v1/bookmark", bookmarkRouter)



export default app