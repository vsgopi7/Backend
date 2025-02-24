import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`DB connected to ${connectInstance.connection.host}`);
    } catch (error) {
        console.log("Error connecting to DB", error);
        process.exit(1);
    }
};

export default connectDB;