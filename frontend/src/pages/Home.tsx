"use client";

import { useGetUserDetailsQuery } from "@/services/auth.service";
import UserHome from "@/components/home/UserHome";
import DeliveryHome from "@/components/home/DeliveryHome";
import RestaurantHome from "@/components/home/RestaurantHome";
import { useSelector } from "react-redux";
import { RootState } from "@/store.ts";

const Home = () => {
    const { data } = useGetUserDetailsQuery();
    const { userToken } = useSelector((state: RootState) => state.auth);


    return (
        <div className="w-full max-w-7xl mx-auto p-4 flex flex-col items-center">
            {userToken && data && data.role === "USER" && (
                <UserHome />
            )}

            {userToken && data && data.role === "DELIVERY" && (
                <DeliveryHome />
            )}

            {userToken && data && data.role === "RESTAURANT" && (
                <RestaurantHome />
            )}

            {!userToken && (
                <UserHome />
            )}
        </div>
    );
};

export default Home;
