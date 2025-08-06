import React, { useState } from 'react';
import { FaMapMarkerAlt, FaStar, FaUser } from 'react-icons/fa';
import { MapboxMap } from '../../components/map';

interface Profissional {
  id: string;
  nome: string;
  descricao?: string;
  cidade?: string;
  estado?: string;
  endereco?: {
    logradouro?: string;
    numero?: string;
    bairro?: string;
    cep?: string;
    complemento?: string;
  };
  agendamentos?: Array<{
    nota_atendimento?: number;
    comentario?: string;
    nome_paciente?: string;
  }>;
}

interface BlocoSobreLocalizacaoAvaliacoesProps {
  profissional: Profissional;
}

type TabType = 'sobre' | 'localizacao' | 'avaliacoes';

const BlocoSobreLocalizacaoAvaliacoes: React.FC<BlocoSobreLocalizacaoAvaliacoesProps> = ({ 
  profissional 
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('sobre');

  const tabs = [
    { id: 'sobre' as TabType, label: 'Sobre', icon: FaUser },
    { id: 'localizacao' as TabType, label: 'Localização', icon: FaMapMarkerAlt },
    { id: 'avaliacoes' as TabType, label: 'Avaliações', icon: FaStar },
  ];

  const renderSobre = () => (
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Sobre {profissional.nome}</h3>
      {profissional.descricao ? (
        <p className="text-gray-700 leading-relaxed">{profissional.descricao}</p>
      ) : (
        <p className="text-gray-500 italic">Este profissional ainda não adicionou uma descrição.</p>
      )}
    </div>
  );

  const renderLocalizacao = () => {
    // Verifica se há dados de localização
    const temCidade = profissional.cidade && profissional.estado;
    const temEndereco = profissional.endereco && 
      (profissional.endereco.logradouro || profissional.endereco.bairro);

    if (!temCidade && !temEndereco) {
      return (
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Localização</h3>
          <div className="text-center py-8">
            <FaMapMarkerAlt className="text-gray-400 text-3xl mx-auto mb-2" />
            <p className="text-gray-600">Informações de localização não disponíveis</p>
          </div>
        </div>
      );
    }

    // Constrói o endereço completo para geocodificação
    let enderecoCompleto = '';
    if (temEndereco && profissional.endereco) {
      // Monta endereço no formato brasileiro padrão para melhor geocoding
      const partes = [
        profissional.endereco.logradouro && profissional.endereco.numero 
          ? `${profissional.endereco.logradouro}, ${profissional.endereco.numero}`
          : profissional.endereco.logradouro,
        profissional.endereco.bairro,
        profissional.cidade,
        profissional.estado,
        profissional.endereco.cep
      ].filter(Boolean);
      
      enderecoCompleto = partes.join(', ');
    } else if (temCidade) {
      enderecoCompleto = `${profissional.cidade}, ${profissional.estado}`;
    }

    return (
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Localização</h3>
        
        {/* Canvas do Mapa */}
        <div className="mb-6 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
          <MapboxMap
            address={enderecoCompleto}
            className="h-64 w-full"
          />
        </div>

        {/* Informações de localização abaixo do mapa */}
        <div className="space-y-4">
          {temCidade && (
            <div className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-100">
              <FaMapMarkerAlt className="text-blue-600 mr-3 flex-shrink-0" />
              <div>
                <p className="text-gray-900 font-medium">{profissional.cidade}, {profissional.estado}</p>
                <p className="text-sm text-gray-600">Cidade e Estado</p>
              </div>
            </div>
          )}
          
          {temEndereco && profissional.endereco && (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Endereço Completo
              </h4>
              <div className="text-gray-700 space-y-2">
                {profissional.endereco.logradouro && (
                  <div className="flex items-start">
                    <span className="font-medium mr-2 text-gray-600 min-w-[80px]">Endereço:</span>
                    <span>
                      {profissional.endereco.logradouro}
                      {profissional.endereco.numero && `, ${profissional.endereco.numero}`}
                    </span>
                  </div>
                )}
                {profissional.endereco.bairro && (
                  <div className="flex items-start">
                    <span className="font-medium mr-2 text-gray-600 min-w-[80px]">Bairro:</span>
                    <span>{profissional.endereco.bairro}</span>
                  </div>
                )}
                {profissional.endereco.cep && (
                  <div className="flex items-start">
                    <span className="font-medium mr-2 text-gray-600 min-w-[80px]">CEP:</span>
                    <span>{profissional.endereco.cep}</span>
                  </div>
                )}
                {profissional.endereco.complemento && (
                  <div className="flex items-start">
                    <span className="font-medium mr-2 text-gray-600 min-w-[80px]">Complemento:</span>
                    <span>{profissional.endereco.complemento}</span>
                  </div>
                )}
              </div>
              
              
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAvaliacoes = () => (
    <div className="p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Avaliações</h3>
      {profissional.agendamentos && profissional.agendamentos.length > 0 ? (
        <div className="space-y-4 max-h-64 overflow-y-auto">
          {profissional.agendamentos
            .filter(ag => ag.nota_atendimento !== undefined)
            .map((agendamento, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`${
                          star <= (agendamento.nota_atendimento || 0)
                            ? 'text-yellow-500'
                            : 'text-gray-300'
                        } mr-1`}
                        size={16}
                      />
                    ))}
                  </div>
                  <span className="ml-2 font-semibold text-gray-900">
                    {agendamento.nota_atendimento}/5
                  </span>
                </div>
                {agendamento.comentario && (
                  <p className="text-gray-700 mb-2">"{agendamento.comentario}"</p>
                )}
                {agendamento.nome_paciente && (
                  <p className="text-sm text-gray-500">- {agendamento.nome_paciente}</p>
                )}
              </div>
            ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">Este profissional ainda não possui avaliações.</p>
      )}
    </div>
  );

  const renderContent = () => {
    try {
      switch (activeTab) {
        case 'sobre':
          return renderSobre();
        case 'localizacao':
          return renderLocalizacao();
        case 'avaliacoes':
          return renderAvaliacoes();
        default:
          return renderSobre();
      }
    } catch (error) {
      console.error('Erro ao renderizar conteúdo:', error);
      return (
        <div className="p-6">
          <div className="text-center py-8">
            <p className="text-red-600 mb-2">Erro ao carregar conteúdo</p>
            <p className="text-sm text-gray-500">Tente recarregar a página</p>
            <pre className="mt-4 text-xs text-left bg-gray-100 p-2 rounded overflow-auto">
              {error instanceof Error ? error.message : 'Erro desconhecido'}
            </pre>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg max-w-4xl mt-6">
      {/* Navegação por abas */}
      <div className="border-b border-gray-200">
        <nav className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-center font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Conteúdo da aba ativa */}
      <div className="min-h-[200px]">
        {renderContent()}
      </div>
    </div>
  );
};

export default BlocoSobreLocalizacaoAvaliacoes;
