import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import Panier from './cart';
import { CookingPot } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { DropdownNavbar } from './drop-down-navbar';

const Navbar = () => {
  const { accessToken } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <nav
      className={`w-full flex flex-row position-sticky top-0 z-50 ${isLoginPage ? 'bg-black text-white' : 'backdrop-filter backdrop-blur-lg'}`}
    >
      <div className={`pl-6 pr-8 py-2 clip-path ${isLoginPage ? 'bg-black' : 'bg-primary'}`}>
        <Link to="/home">
          <img src="/logo-navbar.svg" alt="Logo" className="inline-block mr-2 w-[10rem]" />
        </Link>
      </div>

      <div className={`w-full flex flex-row justify-end items-center pr-6 gap-4 ${isLoginPage ? 'bg-black' : ''}`}>
        {/* Si on est sur la page de login, on n'affiche que le bouton Accueil */}
        {isLoginPage ? (
          <Button variant="secondary" size="navbar" effect="shineHover" asChild>
            <Link to="/home">
              <CookingPot />
              Accueil
            </Link>
          </Button>
        ) : (
          <>
            <Panier />

            {/* Afficher les boutons "Mes commandes" et "Mon compte" uniquement si l'utilisateur est connecté */}
            {accessToken ? (
              <>
                <DropdownNavbar />
              </>
            ) : (
              <Button variant="secondary" size="navbar" effect="shineHover" className="" asChild>
                <Link to="/login">Se connecter</Link>
              </Button>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
