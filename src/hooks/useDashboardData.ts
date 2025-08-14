import { useState, useEffect } from 'react';
import api from '../services/api';
import type { User, Appointment } from '../types';

export function useDashboardData() {
    const [user, setUser] = useState<User | null>(null);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    // const [professionals, setProfessionals] = useState<Profissional[]>([]); // Não está sendo usado
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const appointmentsResponse = await api.get('/agendamentos/meus');
                setAppointments(appointmentsResponse.data);

                
                const userResponse = await api.get('/usuarios/me');
                setUser(userResponse.data);

                //const professionalsResponse = await api.get('/profissionais/destaques');
                //setProfessionals(professionalsResponse.data);


            } catch (err) {
                setError('Não foi possível carregar os dados da dashboard.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return { user, appointments, loading, error };
}