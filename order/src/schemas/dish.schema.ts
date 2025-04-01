import {z} from "zod";

export const dishPostSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.number().min(0),
    imageUrl: z.string().nullable().optional(),
    restaurantId: z.string().min(1),
    tags: z.array(z.string()),
});