import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaCheck, FaSpinner, FaLock } from 'react-icons/fa';
import { useAgendamento } from '../../hooks/useAgendamento';
import { useAuth } from '../../hooks/useAuth';
import { formatarDataCompletaBrasileira } from '../../utils/agendamento';

interface BlocoAgendamentoProps {
  profissional: {
    id: string;
    nome: string;
    enderecos_id_endereco?: number;
  };
}

const BlocoAgendamento: React.FC<BlocoAgendamentoProps> = ({ profissional }) => {
  const [dataSelecionada, setDataSelecionada] = useState<string>(''); // AAAA-MM-DD
  const [horarioSelecionado, setHorarioSelecionado] = useState<string>('');
  const [sucesso, setSucesso] = useState(false);
  
  // Hook para verificar autenticação e tipo de usuário
  const { isCliente, isAuthenticated } = useAuth();
  
  // Hook para gerenciar agendamentos
  const { 
    loading, 
    loadingDisponibilidade, 
    error, 
    disponibilidade,
    criarAgendamento, 
    buscarDisponibilidade,
    resetStatus 
  } = useAgendamento();

  // Se não for cliente, não mostra o bloco de agendamento
  if (!isAuthenticated) {
    return (
      <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 w-full max-w-4xl">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <FaLock className="mr-3 text-gray-500" />
          Agendar Consulta
        </h3>
        <div className="text-center py-8">
          <p className="text-gray-600 mb-2">Apenas clientes podem agendar consultas</p>
          <p className="text-sm text-gray-500">Faça login como cliente para agendar</p>
        </div>
      </div>
    );
  }

  if (!isCliente) {
    return (
      <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 w-full max-w-4xl">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
          <FaLock className="mr-3 text-gray-500" />
          Agendar Consulta
        </h3>
        <div className="text-center py-8">
          <p className="text-gray-600 mb-2">Apenas clientes podem agendar consultas</p>
          <p className="text-sm text-gray-500">Faça login como cliente para agendar</p>
        </div>
      </div>
    );
  }

  // Gera a data mínima (hoje) e máxima (30 dias a partir de hoje)
  const gerarLimitesDatas = () => {
    const hoje = new Date();
    const dataMinima = hoje.toISOString().split('T')[0]; // AAAA-MM-DD
    
    const dataMaxima = new Date();
    dataMaxima.setDate(hoje.getDate() + 30);
    const dataMaximaString = dataMaxima.toISOString().split('T')[0]; // AAAA-MM-DD
    
    return { dataMinima, dataMaxima: dataMaximaString };
  };

  const { dataMinima, dataMaxima } = gerarLimitesDatas();

  // Apenas horários disponíveis da API
  const horariosDisponiveis = disponibilidade?.horarios_disponiveis || [];

  const handleDataChange = async (data: string) => {
    setDataSelecionada(data);
    setHorarioSelecionado(''); // Reset horário quando muda a data
    resetStatus(); // Reset status do agendamento
    
    // Busca disponibilidade para a data selecionada
    if (data) {
      await buscarDisponibilidade(parseInt(profissional.id), data);
    }
  };

  const handleHorarioClick = (horario: string) => {
    setHorarioSelecionado(horario);
    resetStatus(); // Reset status do agendamento
  };

  const handleAgendar = async () => {
    console.log('🎯 handleAgendar chamado:', {
      dataSelecionada,
      horarioSelecionado,
      profissionalId: profissional.id,
      profissionalIdParsed: parseInt(profissional.id),
      profissionalNome: profissional.nome
    });
    
    if (dataSelecionada && horarioSelecionado) {
      try {
        console.log('📞 Chamando criarAgendamento...');
        await criarAgendamento(
          parseInt(profissional.id), 
          dataSelecionada, 
          horarioSelecionado,
          profissional.enderecos_id_endereco || 1
        );
        
        console.log('🎉 Agendamento bem-sucedido no componente!');
        
        // Sucesso - limpa formulário e mostra mensagem
        setSucesso(true);
        setDataSelecionada('');
        setHorarioSelecionado('');
        
        // Atualiza a disponibilidade para refletir o novo agendamento
        if (dataSelecionada) {
          console.log('🔄 Atualizando disponibilidade após agendamento...');
          console.log('📊 Horários ANTES da atualização:', horariosDisponiveis);
          await buscarDisponibilidade(parseInt(profissional.id), dataSelecionada);
          console.log('📊 Horários DEPOIS da atualização:', disponibilidade?.horarios_disponiveis);
        }
        
      } catch (err) {
        console.error('💥 Erro capturado no componente:', err);
        // Erro já está sendo tratado no hook
      }
    } else {
      console.warn('⚠️ Data ou horário não selecionados');
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 w-full max-w-4xl">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <FaCalendarAlt className="mr-3 text-blue-600" />
        Agendar Consulta
      </h3>

      {/* Input da Data */}
      <div className="mb-6">
        <label htmlFor="data-selecionada" className="block text-sm font-medium text-gray-700 mb-2">
          Selecione a data:
        </label>
        <input
          type="date"
          id="data-selecionada"
          value={dataSelecionada}
          min={dataMinima}
          max={dataMaxima}
          onChange={(e) => handleDataChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Grid de Horários */}
      {dataSelecionada && (
        <div className="mb-6">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
            <FaClock className="mr-2 text-blue-600" />
            Horários disponíveis:
            {loadingDisponibilidade && (
              <FaSpinner className="ml-2 animate-spin text-blue-600" />
            )}
          </label>
          
          {loadingDisponibilidade ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <FaSpinner className="animate-spin text-blue-600 text-2xl mx-auto mb-2" />
              <p className="text-gray-600">Carregando horários disponíveis...</p>
            </div>
          ) : horariosDisponiveis.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
              {horariosDisponiveis.map((horario: string) => {
                const selecionado = horarioSelecionado === horario;
                
                return (
                  <button
                    key={horario}
                    onClick={() => handleHorarioClick(horario)}
                    className={`
                      relative px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-200
                      ${selecionado
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg transform scale-105'
                        : 'bg-green-100 border-green-300 text-green-700 hover:bg-green-200 hover:border-green-400'
                      }
                    `}
                  >
                    {horario}
                    {selecionado && (
                      <FaCheck className="absolute top-1 right-1 text-xs" />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-600">Nenhum horário disponível para esta data.</p>
              <p className="text-sm text-gray-500 mt-1">Tente selecionar outra data.</p>
            </div>
          )}
        </div>
      )}

      {/* Resumo da Seleção */}
      {dataSelecionada && horarioSelecionado && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Resumo do Agendamento:</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p><strong>Profissional:</strong> {profissional.nome}</p>
            <p><strong>Data:</strong> {formatarDataCompletaBrasileira(dataSelecionada)}</p>
            <p><strong>Horário:</strong> {horarioSelecionado}</p>
          </div>
        </div>
      )}

      {/* Feedback de Status */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm font-medium">❌ Erro ao agendar</p>
          <p className="text-red-700 text-sm mt-1">{error}</p>
        </div>
      )}

      {sucesso && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm font-medium">✅ Agendamento realizado com sucesso!</p>
          <p className="text-green-700 text-sm mt-1">Você receberá uma confirmação em breve.</p>
        </div>
      )}

      {/* Botão de Agendar */}
      <div className="flex justify-end">
        <button
          onClick={handleAgendar}
          disabled={!dataSelecionada || !horarioSelecionado || loading}
          className={`
            px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2
            ${!dataSelecionada || !horarioSelecionado || loading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
            }
          `}
        >
          {loading && <FaSpinner className="animate-spin" />}
          {loading ? 'Agendando...' : 'Confirmar Agendamento'}
        </button>
      </div>
    </div>
  );
};

export default BlocoAgendamento;
