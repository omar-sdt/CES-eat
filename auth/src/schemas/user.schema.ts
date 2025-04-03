import {z} from "zod";

export const userRegisterSchema = z.object({
    name: z.string().nonempty(),
    email: z.string().email(),
    password: z.string(),
})

export const userLoginSchema = z.object({}).merge(userRegisterSchema.omit({name: true}));

export const authenticateSchema = z.object({
    accessToken: z.string(),
});