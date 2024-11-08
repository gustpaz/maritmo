import React from 'react';
import { Link } from 'react-router-dom';
import { Ship, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Ship className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold">Marítima Tours</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded-md">
                Início
              </Link>
              <Link to="/passeios" className="hover:bg-blue-700 px-3 py-2 rounded-md">
                Passeios
              </Link>
              <Link to="/reservar" className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md font-medium">
                Reservar Agora
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md hover:bg-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              to="/passeios"
              className="block px-3 py-2 rounded-md hover:bg-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Passeios
            </Link>
            <Link
              to="/reservar"
              className="block px-3 py-2 rounded-md bg-white text-blue-600 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Reservar Agora
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}