import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dish } from "@/schemas/dish.schema.ts";

interface CartItem {
    dish: Dish;
    quantity: number;
}

interface CartState {
    dishes: CartItem[];
}

const initialState: CartState = {
    dishes: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.dishes.find(
                (item) => item.dish._id === action.payload.dish._id
            );

            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.dishes.push(action.payload);
            }
        },
        removeFromCart: (state, action: PayloadAction<{ _id: string }>) => {
            state.dishes = state.dishes.filter(
                (item) => item.dish._id !== action.payload._id
            );
        },
        clearCart: (state) => {
            state.dishes = [];
        },
        updateQuantity: (state, action: PayloadAction<{ _id: string, quantity: number }>) => {
            const existingItem = state.dishes.find(
                (item) => item.dish._id === action.payload._id
            );

            if (existingItem) {
                existingItem.quantity = action.payload.quantity;
            }
        }
    },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;