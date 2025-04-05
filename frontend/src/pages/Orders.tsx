"use client";

import { orders } from "@/data/orders-data";
import OrderCard from "@/components/ui/order-card";

const Orders = () => {
  const filterOrders = (status: string) =>
    orders.filter((order) => order.status === status);

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestion des commandes</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Nouvelles commandes</h2>
        <div className="grid grid-cols-1 gap-4">
          {filterOrders("Nouvelles").map((order) => (
            <OrderCard key={order.id} {...order} />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">En cuisine</h2>
        <div className="grid grid-cols-1 gap-4">
          {filterOrders("En cuisine").map((order) => (
            <OrderCard key={order.id} {...order} />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Prêtes</h2>
        <div className="grid grid-cols-1 gap-4">
          {filterOrders("Prête").map((order) => (
            <OrderCard key={order.id} {...order} />
          ))}
        </div>
      </section>
    </div>
  );
}; 

export default Orders;
