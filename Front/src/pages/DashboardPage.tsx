import Navbar from '../components/layout/Navbar';
import FeaturedProfessionals from '../components/dashboard/FeaturedProfissional';
import SearchProfessionals from '../components/dashboard/Pesquisa';
import TipOfTheDay from '../components/dashboard/DicaDoDia';

const UpcomingAppointments = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Próximas Consultas</h2>
        <p className="text-gray-500">Nenhuma consulta agendada para os próximos dias.</p>
    </div>
)

export default function DashboardPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Bem-vindo de volta, João!</h1>
          <p className="text-gray-600">Aqui está um resumo das suas atividades recentes</p>
        </div>
      </header>
      
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            
            <SearchProfessionals />

            <UpcomingAppointments />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <FeaturedProfessionals />
              <TipOfTheDay />
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}