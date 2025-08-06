import WelcomeSection from "./WelcomeSection";
import SearchProfessionals from "./SearchProfessionals";
import UpcomingAppointments from "./UpcomingAppointments";
import FeaturedProfessionals from "./FeaturedProfessionals";
import DailyTip from "./DailyTip";
import { useDashboardData } from "../../hooks/useDashboardData";

export default function DashboardLayout() {
  const { user, appointments, professionals, loading, error } = useDashboardData();

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Carregando dados...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <main className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <WelcomeSection name={user?.nome ?? "Usuário"} />
        <SearchProfessionals />
        <UpcomingAppointments appointments={appointments} />
        <section className="grid md:grid-cols-3 gap-6">
          <FeaturedProfessionals professionals={professionals} />
          <DailyTip />
        </section>
      </div>
    </main>
  );
}
