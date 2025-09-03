import mongoose from "mongoose";
import { DB_NAME } from "../src/constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`DB connected to host ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Error connecting to DB:", error);
        process.exit(1);
    }
}

export default connectDB