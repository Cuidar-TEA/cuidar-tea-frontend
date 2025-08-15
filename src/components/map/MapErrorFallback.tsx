import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface MapErrorFallbackProps {
  message?: string;
  showIcon?: boolean;
  className?: string;
}

const MapErrorFallback: React.FC<MapErrorFallbackProps> = ({ 
  message = "Localização não disponível", 
  showIcon = true,
  className = "h-64 w-full rounded-lg border border-gray-300 bg-gray-100 flex items-center justify-center"
}) => {
  return (
    <div className={className}>
      <div className="text-center">
        {showIcon && (
          <FaExclamationTriangle className="text-yellow-500 text-3xl mx-auto mb-2" />
        )}
        <p className="text-gray-600">{message}</p>
        <p className="text-sm text-gray-500 mt-1">
          Verifique o endereço ou tente novamente mais tarde
        </p>
      </div>
    </div>
  );
};

export default MapErrorFallback;
