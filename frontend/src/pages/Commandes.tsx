import React from 'react';
import NavbarSimple from '@/components/NavbarSimple';
import CommandeCard from '@/components/CommandeCard';

const Commandes = () => {
  return (
    <div>
      <NavbarSimple />

      {/* Image de la map */}
      <img src="/delivery/map.png" alt="map" className="w-full h-48 object-cover" />

      <div className="px-4 py-2">
        <h2 className="text-xl font-semibold text-center my-4">Commandes disponibles</h2>

            {/* 🔽 Barre de séparation sous le titre */}
            <div className="w-full h-px bg-gray-300 mb-4" />

        {/* Liste de commandes */}
        <CommandeCard
          restaurantName="KFC DIJON QUETIGNY"
          restaurantAddress="8 Bd de l'Europe, 21800 Quetigny"
          clientName="Jean DUPONT"
          clientAddress="12 route de pont, 21800 Quetigny"
          price="10,25€"
          time="18:29"
          distance="7,4km"
        />

        {/* Répète autant que nécessaire */}
        <CommandeCard
          restaurantName="KFC DIJON QUETIGNY"
          restaurantAddress="8 Bd de l'Europe, 21800 Quetigny"
          clientName="Jean DUPONT"
          clientAddress="12 route de pont, 21800 Quetigny"
          price="10,25€"
          time="18:29"
          distance="7,4km"
        />

        {/* Ajoute d'autres cartes ici */}
      </div>
    </div>
  );
};

export default Commandes;
