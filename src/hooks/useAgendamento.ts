import { useState, useCallback } from 'react';
import { agendamentosService } from '../services/agendamentos';
import type { CriarAgendamentoRequest, DisponibilidadeResponse } from '../types/agendamento';
import * as agendamentoUtils from '../utils/agendamento';

export const useAgendamento = () => {
  const [loading, setLoading] = useState(false);
  const [loadingDisponibilidade, setLoadingDisponibilidade] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disponibilidade, setDisponibilidade] = useState<DisponibilidadeResponse | null>(null);

  const buscarDisponibilidade = useCallback(async (profissionalId: number, data: string): Promise<void> => {
    try {
      setLoadingDisponibilidade(true);
      setError(null);

      // Busca disponibilidade na API usando a data já formatada
      const response = await agendamentosService.buscarDisponibilidade(profissionalId, data);
      
      setDisponibilidade(response);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao buscar disponibilidade';
      setError(errorMessage);
    } finally {
      setLoadingDisponibilidade(false);
    }
  }, []);

  const criarAgendamento = useCallback(async (
    profissionalId: number,
    dataSelecionada: string,
    horarioSelecionado: string,
    enderecoId: number = 1
  ): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      console.log('🚀 Iniciando criação de agendamento...');
      console.log('👤 Profissional ID:', profissionalId);
      console.log('🏠 Endereço ID:', enderecoId);
      console.log('📅 Data:', dataSelecionada);
      console.log('🕐 Horário:', horarioSelecionado);

      // Cria o datetime em formato ISO
      const datetime = agendamentoUtils.criarDatetimeISO(dataSelecionada, horarioSelecionado);
      console.log('📆 DateTime ISO criado:', datetime);

      const request: CriarAgendamentoRequest = {
        profissionais_id_profissional: profissionalId,
        enderecos_id_endereco: enderecoId,
        data_horario_inicio: datetime,
        duracao_consulta_minutos: 60 // Duração padrão de 60 minutos
      };

      console.log('📤 Request final:', JSON.stringify(request, null, 2));

      await agendamentosService.criarAgendamento(request);
      
      console.log('✅ Agendamento criado com sucesso!');
      
      // Reset do formulário após sucesso
      setDisponibilidade(null);
      
    } catch (err: any) {
      console.error('❌ Erro capturado no hook useAgendamento:');
      console.error('Tipo do erro:', typeof err);
      console.error('Erro completo:', err);
      console.error('Message:', err.message);
      console.error('Response:', err.response);
      
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao criar agendamento';
      console.error('📝 Mensagem de erro final:', errorMessage);
      
      setError(errorMessage);
      throw err; // Re-throw para que o componente possa tratar
    } finally {
      setLoading(false);
    }
  }, []);

  const resetStatus = useCallback(() => {
    setError(null);
    setLoading(false);
    setLoadingDisponibilidade(false);
    setDisponibilidade(null);
  }, []);

  return {
    loading,
    loadingDisponibilidade,
    error,
    disponibilidade,
    criarAgendamento,
    buscarDisponibilidade,
    resetStatus
  };
};
