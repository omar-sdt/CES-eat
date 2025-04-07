import {z} from "zod";

export const userSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string().min(1),
    password: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export type User = z.infer<typeof userSchema>;

export const registerUserSchema = z.object({
    email: z.string().email('Invalid email address'),
    name: z.string().min(1, 'Name is required'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type RegisterUser = z.infer<typeof registerUserSchema>;

export const registerUserErrorSchema = z.object({
    error: z.string(),
    details: z.array(z.object({ message: z.string() })).optional(),
});

export type RegisterUserError = z.infer<typeof registerUserErrorSchema>;

export const loginResponseSchema = z.object({
    accessToken: z.string(),
    user: userSchema,
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;

export const simpleErrorSchema = z.object({
    message: z.string(),
});

export const loginErrorSchema = z.union([
    registerUserErrorSchema,
    simpleErrorSchema,
]);

export type LoginError = z.infer<typeof loginErrorSchema>;

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type LoginUser = z.infer<typeof loginSchema>;