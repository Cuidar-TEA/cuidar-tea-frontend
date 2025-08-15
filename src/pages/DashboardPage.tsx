import FeaturedProfessionals from '../components/dashboard/FeaturedProfessionals';
import SearchProfessionals from '../components/dashboard/SearchProfessionals';
import TipOfTheDay from '../components/dashboard/DailyTip';
import UpcomingAppointments from '../components/dashboard/AgendamentosPaciente';
import { useDashboardData } from '../hooks/useDashboardData';

export default function DashboardPage() {
  const { user, professionals, loading, error, searchProfessionals } = useDashboardData();

  if (loading) {
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="text-center py-20 text-gray-600 font-semibold">Carregando...</div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="text-center py-20 text-red-600 font-semibold">{error}</div>
        </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Bem-vindo de volta, {user?.nome || 'Usuário'}!</h1>
          <p className="text-gray-600">Aqui está um resumo das suas atividades recentes</p>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8">
            <SearchProfessionals onSearch={searchProfessionals} />
            <UpcomingAppointments />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <FeaturedProfessionals professionals={professionals} />
              <TipOfTheDay />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}