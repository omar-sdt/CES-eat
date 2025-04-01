import dotenv from "dotenv";
import * as mongoose from "mongoose";

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb://${process.env.MONGO_DB_HOST}:27017`, {
            dbName: process.env.MONGO_DB_NAME,
            user: process.env.MONGO_DB_USER,
            pass: process.env.MONGO_DB_PASS,
            authSource: process.env.MONGO_DB_AUTH_SOURCE,
        });
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};