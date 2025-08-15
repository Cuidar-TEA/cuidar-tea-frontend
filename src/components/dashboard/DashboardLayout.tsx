import { useNavigate } from 'react-router-dom';
import FeaturedProfessionals from './FeaturedProfessionals';
import SearchProfessionals from './SearchProfessionals';
import TipOfTheDay from './DailyTip';
import UpcomingAppointments from './AgendamentosPaciente';
import type { Appointment, Profissional } from '../../types';

interface LayoutProps {
    appointments: Appointment[];
    professionals: Profissional[];
}

export default function DashboardLayout({ professionals }: LayoutProps) {
    const navigate = useNavigate();

    const handleDashboardSearch = (filtros: { q?: string; especialidade?: string }) => {
        const queryParams = new URLSearchParams({
            q: filtros.q || '',
            especialidade: filtros.especialidade || ''
        }).toString();
        navigate(`/profissionais?${queryParams}`);
    };

    return (
        <div className="flex flex-col gap-6">
            <SearchProfessionals onSearch={handleDashboardSearch} />
            
            <UpcomingAppointments />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <FeaturedProfessionals professionals={professionals} />
                </div>
                <TipOfTheDay />
            </div>
        </div>
    );
}
