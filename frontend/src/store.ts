import {configureStore} from "@reduxjs/toolkit";
import authSlice from "@/features/auth/auth.slice.ts";
import {authApi} from "@/services/auth.service.ts";

const store = configureStore({
    reducer: {
        auth: authSlice,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;