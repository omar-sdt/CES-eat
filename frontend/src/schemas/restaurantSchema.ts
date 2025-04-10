import { z } from 'zod';
import {dishSchema} from "@/schemas/dish.schema.ts";

export const restaurantBaseSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    description: z.string().optional(),
    address: z.string().optional(),
    imageUrl: z.string().url().optional(),
    categories: z.array(z.string()).optional(),
    rating: z.number().min(0).max(5).optional().default(4.5), // La note est un nombre entre 0 et 5
});

// Schéma complet pour lecture (ex: depuis MongoDB)
export const restaurantSchema = restaurantBaseSchema.extend({
    _id: z.string(), // Ou z.instanceof(mongoose.Types.ObjectId) si tu veux le type ObjectId
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()),
});

export type Restaurant = z.infer<typeof restaurantSchema>;
export type RestaurantBase = z.infer<typeof restaurantBaseSchema>;

export const restaurantDetails = z.object({
    restaurant: restaurantSchema,
    dishes: z.array(dishSchema)
})

export type RestaurantDetails = z.infer<typeof restaurantDetails>;
