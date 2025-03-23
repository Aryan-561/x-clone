import { connect } from "mongoose";

// Connect to MongoDB
const database = async (url) => {
    try {
        const dbConnect = await connect(url)
        // console.log(dbConnect);

        console.log(`Connected to MongoDB- Database:${dbConnect.connection.name}  host:${dbConnect.connection.host}  `);

    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1);

    }
}

export default database 