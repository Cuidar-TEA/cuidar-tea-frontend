import { FaStar } from 'react-icons/fa';

// Dados de exemplo
const professionals = [
  { name: 'Dra. Carla Mendes', specialty: 'Fonoaudióloga', rating: 5, reviews: 127, price: 150, location: 'São Paulo, SP', availability: 'Hoje às 16:00', available: true },
  { name: 'Dr. Paulo Santos', specialty: 'Neurologista', rating: 4.8, reviews: 89, price: 200, location: 'Rio de Janeiro, RJ', availability: 'Amanhã às 09:00', available: true },
  { name: 'Dra. Lucia Ferreira', specialty: 'Psicopedagoga', rating: 5, reviews: 156, price: 120, location: 'Belo Horizonte, MG', availability: 'Próxima semana', available: false },
];

export default function FeaturedProfessionals() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md col-span-1 lg:col-span-2">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <FaStar className="text-yellow-500" />
        Profissionais em Destaque
      </h2>
      <div className="space-y-4">
        {professionals.map((prof, index) => (
          <div key={index} className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0"></div>
            <div className="flex-grow text-center sm:text-left">
              <p className="font-bold">{prof.name}</p>
              <p className="text-sm text-red-600 font-semibold">{prof.specialty}</p>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-sm text-gray-600">
                <FaStar className="text-yellow-500" /> {prof.rating} <span className="text-gray-400">({prof.reviews} avaliações)</span>
              </div>
              <p className="text-sm text-gray-500">{prof.location}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="font-bold text-lg">R$ {prof.price}</p>
              <p className="text-xs text-green-600 font-semibold">{prof.availability}</p>
              <button disabled={!prof.available} className={`w-36 px-4 py-2 text-sm font-bold text-white rounded-md ${prof.available ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-300 cursor-not-allowed'}`}>
                {prof.available ? 'Agendar Consulta' : 'Indisponível'}
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-center text-red-600 font-semibold hover:underline">
        Ver todos os profissionais
      </button>
    </div>
  );
}