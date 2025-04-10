import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "@/schemas/userSchema";

export const authApi = createApi({
    reducerPath: "authApi",
    tagTypes: ['user'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8080/',
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
                url: 'user',
                method: 'GET',
            }),
            providesTags: ['user'],
        })
    })
});

export const { useGetUserDetailsQuery } = authApi;