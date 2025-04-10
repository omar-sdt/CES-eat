import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import Cart from './Cart';
import { ArrowLeft, Utensils } from 'lucide-react';
import { DropdownNavbar } from './DropDownNavbar';
import { useSelector } from "react-redux";
import { RootState } from "@/store.ts";
import { useGetUserDetailsQuery } from '@/services/auth.service';
import NavbarSimple from './NavbarSimple';

const Navbar = () => {
  const { userToken } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isPaymentPage = location.pathname === "/payment";

  const isConnected = !!userToken;
  const { data } = useGetUserDetailsQuery();

  if (isConnected && data?.role === "DELIVERY") {
    return (
      <>
        <NavbarSimple />
      </>)
  }

  //Navbar pour les restaurants
  if (isConnected && data?.role === "RESTAURANT") {
    return (
      <nav className="w-full h-[75px] align-center flex flex-row sticky top-0 z-50 backdrop-filter backdrop-blur-lg">
        <div className="pl-6 pr-8 py-2 clip-path bg-primary">
          <Link to="/home">
            <img src="/logo-navbar.svg" alt="Logo" className="inline-block mr-2 w-[10rem]" />
          </Link>
        </div>

        <div className="w-full flex flex-row justify-end items-center pr-6 gap-4">
          <Button variant="secondary" size="navbar" effect="shineHover" asChild>
            <Link to="/my-restaurant">
              <Utensils />
              Mon restaurant
            </Link>
          </Button>

          {userToken ? (
            <DropdownNavbar />
          ) : (
            <Button variant="secondary" size="navbar" effect="shineHover" asChild>
              <Link to="/login">Se connecter</Link>
            </Button>
          )}
        </div>
      </nav>
    );
  }

  // Navbar pour les pages login ou payment
  if (isLoginPage || isRegisterPage || isPaymentPage) {
    return (
      <nav className="w-full flex bg-black h-[80px] sticky top-0 z-50 text-white items-center ">

        <div className="flex w-full max-w-7xl mx-auto items-center justify-between">
          <Button variant="link" className='text-white' asChild>
            <Link to="/home">
              <ArrowLeft />
              Retourner à l'accueil
            </Link>
          </Button>
          <div>

          </div>

          <div className="pl-6 pr-8 bg-black absolute left-1/2 transform -translate-x-1/2">
            <Link to="/home">
              <img src="/logo-navbar.svg" alt="Logo" className="inline-block mr-2 w-[10rem]" />
            </Link>
          </div>
        </div>

      </nav>
    );
  }

  // Navbar pour les autres pages
  return (
    <nav className="w-full h-[75px] align-center flex flex-row sticky top-0 z-50 backdrop-filter backdrop-blur-lg">
      <div className="pl-6 pr-8 py-2 clip-path bg-primary">
        <Link to="/home">
          <img src="/logo-navbar.svg" alt="Logo" className="inline-block mr-2 w-[10rem]" />
        </Link>
      </div>

      <div className="w-full flex flex-row justify-end items-center pr-6 gap-4">
        <Cart />

        {userToken ? (
          <DropdownNavbar />
        ) : (
          <Button variant="secondary" size="navbar" effect="shineHover" asChild>
            <Link to="/login">Se connecter</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
