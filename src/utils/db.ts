import mongoose from "mongoose";

export const connectDatabase = async () => {
    const MONGO_URI = "mongodb+srv://kunalpurbia:oAriCQSS6PyTiGuN@cluster0.fqt29.mongodb.net/shared-notes?retryWrites=true&w=majority"
    await mongoose.connect(MONGO_URI!)
    console.log("Database connected")
}