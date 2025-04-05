"use client";

import { orders } from "@/data/orders-data";
import OrderCard from "@/components/ui/order-card";

const Orders = () => {
  const filterOrders = (status: string) =>
    orders.filter((order) => order.status === status);

};

export default Orders;
