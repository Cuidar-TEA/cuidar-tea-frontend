"use client"

import type React from "react"
import { useState } from "react"
import { FaSearch } from "react-icons/fa"

interface SearchProps {
  onSearch: (filtros: { q?: string; especialidade?: string }) => void
}

export default function SearchProfessionals({ onSearch }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [specialty, setSpecialty] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch({ q: searchTerm, especialidade: specialty })
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm animate-fade-in">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Encontrar Profissionais</h2>
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou especialidade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-shadow"
          />
        </div>
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        >
          <option value="">Todas as especialidades</option>
          <option value="Psicólogo">Psicólogo</option>
          <option value="Fonoaudiólogo">Fonoaudiólogo</option>
        </select>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 bg-rose-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-rose-700 shadow-glow transition-colors"
        >
          <FaSearch />
          Buscar
        </button>
      </form>
    </div>
  )
}
