import dotenv from "dotenv"
dotenv.config()
//  easy way of accesing env variables
export default {
    name: process.env.CLOUD_NAME,
    key: process.env.CLOUD_API_KEY,
    secret: process.env.CLOUD_API_SECRET,
    accessSecretToken: String(process.env.ACCESS_TOKEN),
    refreshSecretToken: String(process.env.REFRESH_TOKEN),
    port: process.env.PORT || 5000,
    nodemailAuth: process.env.NODEMAIL_AUTH,
    nodemailPass: process.env.NODEMAIL_PASS,
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    jwtSecret: process.env.JWT_SECRET
}
