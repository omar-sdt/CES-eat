import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Navbar = () => {

  return (
    <nav className="text-white w-full flex flex-row position-sticky top-0 z-50 backdrop-filter backdrop-blur-lg">
      <div className="bg-primary pl-6 pr-8 py-2 clip-path">
        <Link to="/" className="">
          <img src="/logo-navbar.svg" alt="Logo" className="inline-block mr-2 w-[10rem]" />
        </Link>
      </div>

      <div className='bg-white w-full flex flex-row justify-end items-center pr-6 gap-4'>
        <Button variant="default" size="sm" effect="shineHover" className="" asChild>
          <a href="/">Panier • 0</a>
        </Button>

        <Button variant="secondary" size="sm" effect="shineHover" className="" asChild>
          <a href="/orders">Mes commandes</a>
        </Button>

        <Button variant="secondary" size="sm" effect="shineHover" className="" asChild>
          <a href="/my-account">Mon compte</a>
        </Button>
      </div>
    </nav >
  );
}

export default Navbar