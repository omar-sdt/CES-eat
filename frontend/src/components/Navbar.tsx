import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import Panier from './Panier';
import { ReceiptText, User } from 'lucide-react';

const Navbar = () => {

  return (
    <nav className="text-white w-full flex flex-row position-sticky top-0 z-50 backdrop-filter backdrop-blur-lg">
      <div className="bg-primary pl-6 pr-8 py-2 clip-path">
        <Link to="/home" className="">
          <img src="/logo-navbar.svg" alt="Logo" className="inline-block mr-2 w-[10rem]" />
        </Link>
      </div>

      <div className='bg-white w-full flex flex-row justify-end items-center pr-6 gap-4'>
        <Panier />

        <Button variant="secondary" size="navbar" effect="shineHover" className="" asChild>
          <Link to="/orders">
            <ReceiptText />
            Mes commandes
          </Link>
        </Button>

        <Button variant="secondary" size="navbar" effect="shineHover" className="" asChild>
          <Link to="/my-account">
            <User />
            Mon compte
          </Link>
        </Button>
      </div>
    </nav >
  );
}

export default Navbar