import React from 'react';
import { FaStar } from 'react-icons/fa';

interface Profissional {
  id: string;
  nome: string;
  especialidade: string;
  avaliacao: number;
  totalAvaliacoes: number;
  preco: number;
  foto: string;
  especialidades: string[];
}

interface BlocoProfissionalProps {
  profissional: Profissional;
}

const BlocoProfissional: React.FC<BlocoProfissionalProps> = ({ 
  profissional
}) => {
  return (
    <div className="bg-green-400 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-4xl">
      <div className="flex items-center justify-between">
        {/* Lado Esquerdo - Foto e Informações */}
        <div className="flex items-center space-x-6">
          {/* Foto do Profissional */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
            <img 
              src={profissional.foto} 
              alt={profissional.nome}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/api/placeholder/128/128';
              }}
            />
          </div>

          {/* Informações do Profissional */}
          <div className="text-gray-800">
            <h2 className="text-2xl font-bold mb-2">{profissional.nome}</h2>
            <p className="text-lg font-semibold mb-3">{profissional.especialidade}</p>
            
            {/* Avaliação */}
            <div className="flex items-center mb-4">
              <FaStar className="text-yellow-500 mr-1" size={20} />
              <span className="font-bold text-lg mr-2">{profissional.avaliacao}</span>
              <span className="text-gray-700">({profissional.totalAvaliacoes} avaliações)</span>
            </div>

            {/* Especialidades */}
            <div className="space-y-1">
              {profissional.especialidades.map((especialidade, index) => (
                <p key={index} className="text-gray-800 font-medium">
                  {especialidade}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Lado Direito - Preço */}
        <div className="text-right">
          <div className="mb-4">
            <span className="text-3xl font-bold text-gray-800">
              R$ {profissional.preco}
            </span>
            <p className="text-gray-700 font-semibold">por consulta</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlocoProfissional;