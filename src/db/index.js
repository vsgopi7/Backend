import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"; // Add .js extension

const connectDB = async () => {
    try {
        const connectInstance = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: DB_NAME, // Specify the database name here
        });
        console.log(`DB connected to ${connectInstance.connection.host}`);
    } catch (error) {
        console.log("Error connecting to DB", error);
        process.exit(1);
    }
};

export default connectDB;