import { z } from 'zod';
import { restaurantItemSchema } from './restaurantItemSchema';

export const menuSelectedItemSchema = z.object({
    restaurant: restaurantItemSchema,
    name: z.string(),
    price: z.number().positive(),
    size: z.string(),
    accompaniment: z.string(),
    drink: z.string(),
    quantity: z.number().positive(),
});

export type MenuSelectedItem = z.infer<typeof menuSelectedItemSchema>;