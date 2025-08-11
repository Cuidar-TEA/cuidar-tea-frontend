import { FaStar } from "react-icons/fa"
import type { Profissional } from "../../types/index"

export default function ProfessionalCard(prof: Profissional) {
  return (
    <div className="border border-gray-100 rounded-xl p-4 flex flex-col justify-between bg-white hover:shadow-md transition-shadow animate-fade-in">
      <div>
        <h4 className="font-semibold text-gray-900">{prof.nome}</h4>
        <p className="text-sm text-rose-600">{prof.especialidade}</p>
        <div className="flex items-center text-yellow-500 text-sm mt-1">
          <FaStar className="mr-1" />
          <span className="text-gray-700">
            {prof.estrelas} · {prof.avaliacoes} avaliações
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-2">{prof.local}</p>
        <p className="text-sm text-emerald-600 mt-1">{prof.horario}</p>
      </div>
      <button
        className={`mt-4 py-2 px-4 rounded-md text-white text-sm transition-colors ${
          prof.disponivel ? "bg-rose-600 hover:bg-rose-700 shadow-glow" : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!prof.disponivel}
      >
        {prof.disponivel ? "Agendar Consulta" : "Indisponível"}
      </button>
    </div>
  )
}
