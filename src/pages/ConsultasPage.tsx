import React from 'react';
import { FaCalendarAlt, FaClock, FaUser, FaMapMarkerAlt, FaSpinner, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useConsultas } from '../hooks/useConsultas';
import { useAuth } from '../hooks/useAuth';

const ConsultasPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Hook para verificar autenticação e tipo de usuário
  const { isCliente, isAuthenticated } = useAuth();
  
  const { 
    consultas, 
    loading, 
    error, 
    formatarData, 
    formatarHorario, 
    getStatusColor, 
    getStatusText 
  } = useConsultas();

  // Se não for cliente autenticado, mostra tela de acesso negado
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <FaLock className="mx-auto text-gray-400 text-6xl mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Acesso Restrito</h1>
            <p className="text-gray-600 mb-6">Você precisa estar logado como paciente para ver suas consultas</p>
            <button 
              onClick={() => navigate('/login')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Fazer Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isCliente) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <FaLock className="mx-auto text-gray-400 text-6xl mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Acesso Apenas para Pacientes</h1>
            <p className="text-gray-600 mb-6">Esta página é exclusiva para pacientes visualizarem suas consultas</p>
            <p className="text-sm text-gray-500">A visualização de consultas para profissionais será implementada em outra área</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Minhas Consultas</h1>
          <p className="text-gray-600">Gerencie seus agendamentos e consultas</p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <FaSpinner className="animate-spin mx-auto text-blue-600 text-4xl mb-4" />
            <p className="text-gray-600">Carregando suas consultas...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 text-sm font-medium">❌ Erro ao carregar consultas</p>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Lista de Consultas */}
        {!loading && !error && (
          <div className="space-y-6">
            {consultas.map((consulta) => (
              <div key={consulta.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  {/* Informações da Consulta */}
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <FaUser className="text-blue-600 mr-2" />
                      <h3 className="text-xl font-semibold text-gray-900">
                        {consulta.profissional?.nome || consulta.profissionais?.nome || 'Profissional não informado'}
                      </h3>
                      <span className={`ml-3 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(consulta.status)}`}>
                        {getStatusText(consulta.status)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">
                      {consulta.profissional?.especialidade || consulta.profissionais?.especialidade || 'Especialidade não informada'}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <FaCalendarAlt className="text-gray-400 mr-2" />
                        <span>{formatarData(consulta.data_horario_inicio)}</span>
                      </div>
                      <div className="flex items-center">
                        <FaClock className="text-gray-400 mr-2" />
                        <span>{formatarHorario(consulta.data_horario_inicio)}</span>
                      </div>
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-gray-400 mr-2" />
                        <span>
                          {(consulta.endereco || consulta.enderecos)
                            ? `${(consulta.endereco?.cidade || consulta.enderecos?.cidade) || ''}, ${(consulta.endereco?.estado || consulta.enderecos?.estado) || ''}`
                            : 'Endereço não informado'
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="mt-4 md:mt-0 md:ml-6 flex flex-col space-y-2">
                    {getStatusText(consulta.status) === 'Agendada' && (
                      <>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                          Reagendar
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                          Cancelar
                        </button>
                      </>
                    )}
                    {getStatusText(consulta.status) === 'Confirmada' && (
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                        Ver Detalhes
                      </button>
                    )}
                    {getStatusText(consulta.status) === 'Concluída' && (
                      <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium">
                        Avaliar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Estado vazio */}
        {!loading && !error && consultas.length === 0 && (
          <div className="text-center py-12">
            <FaCalendarAlt className="mx-auto text-gray-400 text-6xl mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhuma consulta agendada</h3>
            <p className="text-gray-600 mb-6">Comece procurando por profissionais qualificados</p>
            <button 
              onClick={() => navigate('/profissionais')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Buscar Profissionais
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultasPage;
