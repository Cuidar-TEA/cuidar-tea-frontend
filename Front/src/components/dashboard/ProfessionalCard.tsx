import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { Profissional } from "../../types/index";

export default function ProfessionalCard(prof: Profissional) {
  const navigate = useNavigate();

  const handleAgendar = () => {
    navigate(`/profissional/${prof.id_profissional}`);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow flex flex-col justify-between min-h-[220px]">
      <div className="flex flex-col h-full justify-between">
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">{prof.nome}</h4>
          <p className="text-sm text-gray-500 mb-2">{prof.formacao}</p>
          <div className="flex items-center text-yellow-500 text-sm mb-2">
            <FaStar className="mr-1" />
            <span className="text-gray-700">
              {prof.avaliacao_media ?? 0} · {prof.total_avaliacoes ?? 0} avaliações
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-1">{prof.cidade}</p>
        </div>
        <div className="flex justify-end mt-2">
          <p className="text-sm text-emerald-600">
            Próxima disponibilidade: {prof.proxima_disponibilidade ?? "Não informado"}
          </p>
        </div>
      </div>
      <button
        className="mt-4 py-2 px-4 rounded-md text-white text-sm transition-colors bg-rose-600 hover:bg-rose-700 shadow-glow w-full"
        onClick={handleAgendar}
      >
        Agendar Consulta
      </button>
    </div>
  );
}
