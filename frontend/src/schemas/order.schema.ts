import {z} from "zod";

export const createOrderSchema = z.object({
    userId: z.string(),
    restaurantId: z.string(),
    dishes: z.array(z.object({
        dishId: z.string(),
        quantity: z.number().min(1),
        price: z.number().min(0),
    })),
    deliveryAddress: z.string(),
    totalAmount: z.number().min(1),
})

export const createOrderSchemaResponse = z.object({
    userId: z.string(),
    restaurantId: z.string(),
    dishes: z.array(
        z.object({
            dishId: z.string(),
            quantity: z.number(),
            price: z.number(),
            _id: z.string(),
        })
    ),
    status: z.enum(["pending", "confirmed", "delivered", "cancelled"]), // tu peux adapter les valeurs possibles
    totalAmount: z.number(),
    deliveryAddress: z.string(),
    _id: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    __v: z.number(),
});

export type CreateOrder = z.infer<typeof createOrderSchema>;
export type CreateOrderResponse = z.infer<typeof createOrderSchemaResponse>;