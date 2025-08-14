import api from './api';
import type { CriarAgendamentoRequest, CriarAgendamentoResponse, DisponibilidadeResponse } from '../types/agendamento';

export const agendamentosService = {
  // Criar um novo agendamento
  criarAgendamento: async (dadosAgendamento: CriarAgendamentoRequest): Promise<CriarAgendamentoResponse> => {
    try {
      console.log('🔄 Enviando agendamento para API...');
      console.log('📋 Dados:', dadosAgendamento);
      console.log('🔑 Token presente:', !!localStorage.getItem('authToken'));
      
      const response = await api.post<CriarAgendamentoResponse>('/agendamentos', dadosAgendamento);
      
      console.log('✅ Resposta da API:', response.status, response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Erro na requisição de agendamento:');
      console.error('Status:', error.response?.status);
      console.error('Data:', error.response?.data);
      console.error('Headers:', error.response?.headers);
      console.error('Config:', error.config);
      throw error;
    }
  },

  // Buscar agendamentos do usuário logado (paciente)
  buscarMeusAgendamentos: async (): Promise<any[]> => {
    try {
      console.log('🔍 Buscando agendamentos do usuário...');
      const response = await api.get('/agendamentos/meus');
      console.log('✅ Agendamentos recebidos:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao buscar agendamentos:', error);
      throw error;
    }
  },

  // Buscar agendamentos do profissional logado
  buscarMeusAgendamentosProfissional: async (): Promise<any[]> => {
    try {
      console.log('🔍 Buscando pacientes ativos do profissional...');
      const response = await api.get('/profissionais/pacientes-ativos');
      console.log('✅ Pacientes ativos recebidos:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao buscar pacientes ativos:', error);
      throw error;
    }
  },

  // Atualizar status de uma consulta
  atualizarStatusConsulta: async (consultaId: number, novoStatus: string): Promise<any> => {
    try {
      console.log(`🔄 Atualizando status da consulta ${consultaId} para: ${novoStatus}`);
      // Primeiro vamos tentar o endpoint mais comum
      const response = await api.patch(`/agendamentos/${consultaId}/status`, { 
        status: novoStatus 
      });
      console.log('✅ Status atualizado:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Erro ao atualizar status da consulta:', error);
      console.error('📋 Response status:', error.response?.status);
      console.error('📋 Response data:', error.response?.data);
      
      // Se o endpoint não existir, vamos tentar uma alternativa
      if (error.response?.status === 404) {
        console.log('🔄 Tentando endpoint alternativo...');
        try {
          const responseAlt = await api.put(`/agendamentos/${consultaId}`, { 
            status: novoStatus 
          });
          console.log('✅ Status atualizado (endpoint alternativo):', responseAlt.data);
          return responseAlt.data;
        } catch (errorAlt) {
          console.error('❌ Erro também no endpoint alternativo:', errorAlt);
          throw errorAlt;
        }
      }
      
      throw error;
    }
  },

  // Buscar disponibilidade de horários de um profissional em uma data específica
  buscarDisponibilidade: async (profissionalId: number, data: string): Promise<DisponibilidadeResponse> => {
    try {
      // A API retorna apenas um array de horários disponíveis
      const response = await api.get<string[]>(`/profissionais/${profissionalId}/disponibilidade`, {
        params: { data } // data no formato AAAA-MM-DD
      });
      
      // Transforma a resposta no formato esperado pelo frontend
      const disponibilidadeFormatada: DisponibilidadeResponse = {
        data: data,
        horarios_disponiveis: response.data || [],
        horarios_ocupados: [] // Por enquanto vazio, pode ser implementado depois
      };
      
      return disponibilidadeFormatada;
    } catch (error) {
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
    // Cria a data diretamente no fuso horário local para evitar problemas
    const data = new Date(isoString);
    
    // Verifica se a data é válida
    if (isNaN(data.getTime())) {
      return 'Data inválida';
    }
    
    return data.toLocaleString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo' // Força o fuso horário brasileiro
    });
  }
};
