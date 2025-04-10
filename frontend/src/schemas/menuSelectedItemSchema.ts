import { z } from 'zod';

export const menuSelectedItemSchema = z.object({
    id: z.string(),
    restaurantId: z.string(),
    name: z.string(),
    price: z.number().positive(),
    size: z.string(),
    accompaniment: z.string(),
    drink: z.string(),
    src: z.string(),
    quantity: z.number().int().positive(),
});

export type MenuSelectedItem = z.infer<typeof menuSelectedItemSchema>;