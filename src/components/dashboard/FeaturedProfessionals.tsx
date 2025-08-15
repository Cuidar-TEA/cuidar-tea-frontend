import ProfessionalCard from "./ProfessionalCard";
import type { Profissional } from "../../types";

export default function FeaturedProfessionals({ professionals }: { professionals: Profissional[] }) {
  if (!professionals || professionals.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <p className="text-gray-500">Nenhum profissional em destaque encontrado.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Profissionais em Destaque</h3>
      <div className="grid grid-cols-1 gap-4">
        {professionals.map((prof) => (
          <ProfessionalCard key={prof.id_profissional} {...prof} />
        ))}
      </div>
    </div>
  );
}
