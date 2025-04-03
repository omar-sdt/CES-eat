import {z} from "zod";

export const restaurantPostSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    address: z.string().min(1),
    categories: z.array(z.string()).min(1),
});