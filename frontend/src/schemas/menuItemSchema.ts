import { z } from 'zod';

const optionSchema = z.object({
    name: z.string(),
    price: z.number().min(0)
});

const optionsSchema = z.object({
    size: z.array(optionSchema).optional(),
    accompaniments: z.array(optionSchema).optional(),
    drinks: z.array(optionSchema).optional()
}).partial();

export const menuItemSchema = z.object({
    name: z.string(),
    basePrice: z.number().positive(),
    description: z.string(),
    image: z.string(),
    options: optionsSchema.optional()
});

export const menuCategorySchema = z.object({
    category: z.string(),
    items: z.array(menuItemSchema)
});

export type Menu = z.infer<typeof menuItemSchema>;
export type MenuCategory = z.infer<typeof menuCategorySchema>;
export type MenuOptions = z.infer<typeof optionsSchema>;
export type MenuOption = z.infer<typeof optionSchema>;