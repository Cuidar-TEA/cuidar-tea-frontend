import { useState, useCallback } from 'react';
import { agendamentosService } from '../services/agendamentos';
import type { CriarAgendamentoRequest, DisponibilidadeResponse } from '../../../cuidar-tea-frontend/src/types/agendamento';
import * as agendamentoUtils from '../../../cuidar-tea-frontend/src/utils/agendamento';

export const useAgendamento = () => {
  const [loading, setLoading] = useState(false);
  const [loadingDisponibilidade, setLoadingDisponibilidade] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disponibilidade, setDisponibilidade] = useState<DisponibilidadeResponse | null>(null);

  const buscarDisponibilidade = useCallback(async (profissionalId: number, data: string): Promise<void> => {
    try {
      setLoadingDisponibilidade(true);
      setError(null);

      console.log(`Buscando disponibilidade para profissional ${profissionalId} na data ${data}`);

      // Busca disponibilidade na API usando a data já formatada
      const response = await agendamentosService.buscarDisponibilidade(profissionalId, data);
      
      setDisponibilidade(response);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao buscar disponibilidade';
      setError(errorMessage);
      console.error('Erro ao buscar disponibilidade:', err);
    } finally {
      setLoadingDisponibilidade(false);
    }
  }, []);

  const criarAgendamento = useCallback(async (
    profissionalId: number,
    dataSelecionada: string,
    horarioSelecionado: string
  ): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      // Cria o datetime em formato ISO
      const datetime = agendamentoUtils.criarDatetimeISO(dataSelecionada, horarioSelecionado);

      console.log(`Criando agendamento para ${datetime}`);

      const request: CriarAgendamentoRequest = {
        profissionais_id_profissional: profissionalId,
        enderecos_id_endereco: 1, // Valor padrão por enquanto
        data_horario_inicio: datetime,
        duracao_consulta_minutos: 60 // Duração padrão de 60 minutos
      };

      await agendamentosService.criarAgendamento(request);
      
      // Reset do formulário após sucesso
      setDisponibilidade(null);
      
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao criar agendamento';
      setError(errorMessage);
      console.error('Erro ao criar agendamento:', err);
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
