import React from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white w-64 h-full shadow-lg p-4">
        
        <button onClick={onClose}>
          <X className="w-6 h-6 mb-4 cursor-pointer" />
        </button>

        <ul className="space-y-4 text-center font-medium">
          <li className="py-2 border-b"><Link to="/home_livreur" onClick={onClose}>Accueil</Link></li>
          <li className="py-2 border-b"><Link to="/livraisons" onClick={onClose}>Mes Livraisons</Link></li>
          <li className="py-2 border-b"><Link to="/parrainage" onClick={onClose}>Parrainage</Link></li>
          <li className="py-2 border-b"><Link to="/profile" onClick={onClose}>Mon Profil</Link></li>
        </ul>
        
      </div>
    </div>
  );
};

export default BurgerMenu;
