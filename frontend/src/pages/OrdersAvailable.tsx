import CommandeCard from '@/components/CommandeCard';

const OrdersAvailable = () => {
  return (
    <div>
      {/* Image de la map */}
      <img src="/delivery/map.png" alt="map" className="w-full h-48 object-cover" />

      <div className="px-4 py-2">
        <h2 className="text-xl font-semibold text-center my-4">Commandes disponibles</h2>

        <div className="w-full h-px bg-gray-300 mb-4" />

        <CommandeCard
          restaurantName="KFC DIJON QUETIGNY"
          restaurantAddress="8 Bd de l'Europe, 21800 Quetigny"
          clientName="Jean DUPONT"
          clientAddress="12 route de pont, 21800 Quetigny"
          price="10,25€"
          time="18:29"
          distance="7,4km"
        />

        <CommandeCard
          restaurantName="KFC DIJON QUETIGNY"
          restaurantAddress="8 Bd de l'Europe, 21800 Quetigny"
          clientName="Jean DUPONT"
          clientAddress="12 route de pont, 21800 Quetigny"
          price="10,25€"
          time="18:29"
          distance="7,4km"
        />

      </div>
    </div>
  );
};

export default OrdersAvailable;
