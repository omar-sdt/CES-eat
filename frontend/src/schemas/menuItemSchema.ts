import { z } from 'zod';

export const menuItemSchema = z.object({
    name: z.string(),
    price: z.number().positive(),
    description: z.string(),
    image: z.string(),
});

export type Menu = z.infer<typeof menuItemSchema>;
