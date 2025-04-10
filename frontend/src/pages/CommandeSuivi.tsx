import { useLocation } from 'react-router-dom';
import CommandeCard from '@/components/CommandeCard';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

const CommandeSuivi = () => {
  const { state } = useLocation();

  const heure = new Date().toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const date = new Date().toLocaleDateString('fr-FR');

  return (
    <div>
      <div className="p-4">
        <CommandeCard
          restaurantName={state?.restaurantName || ''}
          restaurantAddress={state?.restaurantAddress || ''}
          clientName={state?.clientName || ''}
          clientAddress={state?.clientAddress || ''}
          price={state?.price || ''}
          time={state?.time || ''}
          distance={state?.distance || ''}
        />

        <Button className='rounded-full mt-4'>
          <Phone />
          Appeler le client
        </Button>

        <p className="text-sm text-gray-600 italic mt-4">
          Livraison acceptée à {heure} le {date}
        </p>

        <button className="w-full bg-black text-white py-2 rounded mt-4 font-semibold">
          Valider la livraison
        </button>
      </div>
    </div>
  );
};

export default CommandeSuivi;
