import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    address: String,
    imageUrl: String,
    categories: [String],
}, { timestamps: true });

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);