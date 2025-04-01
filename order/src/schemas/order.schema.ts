import {z} from "zod";

export const orderPostSchema = z.object({
    userId: z.string(),
    restaurantId: z.string(),
    dishes: z.array(z.object({
        dishId: z.string(),
        quantity: z.number(),
        price: z.number()
    })),
    deliveryAddress: z.string(),
    totalAmount: z.number()
});