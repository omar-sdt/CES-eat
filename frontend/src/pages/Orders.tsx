"use client";


import { useGetUserDetailsQuery } from "@/services/auth.service";

const Orders = () => {

  const { data } = useGetUserDetailsQuery();

  // Vérifie si les données sont encore en train de se charger
  if (!data) {
    return <div>Chargement...</div>; // Affiche un message pendant le chargement
  }

  return (
    <>
      <div>Vos commandes passés...</div>
    </>
  );
};

export default Orders;
