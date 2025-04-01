import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    dishes: [
        {
            dishId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'delivered', 'cancelled'],
        default: 'pending'
    },
    totalAmount: { type: Number, required: true },
    deliveryAddress: { type: String, required: true }
}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);