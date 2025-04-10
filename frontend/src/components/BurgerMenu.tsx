import React from 'react';
import { LogOut, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { logout } from '@/features/auth/auth.slice';
import { useDispatch } from 'react-redux';

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`w-full bg-white h-full shadow-lg p-4 w-64 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        <div className="flex mb-6">
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Fermer le menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <ul className="space-y-4">
          <li className="py-3 border-b border-gray-300">
            <Link
              to="/home"
              onClick={onClose}
              className="flex justify-center items-center w-full hover:text-primary transition-colors"
            >
              Accueil
            </Link>
          </li>

          <li className="py-3 border-b border-gray-300">
            <Link
              to="/my-deliveries"
              onClick={onClose}
              className="flex justify-center items-center w-full hover:text-primary transition-colors"
            >
              Mes Livraisons
            </Link>
          </li>

          <li className="py-3 border-b border-gray-300">
            <Link
              to="/parrainage"
              onClick={onClose}
              className="flex justify-center items-center w-full hover:text-primary transition-colors"
            >
              Parrainage
            </Link>
          </li>

          <li className="py-3 border-b border-gray-300">
            <Link
              to="/profile"
              onClick={onClose}
              className="flex justify-center items-center w-full hover:text-primary transition-colors"
            >
              Mon Profil
            </Link>
          </li>

          <li className="pt-3">
            <button
              onClick={() => dispatch(logout())}
              className="flex justify-center items-center w-full gap-2 text-red-500 hover:text-red-600 transition-colors cursor-pointer"
            >
              <LogOut className="w-5 h-5" />
              <span>Se déconnecter</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BurgerMenu;