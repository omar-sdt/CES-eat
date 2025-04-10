import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import BurgerMenu from './BurgerMenu';


const NavbarSimple = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <>
        <nav className="flex justify-between items-center bg-white p-4 shadow-sm">
          <Menu className="cursor-pointer w-6 h-6" onClick={() => setIsOpen(true)} />
          
          <img
            src="/delivery/logod.png"
            alt="Logo Ces'Eat"
            className="h-8 w-auto"
          />
        </nav>
  
        <BurgerMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </>
    );
  };

export default NavbarSimple;