import { z } from "zod";

export const dishBaseSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    description: z.string().min(1, "La description est requise"),
    price: z.number().min(0, "Le prix doit être positif"),
    imageUrl: z.string().url().nullable().optional(),
    restaurantId: z.string().min(1, "L’ID du restaurant est requis"),
    tags: z.array(z.string()).optional(),
});

export const dishSchema = dishBaseSchema.extend({
    _id: z.string(),
    isAvailable: z.boolean().default(true),
    createdAt: z.string().or(z.date()),
    updatedAt: z.string().or(z.date()),
});

export type Dish = z.infer<typeof dishSchema>;