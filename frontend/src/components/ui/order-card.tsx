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
    
  );
};

export default OrderCard;