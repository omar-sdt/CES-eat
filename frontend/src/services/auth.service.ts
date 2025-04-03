import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {User} from "@/schemas/user.schema.ts";

export const authApi = createApi({
    reducerPath: "authApi",
    tagTypes: ['user'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:3000/',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                // include token in req header
                headers.set('Authorization', `Bearer ${token}`)
                return headers
            }
        },
    }),
    endpoints: (builder) => ({
        getUserDetails: builder.query<User, void>({
            query: () => ({
                url: 'auth/user',
                method: 'GET',
            }),
            providesTags: ['user'],
        })
    })
});

export const { useGetUserDetailsQuery } = authApi;