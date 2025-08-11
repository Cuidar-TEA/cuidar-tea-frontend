import ProfissionalCard from "./ProfessionalCard"
import type { Profissional } from "../../types"

interface Props {
  professionals: Profissional[]
}

export default function FeaturedProfessionals({ professionals }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm md:col-span-2 animate-fade-in">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">⭐ Profissionais em Destaque</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {professionals.map((prof) => (
          <ProfissionalCard key={prof.id} {...prof} />
        ))}
      </div>
      <div className="text-center mt-4">
        <a href="/profissionais" className="text-rose-600 hover:underline text-sm font-medium">
          Ver todos os profissionais
        </a>
      </div>
    </div>
  )
}
