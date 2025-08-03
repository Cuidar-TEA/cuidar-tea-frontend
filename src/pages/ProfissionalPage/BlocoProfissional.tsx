import React from 'react';
import { FaStar, FaMapMarkerAlt, FaUserMd, FaMoneyBillWave } from 'react-icons/fa';

interface Profissional {
  id: string;
  nome: string;
  especialidade: string;
  avaliacao: number;
  totalAvaliacoes: number;
  preco: number;
  foto: string;
  especialidades: string[];
  descricao?: string;
  cidade?: string;
  estado?: string;
  aceita_convenio?: boolean;
  atende_domicilio?: boolean;
  endereco?: {
    logradouro?: string;
    numero?: string;
    bairro?: string;
    cep?: string;
    complemento?: string;
  };
}

interface BlocoProfissionalProps {
  profissional: Profissional;
}

const BlocoProfissional: React.FC<BlocoProfissionalProps> = ({ 
  profissional
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 max-w-4xl">
      {/* Cabeçalho com foto e informações principais */}
      <div className="flex items-start space-x-6 mb-6">
        {/* Foto do Profissional */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 shadow-md flex-shrink-0">
          <img 
            src={profissional.foto} 
            alt={profissional.nome}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/api/placeholder/128/128';
            }}
          />
        </div>

        {/* Informações principais */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{profissional.nome}</h1>
          
          <div className="flex items-center text-gray-600 mb-3">
            <FaUserMd className="mr-2 text-blue-500" />
            <span className="text-lg font-medium">{profissional.especialidade}</span>
          </div>
          
          {/* Avaliação */}
          <div className="flex items-center mb-3">
            <FaStar className="text-yellow-500 mr-1" size={20} />
            <span className="font-bold text-lg mr-2 text-gray-800">
              {profissional.avaliacao > 0 ? profissional.avaliacao.toFixed(1) : 'Sem avaliações'}
            </span>
            <span className="text-gray-600">({profissional.totalAvaliacoes} avaliações)</span>
          </div>

          {/* Localização */}
          {(profissional.cidade || profissional.estado || profissional.endereco?.logradouro) && (
            <div className="flex items-center text-gray-600 mb-3">
              <FaMapMarkerAlt className="mr-2 text-red-500" />
              <span>
                {profissional.endereco?.logradouro && profissional.endereco?.numero 
                  ? `${profissional.endereco.logradouro}, ${profissional.endereco.numero} - `
                  : ''
                }
                {profissional.cidade}, {profissional.estado}
              </span>
            </div>
          )}

          {/* Preço */}
          <div className="flex items-center">
            <FaMoneyBillWave className="mr-2 text-green-500" />
            <span className="text-2xl font-bold text-gray-900 mr-2">
              R$ {profissional.preco}
            </span>
            <span className="text-gray-600">por consulta</span>
          </div>
        </div>
      </div>

      {/* Especialidades */}
      {profissional.especialidades.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Especialidades</h3>
          <div className="flex flex-wrap gap-2">
            {profissional.especialidades.map((especialidade, index) => (
              <span 
                key={index} 
                className="px-3 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
              >
                {especialidade}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Informações adicionais */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Informações adicionais</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <span className="font-medium text-gray-700 mr-2">Aceita convênio:</span>
            <span className={`font-semibold ${profissional.aceita_convenio ? 'text-green-600' : 'text-red-600'}`}>
              {profissional.aceita_convenio ? 'Sim' : 'Não'}
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-700 mr-2">Atende a domicílio:</span>
            <span className={`font-semibold ${profissional.atende_domicilio ? 'text-green-600' : 'text-red-600'}`}>
              {profissional.atende_domicilio ? 'Sim' : 'Não'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlocoProfissional;