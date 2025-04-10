import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "@/lib/axios-base-query.ts";
import { CreateOrder, CreateOrderResponse, createOrderSchemaResponse } from "@/schemas/orderSchema";
import axios from "axios";

export const orderApi = createApi({
    baseQuery: axiosBaseQuery(),
    reducerPath: 'orders',
    tagTypes: ['orders'],
    endpoints: (build) => ({
        createOrder: build.mutation<CreateOrderResponse, CreateOrder>({
            queryFn: async (body) => {
                try {
                    const token = localStorage.getItem("accessToken");

                    const response = await axios
                        .post('http://localhost:8080/order', body, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        });

                    const data = response.data;

                    // Parse the data with the createOrderSchemaResponse
                    const parsedData = createOrderSchemaResponse.parse(data);

                    // Return the parsed data as an array
                    return { data: parsedData };
                } catch (error) {
                    console.error(error);
                    // Handle error
                    return { error: { status: 'CUSTOM_ERROR', error: 'Error creating order' } };
                }
            },
            invalidatesTags: ['orders'],
        })
    }),
})

export const { useCreateOrderMutation } = orderApi;
export default orderApi;