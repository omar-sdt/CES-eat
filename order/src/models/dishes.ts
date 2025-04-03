import mongoose from "mongoose";

export const dishSchema = new mongoose.Schema({
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    imageUrl: String,
    isAvailable: { type: Boolean, default: true },
    tags: [String],
}, { timestamps: true })

export const Dish = mongoose.model("Dish", dishSchema);

