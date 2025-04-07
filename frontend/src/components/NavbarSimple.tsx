import React from 'react';
import { Menu } from 'lucide-react';

const NavbarSimple = () => {
  return (
    <nav className="flex justify-between items-center bg-white p-4 shadow-sm">
      <Menu className="cursor-pointer w-6 h-6" />

      <img
        src="/delivery/logod.png"
        alt="Logo Ces'Eat"
        className="h-8 w-auto"
      />
    </nav>
  );
};

export default NavbarSimple;