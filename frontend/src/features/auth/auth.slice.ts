import {User} from "@/schemas/user.schema.ts";
import {createSlice} from "@reduxjs/toolkit";
import {loginUser, registerUser} from "@/features/auth/auth.actions.ts";

type InitialState = {
    loading: boolean;
    userInfo: User | null;
    userToken: string | null;
    error: string | null;
    success: boolean;
}

const initialState: InitialState = {
    loading: false,
    userInfo: null,
    userToken: "",
    error: null,
    success: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('accessToken') // deletes token from storage
            state.loading = false
            state.userInfo = null
            state.userToken = null
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = false
                state.userToken = payload.accessToken
                state.userInfo = payload.user
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;

                const error = action.payload;

                if (error && "details" in error && Array.isArray(error.details)) {
                    const messages = error.details.map((d) => d.message).join(", ");
                    state.error = messages || null;
                } else if (error && "message" in error) {
                    state.error = error.message;
                } else {
                    state.error = "Erreur inconnue";
                }
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false
                state.success = true // registration successful
            })
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.loading = false;

                if (payload?.details && Array.isArray(payload.details)) {
                    state.error = payload.details.map((d) => d.message).join(", ");
                } else {
                    state.error = payload?.error || "Erreur inconnue";
                }
            })
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;