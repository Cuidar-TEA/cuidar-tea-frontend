import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaCheck, FaSpinner } from 'react-icons/fa';
import { useAgendamento } from '../../hooks/useAgendamento';

interface BlocoAgendamentoProps {
  profissional: {
    id: string;
    nome: string;
  };
}

const BlocoAgendamento: React.FC<BlocoAgendamentoProps> = ({ profissional }) => {
  const [dataSelecionada, setDataSelecionada] = useState<string>(''); // AAAA-MM-DD
  const [horarioSelecionado, setHorarioSelecionado] = useState<string>('');
  const [sucesso, setSucesso] = useState(false);
  
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

  // Gera a data mínima (hoje) e máxima (30 dias a partir de hoje)
  const gerarLimitesDatas = () => {
    const hoje = new Date();
    const dataMinima = hoje.toISOString().split('T')[0]; // AAAA-MM-DD
    
    const dataMaxima = new Date(hoje);
    dataMaxima.setDate(hoje.getDate() + 30);
    const dataMaximaString = dataMaxima.toISOString().split('T')[0]; // AAAA-MM-DD
    
    return { dataMinima, dataMaxima: dataMaximaString };
  };

  const { dataMinima, dataMaxima } = gerarLimitesDatas();

  // Apenas horários da API - se não há dados, não mostra nada
  const horariosDisponiveis = disponibilidade?.horarios_disponiveis || [];
  const horariosOcupados = disponibilidade?.horarios_ocupados || [];

  const isHorarioOcupado = (horario: string) => {
    return horariosOcupados.includes(horario);
  };

  const handleDataChange = async (data: string) => {
    setDataSelecionada(data);
    setHorarioSelecionado(''); // Reset horário quando muda a data
    resetStatus(); // Reset status do agendamento
    
    // Busca disponibilidade para a data selecionada
    // O input type="date" já retorna no formato AAAA-MM-DD que a API espera
    if (data) {
      await buscarDisponibilidade(parseInt(profissional.id), data);
    }
  };

  const handleHorarioClick = (horario: string) => {
    if (!isHorarioOcupado(horario)) {
      setHorarioSelecionado(horario);
      resetStatus(); // Reset status do agendamento
    }
  };

  const handleAgendar = async () => {
    if (dataSelecionada && horarioSelecionado) {
      try {
        await criarAgendamento(
          parseInt(profissional.id), 
          dataSelecionada, 
          horarioSelecionado
        );
        
        // Sucesso - limpa formulário e mostra mensagem
        setSucesso(true);
        setDataSelecionada('');
        setHorarioSelecionado('');
        console.log('Agendamento criado com sucesso');
      } catch (err) {
        // Erro já está sendo tratado no hook
        console.error('Erro ao criar agendamento:', err);
      }
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 w-full max-w-4xl">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
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
                const ocupado = isHorarioOcupado(horario);
                const selecionado = horarioSelecionado === horario;
                
                return (
                  <button
                    key={horario}
                    onClick={() => handleHorarioClick(horario)}
                    disabled={ocupado}
                    className={`
                      relative px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-200
                      ${ocupado 
                        ? 'bg-red-100 border-red-300 text-red-600 cursor-not-allowed' 
                        : selecionado
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
            <p><strong>Data:</strong> {new Date(dataSelecionada).toLocaleDateString('pt-BR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
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
            px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2
            ${dataSelecionada && horarioSelecionado && !loading
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          {loading && <FaSpinner className="animate-spin" />}
          <span>
            {loading 
              ? 'Agendando...'
              : dataSelecionada && horarioSelecionado 
                ? 'Confirmar Agendamento' 
                : 'Selecione data e horário'
            }
          </span>
        </button>
      </div>

      {/* Legenda */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h5 className="text-xs font-medium text-gray-600 mb-2">Legenda:</h5>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded mr-2"></div>
            <span className="text-gray-600">Disponível</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-600 border-2 border-blue-600 rounded mr-2"></div>
            <span className="text-gray-600">Selecionado</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-100 border-2 border-red-300 rounded mr-2"></div>
            <span className="text-gray-600">Ocupado</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlocoAgendamento;
