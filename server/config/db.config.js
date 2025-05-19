import 'dotenv/config';
import mongoose from "mongoose";

const connectDB = async() =>{
    const MONGO = process.env.MONGO;
    try {
        const response = await mongoose.connect(MONGO);
        console.log(`connect to ${response.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;