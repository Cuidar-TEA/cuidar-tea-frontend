import api from '../services/api';
import type { CriarAgendamentoRequest, CriarAgendamentoResponse, DisponibilidadeResponse } from '../types/agendamento';

export const agendamentosService = {
  // Criar um novo agendamento
  criarAgendamento: async (dadosAgendamento: CriarAgendamentoRequest): Promise<CriarAgendamentoResponse> => {
    try {
      console.log('Enviando agendamento:', dadosAgendamento);
      
      const response = await api.post<CriarAgendamentoResponse>('/agendamentos', dadosAgendamento);
      
      console.log('Agendamento criado com sucesso:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      throw error;
    }
  },

  // Buscar disponibilidade de horários de um profissional em uma data específica
  buscarDisponibilidade: async (profissionalId: number, data: string): Promise<DisponibilidadeResponse> => {
    try {
      console.log(`Buscando disponibilidade para profissional ${profissionalId} na data ${data}`);
      
      // A API retorna apenas um array de horários disponíveis
      const response = await api.get<string[]>(`/profissionais/${profissionalId}/disponibilidade`, {
        params: { data } // data no formato AAAA-MM-DD
      });
      
      console.log('Horários recebidos da API:', response.data);
      
      // Transforma a resposta no formato esperado pelo frontend
      const disponibilidadeFormatada: DisponibilidadeResponse = {
        data: data,
        horarios_disponiveis: response.data || [],
        horarios_ocupados: [] // Por enquanto vazio, pode ser implementado depois
      };
      
      console.log('Disponibilidade formatada:', disponibilidadeFormatada);
      return disponibilidadeFormatada;
    } catch (error) {
      console.error('Erro ao buscar disponibilidade:', error);
      throw error;
    }
  },

  // Buscar agendamentos de um profissional (para verificar disponibilidade)
  buscarAgendamentosProfissional: async (profissionalId: number, data?: string) => {
    try {
      const params = new URLSearchParams();
      params.append('profissional_id', profissionalId.toString());
      
      if (data) {
        params.append('data', data);
      }

      const response = await api.get(`/agendamentos?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
      throw error;
    }
  }
};

// Utilitários para manipulação de datas
export const agendamentoUtils = {
  // Converte dia da semana para data no formato AAAA-MM-DD da próxima ocorrência
  diaSemanaParaData: (diaSemana: string): string => {
    const hoje = new Date();
    
    // Mapeia dias da semana (0 = domingo, 1 = segunda, etc.)
    const diasMap: { [key: string]: number } = {
      'domingo': 0,
      'segunda': 1,
      'terca': 2,
      'quarta': 3,
      'quinta': 4,
      'sexta': 5,
      'sabado': 6
    };

    const diaAlvo = diasMap[diaSemana];
    const diaAtual = hoje.getDay();
    
    // Calcula quantos dias adicionar para chegar no dia da semana desejado
    let diasParaAdicionar = diaAlvo - diaAtual;
    if (diasParaAdicionar <= 0) {
      diasParaAdicionar += 7; // Vai para a próxima semana
    }

    // Cria a data do agendamento
    const dataAgendamento = new Date(hoje);
    dataAgendamento.setDate(hoje.getDate() + diasParaAdicionar);

    // Retorna no formato AAAA-MM-DD
    return dataAgendamento.toISOString().split('T')[0];
  },

  // Converte dia da semana + horário para ISO string da próxima ocorrência
  criarDataHorarioISO: (diaSemana: string, horario: string): string => {
    const hoje = new Date();
    const [hora, minuto] = horario.split(':').map(Number);
    
    // Mapeia dias da semana (0 = domingo, 1 = segunda, etc.)
    const diasMap: { [key: string]: number } = {
      'domingo': 0,
      'segunda': 1,
      'terca': 2,
      'quarta': 3,
      'quinta': 4,
      'sexta': 5,
      'sabado': 6
    };

    const diaAlvo = diasMap[diaSemana];
    const diaAtual = hoje.getDay();
    
    // Calcula quantos dias adicionar para chegar no dia da semana desejado
    let diasParaAdicionar = diaAlvo - diaAtual;
    if (diasParaAdicionar <= 0) {
      diasParaAdicionar += 7; // Vai para a próxima semana
    }

    // Cria a data do agendamento
    const dataAgendamento = new Date(hoje);
    dataAgendamento.setDate(hoje.getDate() + diasParaAdicionar);
    dataAgendamento.setHours(hora, minuto, 0, 0);

    return dataAgendamento.toISOString();
  },

  // Formata data ISO para exibição
  formatarDataHorario: (isoString: string): string => {
    const data = new Date(isoString);
    return data.toLocaleString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};
