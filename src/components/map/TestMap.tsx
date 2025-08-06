import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface TestMapProps {
  latitude: number;
  longitude: number;
  address: string;
  className?: string;
}

const TestMap: React.FC<TestMapProps> = ({ 
  latitude, 
  longitude, 
  address, 
  className = "h-64 w-full rounded-lg border border-gray-300" 
}) => {
  return (
    <div className={`${className} bg-gradient-to-br from-blue-50 to-green-50 flex flex-col items-center justify-center p-4 relative`}>
      {/* Simulação de um mapa */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full bg-gradient-to-br from-blue-200 to-green-200"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 25%),
              radial-gradient(circle at 75% 75%, rgba(34, 197, 94, 0.1) 0%, transparent 25%),
              linear-gradient(45deg, rgba(59, 130, 246, 0.05) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(34, 197, 94, 0.05) 25%, transparent 25%)
            `,
            backgroundSize: '40px 40px, 40px 40px, 20px 20px, 20px 20px'
          }}
        />
      </div>
      
      {/* Conteúdo principal */}
      <div className="relative z-10 text-center">
        <div className="mb-4">
          <FaMapMarkerAlt className="text-red-500 text-4xl mx-auto mb-2 drop-shadow-md" />
          <div className="w-3 h-3 bg-red-500 rounded-full mx-auto animate-ping"></div>
        </div>
        
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4 shadow-md max-w-xs">
          <h4 className="font-semibold text-gray-900 mb-2">📍 Localização</h4>
          <p className="text-sm text-gray-600 mb-2">{address}</p>
          <p className="text-xs text-gray-500">
            📐 {latitude.toFixed(4)}, {longitude.toFixed(4)}
          </p>
          
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-blue-600 font-medium">
              🗺️ Mapa de teste carregado com sucesso!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestMap;
