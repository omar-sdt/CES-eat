import { z } from 'zod';

export const restaurantSchema = z.object({
    id: z.string(),
    name: z.string(),
    address: z.string(),
    rating: z.number().min(0).max(5), // La note est un nombre entre 0 et 5
    src: z.string(), // L'URL de l'image
    alt: z.string(), // Texte alternatif pour l'image
    tag: z.array(z.string()).optional(), // Liste de tags (facultatif)
});

export type Restaurant = z.infer<typeof restaurantSchema>;
