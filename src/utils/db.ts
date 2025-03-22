import mongoose from "mongoose";

const MONGO_URI = process.env.NEXT_PUBLIC_MONGO_URI

export const connectDatabase = async () => {
    console.log("MONGO URI", MONGO_URI)
    await mongoose.connect(MONGO_URI!)
    console.log("Database connected")
}