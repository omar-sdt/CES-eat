import React from 'react';

interface CommandeCardProps {
  restaurantName: string;
  restaurantAddress: string;
  clientName: string;
  clientAddress: string;
  price: string;
  time: string;
  distance: string;
  onClick?: () => void;
}

const CommandeCard: React.FC<CommandeCardProps> = ({
    restaurantName,
    restaurantAddress,
    clientName,
    clientAddress,
    price,
    time,
    distance,
    onClick,
  }) => {
    return (
      <div className="flex justify-between border-b px-4 py-4">
        {/* Partie gauche : colonne verticale avec icônes et trait */}
        <div className="flex">
          <div className="flex flex-col items-center mr-2">
            <img src="/delivery/resto.png" alt="restaurant" className="w-5 h-5" />
            <div className="flex-1 w-px bg-gray-300 border-l border-dashed my-1" style={{ height: '16px' }} />
            <img src="/delivery/maison.png" alt="home" className="w-5 h-5" />
          </div>
  
          {/* Infos à droite des icônes */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="font-semibold">{restaurantName}</p>
              <p className="text-sm text-gray-500">{restaurantAddress}</p>
            </div>
            <div>
              <p className="font-medium">{clientName}</p>
              <p className="text-sm text-gray-500">{clientAddress}</p>
            </div>
          </div>
        </div>
  
        {/* Partie droite : bouton + badges */}
        <div className="flex flex-col items-end justify-between">
          <button
            onClick={onClick}
            className="bg-gray-100 px-4 py-2 rounded-full font-semibold text-sm shadow-sm"
          >
            Voir plus
          </button>
  
          <div className="flex gap-2 mt-2">
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
              {price}
            </span>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
              {time}
            </span>
            <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-2 py-1 rounded-full">
              {distance}
            </span>
          </div>
        </div>
      </div>
    );
  };
  

export default CommandeCard;
