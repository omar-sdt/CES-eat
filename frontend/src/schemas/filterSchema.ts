import { z } from 'zod';

export const filterSchema = z.object({
    src: z.string(), // L'URL de l'image
    alt: z.string(), // Texte alternatif pour l'image
    title: z.string(), // Le titre du filtre
    value: z.string(), // La valeur unique pour identifier le filtre
});

export type Filter = z.infer<typeof filterSchema>;
