import {configureStore} from "@reduxjs/toolkit";
import authSlice from "@/features/auth/auth.slice.ts";
import {authApi} from "@/services/auth.service.ts";
import restaurantsApi from "@/services/restaurant.service.ts";
import cartReducer from "@/features/cart-slice.ts";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import orderApi from "@/services/order.service.ts";

const store = configureStore({
    reducer: {
        auth: authSlice,
        [authApi.reducerPath]: authApi.reducer,
        [restaurantsApi.reducerPath]: restaurantsApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, restaurantsApi.middleware, orderApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;