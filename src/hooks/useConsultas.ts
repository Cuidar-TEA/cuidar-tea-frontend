import { useState, useEffect, useCallback } from 'react';
import { agendamentosService } from '../services/agendamentos';

interface Consulta {
  id: number;
  profissional?: {
    nome?: string;
    especialidade?: string;
  };
  profissionais?: {
    nome?: string;
    especialidade?: string;
  };
  data_horario_inicio: string;
  duracao_consulta_minutos: number;
  status: string;
  endereco?: {
    cidade?: string;
    estado?: string;
  };
  enderecos?: {
    cidade?: string;
    estado?: string;
  };
  // Permite propriedades extras que podem vir da API
  [key: string]: any;
}

export const useConsultas = () => {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buscarConsultas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await agendamentosService.buscarMeusAgendamentos();
      console.log('🔍 Dados brutos do backend:', response);
      
      // Log específico dos horários
      response.forEach((consulta, index) => {
        console.log(`📅 Consulta ${index + 1}:`, {
          id: consulta.id,
          data_horario_inicio: consulta.data_horario_inicio,
          profissional: consulta.profissional?.nome || consulta.profissionais?.nome
        });
      });
      
      setConsultas(response);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao buscar consultas';
      setError(errorMessage);
      console.error('Erro ao buscar consultas:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Busca as consultas quando o hook é inicializado
  useEffect(() => {
    buscarConsultas();
  }, [buscarConsultas]);

  const formatarData = (dataHorario: string) => {
    return new Date(dataHorario).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatarHorario = (dataHorario: string) => {
    // Debug: vamos ver exatamente o que está chegando
    console.log('🔍 formatarHorario recebeu:', dataHorario);
    
    // Converte para UTC e depois extrai apenas a hora/minuto original
    // Isso garante que mostramos o horário como foi agendado (ex: 07:00)
    const date = new Date(dataHorario);
    const utcHour = date.getUTCHours();
    const utcMinute = date.getUTCMinutes();
    
    const resultado = `${utcHour.toString().padStart(2, '0')}:${utcMinute.toString().padStart(2, '0')}`;
    console.log('🕐 formatarHorario resultado:', resultado);
    
    return resultado;
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'agendada':
      case 'agendado':
        return 'bg-blue-100 text-blue-800';
      case 'confirmada':
      case 'confirmado':
        return 'bg-green-100 text-green-800';
      case 'concluída':
      case 'concluido':
      case 'finalizada':
      case 'finalizado':
        return 'bg-gray-100 text-gray-800';
      case 'cancelada':
      case 'cancelado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'agendada':
      case 'agendado':
        return 'Agendada';
      case 'confirmada':
      case 'confirmado':
        return 'Confirmada';
      case 'concluída':
      case 'concluido':
      case 'finalizada':
      case 'finalizado':
        return 'Concluída';
      case 'cancelada':
      case 'cancelado':
        return 'Cancelada';
      default:
        return status || 'Pendente';
    }
  };

  return {
    consultas,
    loading,
    error,
    buscarConsultas,
    formatarData,
    formatarHorario,
    getStatusColor,
    getStatusText
  };
};
