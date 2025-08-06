import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface SimpleMapProps {
  latitude: number;
  longitude: number;
  address: string;
  className?: string;
}

const SimpleMap: React.FC<SimpleMapProps> = ({ 
  latitude, 
  longitude, 
  address, 
  className = "h-64 w-full rounded-lg border border-gray-300" 
}) => {
  // URL para Google Maps (funciona mesmo sem API key)
  const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  
  return (
    <div className={`${className} bg-gray-50 flex flex-col items-center justify-center p-4 relative overflow-hidden`}>
      {/* Padrão de fundo simulando um mapa */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23cbd5e0' fill-opacity='0.3'%3E%3Cpath d='M0 0h40v40H0V0zm10 10h20v20H10V10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      {/* Conteúdo principal */}
      <div className="relative z-10 text-center">
        <FaMapMarkerAlt className="text-red-500 text-4xl mx-auto mb-3" />
        <h4 className="font-semibold text-gray-900 mb-2">Localização</h4>
        <p className="text-sm text-gray-600 mb-4 max-w-xs">{address}</p>
        <p className="text-xs text-gray-500 mb-3">
          Coordenadas: {latitude.toFixed(4)}, {longitude.toFixed(4)}
        </p>
        <a 
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaMapMarkerAlt className="mr-2" />
          Ver no Google Maps
        </a>
      </div>
    </div>
  );
};

export default SimpleMap;
