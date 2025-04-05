import { format } from "date-fns";

type OrderProps = {
  id: string;
  clientName: string;
  items: string[];
  totalPrice: number;
  orderType: string; 
  status: string; 
  orderDate: string;
  deliveryTime: string;
};

const OrderCard = ({
  id,
  clientName,
  items,
  totalPrice,
  orderType,
  status,
  orderDate,
  deliveryTime,
}: OrderProps) => {
  return (
    <div className="flex flex-col border-2 rounded-sm p-4 gap-2">
      <h2 className="text-lg font-semibold">Commande #{id}</h2>
      <p className="text-sm">
        <span className="font-semibold">Client :</span> {clientName}
      </p>
      <p className="text-sm">
        <span className="font-semibold">Commande :</span> {items.join(", ")}
      </p>
      <p className="text-sm">
        <span className="font-semibold">Date :</span>{" "}
        {format(new Date(orderDate), "dd/MM/yyyy")}
      </p>
      <p className="text-sm">
        <span className="font-semibold">Heure de livraison :</span>{" "}
        {format(new Date(deliveryTime), "HH:mm")}
      </p>
      <p className="text-sm">
        <span className="font-semibold">Prix :</span> {totalPrice.toFixed(2)} €
      </p>
      <p className="text-sm">
        <span className="font-semibold">Type :</span> {orderType}
      </p>
      <p className="text-sm">
        <span className="font-semibold">Statut :</span> {status}
      </p>
    </div>
  );
};

export default OrderCard;