import express from 'express';
import cookieParser from "cookie-parser"
import conf from './conf/conf.js';
import router from './routes/userRoutes.js';
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

// Routes
app.use("/api/v1/users",router)


export default app