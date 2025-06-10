import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("databazaya baglandi");
    } catch (error) {
        console.log("databazaya baglana bilmedi", error);

    }
}