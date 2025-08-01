import { FaSearch } from 'react-icons/fa';

export default function SearchProfessionals() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Encontrar Profissionais</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <input 
          type="text" 
          placeholder="Buscar por nome ou especialidade..." 
          className="flex-grow p-2 border border-gray-300 rounded-md" 
        />
        <select className="p-2 border border-gray-300 rounded-md bg-white">
          <option>Todas as especialidades</option>
          <option>Psicologia</option>
          <option>Fonoaudiologia</option>
        </select>
        <button className="flex items-center justify-center gap-2 bg-red-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-red-700">
          <FaSearch />
          Buscar
        </button>
      </div>
    </div>
  );
}