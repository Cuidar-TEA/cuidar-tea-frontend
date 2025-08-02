import { FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
  const activeLink = "text-white bg-gray-700 rounded-md px-3 py-2 text-sm font-medium";
  const inactiveLink = "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium";

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-white font-bold text-xl">TEA Connect</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className={activeLink}>Dashboard</a>
                <a href="#" className={inactiveLink}>Profissionais</a>
                <a href="#" className={inactiveLink}>Consultas</a>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative ml-3">
                <div className="flex items-center space-x-4">
                    <FaUserCircle className="h-8 w-8 text-gray-400" />
                    <a href="#" className="text-gray-300 hover:text-white text-sm">Sair</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}