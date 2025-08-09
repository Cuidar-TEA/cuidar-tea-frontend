import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const activeLink = "text-white bg-gray-900 rounded-md px-3 py-2 text-sm font-medium";
  const inactiveLink = "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium";
  const mobileActiveLink = "text-white bg-gray-900 block rounded-md px-3 py-2 text-base font-medium";
  const mobileInactiveLink = "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium";

  return (
    <nav className="bg-gray-800 shadow-md relative z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-white font-bold text-xl">Cuidar TEA</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink 
                  to="/dashboard" 
                  className={({ isActive }) => isActive ? activeLink : inactiveLink}
                >
                  Dashboard
                </NavLink>
                <NavLink 
                  to="/profissionais" 
                  className={({ isActive }) => isActive ? activeLink : inactiveLink}
                >
                  Profissionais
                </NavLink>
                <NavLink 
                  to="/consultas" 
                  className={({ isActive }) => isActive ? activeLink : inactiveLink}
                >
                  Consultas
                </NavLink>
              </div>
            </div>
          </div>
          
          {/* Desktop User Menu */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative ml-3 flex items-center space-x-4">
                <FaUserCircle className="h-8 w-8 text-gray-400" />
                <button 
                  onClick={handleLogout} 
                  className="text-gray-300 hover:text-white text-sm font-medium"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => isActive ? mobileActiveLink : mobileInactiveLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/profissionais" 
              className={({ isActive }) => isActive ? mobileActiveLink : mobileInactiveLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Profissionais
            </NavLink>
            <NavLink 
              to="/consultas" 
              className={({ isActive }) => isActive ? mobileActiveLink : mobileInactiveLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Consultas
            </NavLink>
          </div>
          
          {/* Mobile user menu */}
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <FaUserCircle className="h-10 w-10 text-gray-400" />
              <div className="ml-3">
                <div className="text-base font-medium text-white">Usuário</div>
                <div className="text-sm font-medium text-gray-400">usuario@email.com</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <button 
                onClick={handleLogout}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 w-full text-left"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}