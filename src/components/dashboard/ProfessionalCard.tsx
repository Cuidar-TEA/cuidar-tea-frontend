import { FaStar } from "react-icons/fa";
import type { Profissional } from "../../types/index";

export default function ProfessionalCard(prof: Profissional) {
  return (
    <div className="border rounded-md p-4 flex flex-col justify-between">
      <div>
        <h4 className="font-semibold">{prof.nome}</h4>
        <p className="text-sm text-red-600">{prof.especialidade}</p>
        <div className="flex items-center text-yellow-500 text-sm mt-1">
          <FaStar className="mr-1" />
          <span>{prof.estrelas} · {prof.avaliacoes} avaliações</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">{prof.local}</p>
        <p className="text-sm text-green-600 mt-1">{prof.horario}</p>
      </div>
      <button
        className={`mt-4 py-2 px-4 rounded-md text-white text-sm ${
          prof.disponivel ? "bg-red-600 hover:bg-red-700" : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!prof.disponivel}
      >
        {prof.disponivel ? "Agendar Consulta" : "Indisponível"}
      </button>
    </div>
  );
}
