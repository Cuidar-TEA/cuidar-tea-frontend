import React from 'react';
import { FaUser, FaSpinner, FaLock, FaPhone, FaCalendar, FaIdCard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
// Verifique se o arquivo existe em ../hooks/useConsultasProfissional.ts
// Caso não exista, crie o arquivo ou ajuste o caminho conforme necessário.
import { useConsultasProfissional } from '../hooks/useConsultasProfissional';
import { useAuth } from '../hooks/useAuth';

const ConsultasProfissionalPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Hook para verificar autenticação e tipo de usuário
  const { isProfissional, isAuthenticated } = useAuth();
  
  const { 
    pacientes,
    loading, 
    error, 
    calcularIdade,
    formatarDataNascimento,
    formatarNivelTea
  } = useConsultasProfissional();

  // Se não for profissional autenticado, mostra tela de acesso negado
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <FaLock className="mx-auto text-gray-400 text-6xl mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Acesso Restrito</h1>
            <p className="text-gray-600 mb-6">Você precisa estar logado como profissional para ver suas consultas</p>
            <button 
              onClick={() => navigate('/login')}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Fazer Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isProfissional) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <FaLock className="mx-auto text-gray-400 text-6xl mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Acesso Apenas para Profissionais</h1>
            <p className="text-gray-600 mb-6">Esta página é exclusiva para profissionais visualizarem suas consultas</p>
            <p className="text-sm text-gray-500">Se você é um paciente, acesse a área do paciente</p>
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Pacientes</h1>
              <p className="text-gray-600">Visualize e gerencie seus pacientes ativos</p>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <FaSpinner className="animate-spin mx-auto text-red-600 text-4xl mb-4" />
            <p className="text-gray-600">Carregando seus pacientes...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 text-sm font-medium">❌ Erro ao carregar pacientes</p>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Lista de Pacientes */}
        {!loading && !error && (
          <div className="space-y-6">
            {pacientes.map((paciente: any) => (
              <div key={paciente.id_paciente} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex flex-col">
                  {/* Informações do Paciente */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                          <FaUser className="text-red-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {paciente.nome_paciente}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {calcularIdade(paciente.data_nascimento)} anos
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Paciente Ativo
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <FaCalendar className="text-red-600 mr-2 text-sm" />
                        <span className="text-sm">Nascimento: {formatarDataNascimento(paciente.data_nascimento)}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaIdCard className="text-red-600 mr-2 text-sm" />
                        <span className="text-sm">CPF: {paciente.cpf}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaUser className="text-red-600 mr-2 text-sm" />
                        <span className="text-sm">{formatarNivelTea(paciente.nivel_tea)}</span>
                      </div>
                    </div>

                    {/* Informações do Responsável */}
                    {!paciente.e_titular && paciente.nome_titular && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <p className="text-sm text-gray-700">
                          <strong>Responsável:</strong> {paciente.nome_titular}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Estado vazio */}
        {!loading && !error && pacientes.length === 0 && (
          <div className="text-center py-12">
            <FaUser className="mx-auto text-gray-400 text-6xl mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhum paciente encontrado</h3>
            <p className="text-gray-600 mb-6">
              Quando você tiver pacientes ativos, eles aparecerão aqui
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultasProfissionalPage;
