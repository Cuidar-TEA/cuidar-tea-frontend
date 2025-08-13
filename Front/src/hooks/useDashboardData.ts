import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import type { User, Appointment, Profissional } from '../types';

export function useDashboardData() {
    const [user, setUser] = useState<User | null>(null);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [professionals, setProfessionals] = useState<Profissional[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchInitialData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('authToken');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            const [userResponse, appointmentsResponse, professionalsResponse] = await Promise.all([
                api.get('/usuarios/me', { headers }),
                api.get('/agendamentos/proximos', { headers }),
                api.get('/profissionais/destaques', { headers })
            ]);
            setUser(userResponse.data);
            setAppointments(appointmentsResponse.data);
            setProfessionals(professionalsResponse.data);
        } catch (err) {
            setError('Não foi possível carregar os dados da dashboard.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Função para ser chamada pela barra de busca
    const searchProfessionals = async (filtros: { q?: string; especialidade?: string }) => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('authToken');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const response = await api.get('/profissionais', { params: filtros, headers });
            setProfessionals(response.data);
        } catch (err) {
            setError('Erro ao buscar profissionais.');
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchInitialData();
    }, [fetchInitialData]);

    return { user, appointments, professionals, loading, error, searchProfessionals };
}