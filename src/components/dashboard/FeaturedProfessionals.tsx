import ProfissionalCard from "./ProfessionalCard";
import type { Profissional } from "../../types";

interface Props {
  professionals: Profissional[];
}

export default function FeaturedProfessionals({ professionals }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow md:col-span-2">
      <h3 className="text-lg font-semibold mb-4">⭐ Profissionais em Destaque</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {professionals.map((prof) => (
          <ProfissionalCard key={prof.id} {...prof} />
        ))}
      </div>
      <div className="text-center mt-4">
        <button className="text-red-600 hover:underline text-sm font-medium">Ver todos os profissionais</button>
      </div>
    </div>
  );
}
