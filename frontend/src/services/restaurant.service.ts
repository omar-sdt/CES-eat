// import { createApi } from "@reduxjs/toolkit/query/react";
// import { axiosBaseQuery } from "@/lib/axios-base-query.ts";
// import {Restaurant, RestaurantDetails, restaurantDetails, restaurantSchema} from "@/schemas/restaurantSchema.ts";
// import axios from "axios";

// export const restaurantsApi = createApi({
//     baseQuery: axiosBaseQuery(),
//     reducerPath: 'restaurants',
//     tagTypes: ['restaurants'],
//     endpoints: (build) => ({
//         getAllRestaurants: build.query<Restaurant[], void>({
//             queryFn: async () => {
//                 try {
//                     const response = await axios.get('http://localhost:8080/restaurants');
//                     const data = response.data;

//                     // Parse the data with the restaurantSchema
//                     const parsedData = restaurantSchema.array().parse(data);

//                     // Return the parsed data as an array
//                     return { data: parsedData };
//                 } catch (error) {
//                     console.error(error);
//                     // Handle error
//                     return { error: { status: 'CUSTOM_ERROR', error: 'Error fetching restaurants' } };
//                 }
//             },
//             providesTags: ['restaurants'],
//         }),
//         getRestaurantById: build.query<RestaurantDetails, string>({
//             queryFn: async (id: string) => {
//                 try {
//                     const response = await axios.get(`http://localhost:8080/restaurant/${id}`);
//                     const parsed = restaurantDetails.parse(response.data);
//                     return { data: parsed };
//                 } catch (error) {
//                     return { error: { status: 'CUSTOM_ERROR', error: 'Error fetching restaurant details' } };
//                 }
//             },
//             providesTags: ['restaurants'],
//         }),
//     }),
// });

// export const { useGetAllRestaurantsQuery, useGetRestaurantByIdQuery } = restaurantsApi;
// export default restaurantsApi;