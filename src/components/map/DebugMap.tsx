import React, { useState } from 'react';
import { FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';

interface DebugMapProps {
  address: string;
  className?: string;
}

const DebugMap: React.FC<DebugMapProps> = ({ 
  address, 
  className = "h-64 w-full rounded-lg border border-gray-300" 
}) => {
  const [showDetails, setShowDetails] = useState(false);

  // URL para Google Maps
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  
  return (
    <div className={`${className} bg-gradient-to-br from-blue-50 to-green-50 flex flex-col items-center justify-center p-4 relative overflow-hidden`}>
      {/* Padrão de fundo simulando um mapa */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-blue-200 to-green-200"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23cbd5e0' fill-opacity='0.3'%3E%3Cpath d='M0 0h40v40H0V0zm10 10h20v20H10V10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      {/* Conteúdo principal */}
      <div className="relative z-10 text-center max-w-sm">
        <div className="mb-4">
          <FaMapMarkerAlt className="text-red-500 text-4xl mx-auto mb-2 drop-shadow-md" />
          <div className="w-3 h-3 bg-red-500 rounded-full mx-auto animate-ping"></div>
        </div>
        
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4 shadow-md">
          <h4 className="font-semibold text-gray-900 mb-2">📍 Localização</h4>
          <p className="text-sm text-gray-600 mb-3">{address}</p>
          
          <div className="space-y-2">
            <a 
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors w-full justify-center"
            >
              <FaMapMarkerAlt className="mr-2" />
              Ver no Google Maps
              <FaExternalLinkAlt className="ml-2 text-xs" />
            </a>
            
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors w-full justify-center"
            >
              {showDetails ? '🔼 Ocultar detalhes' : '🔽 Ver detalhes técnicos'}
            </button>
          </div>
          
          {showDetails && (
            <div className="mt-3 pt-3 border-t border-gray-200 text-left">
              <p className="text-xs text-gray-500 mb-1">Debug info:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Token Mapbox: {import.meta.env.VITE_MAPBOX_ACCESS_TOKEN ? '✅ Configurado' : '❌ Não encontrado'}</li>
                <li>• Endereço: {address || '❌ Vazio'}</li>
                <li>• Status: Mapa de debug ativo</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DebugMap;
