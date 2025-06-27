import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
//connection string for database
const connectDb = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MONGODB connected !! DB HOST: ${connection.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection error:", error);
        process.exit(1);
    }
};

export default connectDb;
