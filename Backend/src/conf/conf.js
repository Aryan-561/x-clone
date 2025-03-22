import dotenv from "dotenv"
dotenv.config()
export default {
    name: process.env.CLOUD_NAME,
    key: process.env.CLOUD_API_KEY,
    secret: process.env.CLOUD_API_SECRET
}
