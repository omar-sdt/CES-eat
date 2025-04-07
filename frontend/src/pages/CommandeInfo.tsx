import React from 'react';
import { useLocation } from 'react-router-dom';
import CommandeCard from '@/components/CommandeCard';
import NavbarSimple from '@/components/NavbarSimple';

const CommandeInfo = () => {
  const location = useLocation();
  const { state } = location;

  return (
    <div>
      <NavbarSimple />

      <div className="p-4">
        {/* Affichage de la commande */}
        <CommandeCard
          restaurantName={state?.restaurantName || 'N/A'}
          restaurantAddress={state?.restaurantAddress || ''}
          clientName={state?.clientName || ''}
          clientAddress={state?.clientAddress || ''}
          price={state?.price || ''}
          time={state?.time || ''}
          distance={state?.distance || ''}
        />

        {/* Bouton pour accepter */}
        <button className="w-full bg-black text-white py-2 rounded mt-6">
          Accepter la livraison
        </button>
      </div>
    </div>
  );
};

export default CommandeInfo;
