import PropTypes from "prop-types";
import { useState } from "react";
import { FiMenu, FiUser, FiX } from "react-icons/fi";

import MenuItem from "./MenuItem";

function Menu({ options }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex">
          {options.map((option, index) => (
            <MenuItem key={index} item={option} />
          ))}
        </div>

        <div className="hidden sm:ml-6 sm:flex sm:items-center">
          <div className="ml-3 relative">
            <div>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="sr-only">Abrir menú de usuario</span>
                <FiUser className="h-8 w-8 rounded-full" />
              </button>
            </div>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => alert("Ver perfil")}
                >
                  Ver perfil
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => alert("Cerrar sesión")}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="-mr-2 flex items-center sm:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <span className="sr-only">Abrir menú principal</span>
            {isMenuOpen ? (
              <FiX className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <FiMenu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="border-t border-gray-200 pt-4 pb-3">
            <div className="mt-3 space-y-1">
              <button
                className="block px-4 py-2 text-base font-small text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => alert("Ver perfil")}
              >
                Ver perfil
              </button>
              <button
                className="block px-4 py-2 text-base font-small text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => alert("Cerrar sesión")}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Menu.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Menu;