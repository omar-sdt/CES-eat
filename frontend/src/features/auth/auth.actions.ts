import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    RegisterUser,
    RegisterUserError,
    registerUserErrorSchema,
    userSchema,
    User,
    loginResponseSchema, loginErrorSchema, LoginResponse, LoginError
} from "@/schemas/userSchema";
import axios from "axios";

export const registerUser = createAsyncThunk<
    User,
    RegisterUser,
    {
        rejectValue: RegisterUserError;
    }
>(
    'auth/register',
    async ({ name, email, password, role }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const response = await axios.post(
                'http://localhost:8080/register',
                { name, email, password, role },
                config
            );

            // ✅ Valider la réponse comme un "User"
            const parsed = userSchema.safeParse(response.data);

            if (parsed.success) {
                return parsed.data;
            }

            // ❌ Si ça ne correspond pas, on tente de parser comme erreur
            const parsedError = registerUserErrorSchema.safeParse(response.data);
            if (parsedError.success) {
                return rejectWithValue(parsedError.data);
            }

            // 😵‍💫 Sinon, c’est un format inconnu
            return rejectWithValue({
                error: "Invalid server response format",
            });

        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                const parsed = registerUserErrorSchema.safeParse(error.response.data);
                if (parsed.success) {
                    return rejectWithValue(parsed.data);
                }
            }

            return rejectWithValue({
                error: "An unknown error occurred",
            });
        }
    }
);

export const loginUser = createAsyncThunk<
    LoginResponse,
    { email: string; password: string },
    { rejectValue: LoginError }
>(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "http://localhost:8080/login",
                { email, password },
                { headers: { "Content-Type": "application/json" } }
            );

            const parsed = loginResponseSchema.safeParse(response.data);
            if (parsed.success) {
                localStorage.setItem('accessToken', parsed.data.accessToken);

                return parsed.data;
            }

            return rejectWithValue({ message: "Unexpected server response" });
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                const parsed = loginErrorSchema.safeParse(error.response.data);
                if (parsed.success) {
                    return rejectWithValue(parsed.data);
                }
            }

            return rejectWithValue({ message: "Unknown error occurred" });
        }
    }
);