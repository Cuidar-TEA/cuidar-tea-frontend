import React from 'react';
import { FaStar } from 'react-icons/fa';
import { useProfissionaisContext } from '../../contexts/ProfissionaisContext';

const BlocoMostrarProfissionais: React.FC = () => {
    const { profissionais, loading, error } = useProfissionaisContext();

    if (loading) {
        return (
            <div className="w-[1000px] h-[500px] bg-white border border-gray-200 rounded-2xl shadow-lg p-6 ml-8 mt-10 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando profissionais...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-[1000px] h-[500px] bg-white border border-gray-200 rounded-2xl shadow-lg p-6 ml-8 mt-10 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                        Tentar Novamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-[1000px] h-[500px] bg-white border border-gray-200 rounded-2xl shadow-lg p-6 ml-8 mt-10">
            <h2 className="text-2xl font-semibold mb-6 text-center">
                Profissionais ({profissionais.length} encontrados)
            </h2>
            
            {/* Grid de Profissionais */}
            <div className="h-[400px] overflow-y-auto pr-2">
                {profissionais.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <p className="text-gray-500 text-lg mb-2">Nenhum profissional encontrado</p>
                            <p className="text-gray-400 text-sm">Tente ajustar os filtros de busca</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        {profissionais.map((profissional) => (
                            <div key={profissional.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200 cursor-pointer border border-gray-200">
                                <div className="flex items-start space-x-3">
                                    {/* Foto do Profissional */}
                                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                        <img 
                                            src={profissional.foto} 
                                            alt={profissional.nome}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src = '/api/placeholder/48/48';
                                            }}
                                        />
                                    </div>

                                    {/* Informações do Profissional */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-semibold text-gray-900 truncate mb-1">
                                            {profissional.nome}
                                        </h3>
                                        <p className="text-xs text-gray-600 mb-2 truncate">
                                            {profissional.especialidade}
                                        </p>
                                        
                                        {/* Avaliação */}
                                        <div className="flex items-center mb-2">
                                            <FaStar className="text-yellow-500 mr-1" size={12} />
                                            <span className="text-xs font-medium mr-1">{profissional.avaliacao}</span>
                                            <span className="text-xs text-gray-500">({profissional.totalAvaliacoes})</span>
                                        </div>

                                        {/* 3 Tags de Especialidades */}
                                        <div className="flex flex-wrap gap-1 mb-2">
                                            {profissional.especialidades?.slice(0, 3).map((especialidade, index) => (
                                                <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                                    {especialidade}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Preço */}
                                        <div className="text-right">
                                            <span className="text-sm font-bold text-gray-900">
                                                R$ {profissional.preco}
                                            </span>
                                            <span className="text-xs text-gray-500 ml-1">por consulta</span>
                                        </div>

                                        {/* Informações adicionais */}
                                        <div className="text-xs text-gray-500 mt-1">
                                            {profissional.cidade && profissional.estado && (
                                                <span>{profissional.cidade}, {profissional.estado}</span>
                                            )}
                                            {profissional.aceitaConvenio && (
                                                <span className="ml-2 text-green-600">• Aceita convênio</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlocoMostrarProfissionais;