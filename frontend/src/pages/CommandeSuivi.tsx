import { useLocation } from 'react-router-dom';
import CommandeCard from '@/components/CommandeCard';
import NavbarSimple from '@/components/NavbarSimple';

const CommandeSuivi = () => {
  const { state } = useLocation();

  const heure = new Date().toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const date = new Date().toLocaleDateString('fr-FR');

  return (
    <div>
      <NavbarSimple />

      <div className="p-4">
        {/* Infos livraison */}
        <CommandeCard
          restaurantName={state?.restaurantName || ''}
          restaurantAddress={state?.restaurantAddress || ''}
          clientName={state?.clientName || ''}
          clientAddress={state?.clientAddress || ''}
          price={state?.price || ''}
          time={state?.time || ''}
          distance={state?.distance || ''}
        />

        {/* Bouton appeler */}
        <button className="bg-black text-white px-4 py-2 rounded-full mt-4 text-sm">
          Appeler le client
        </button>

        {/* Texte date */}
        <p className="text-sm text-gray-600 italic mt-4">
          Livraison acceptée à {heure} le {date}
        </p>

        {/* Bouton validation */}
        <button className="w-full bg-black text-white py-2 rounded mt-4 font-semibold">
          Valider la livraison
        </button>
      </div>
    </div>
  );
};

export default CommandeSuivi;
