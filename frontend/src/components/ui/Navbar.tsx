import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-xl font-bold">MonSite</a>

        {/* Bouton menu mobile */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Liens Desktop */}
        <ul className="hidden md:flex space-x-6">
          <li><a href="#" className="hover:underline">Accueil</a></li>
          <li><a href="#" className="hover:underline">À Propos</a></li>
          <li><a href="#" className="hover:underline">Contact</a></li>
        </ul>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <ul className="md:hidden mt-4 space-y-2 text-center">
          <li><a href="#" className="block py-2 bg-blue-500 rounded">Accueil</a></li>
          <li><a href="#" className="block py-2 bg-blue-500 rounded">À Propos</a></li>
          <li><a href="#" className="block py-2 bg-blue-500 rounded">Contact</a></li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
