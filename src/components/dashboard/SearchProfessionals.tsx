import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export default function SearchProfessionals() {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const searchURL = `/profissionais?q=${searchTerm}&especialidade=${specialty}`;
    
    navigate(searchURL);
  };

  return (
    <form onSubmit={handleSearch} className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Encontrar Profissionais</h3>
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar por nome ou especialidade..."
          className="flex-1 px-4 py-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="px-4 py-2 border rounded-md"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        >
          <option value="">Todas as especialidades</option>
          <option value="Psicólogo">Psicólogo</option>
          <option value="Fonoaudiólogo">Fonoaudiólogo</option>
          <option value="Neurologista">Neurologista</option>
        </select>
        <button type="submit" className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md">
          <FaSearch className="mr-2" /> Buscar
        </button>
      </div>
    </form>
  );
}