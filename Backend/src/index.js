import app from "./app.js";
import database from "./config/db.js";
import dotenv from "dotenv"
dotenv.config()

// Connect to MongoDB database
database(process.env.MONGODB_URI)

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})