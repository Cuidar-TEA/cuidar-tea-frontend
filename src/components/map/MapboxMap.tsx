import React, { useEffect, useState } from 'react';

interface MapboxMapProps {
  address: string;
  className?: string;
}

const MapboxMap: React.FC<MapboxMapProps> = ({ 
  address, 
  className = "h-64 w-full rounded-lg border border-gray-300" 
}) => {
  const [mapUrl, setMapUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>('Inicializando...');
  
  const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    const generateStaticMap = async () => {
      try {
        console.log('Gerando mapa estático para:', address);
        setLoading(true);
        setError(null);
        setDebugInfo('Geocodificando endereço...');
        
        // Verifica se o token está disponível
        if (!token) {
          throw new Error('Token do Mapbox não configurado');
        }

        // Primeiro, geocodifica o endereço
        console.log('Fazendo geocoding...');
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}&country=BR&limit=1`
        );
        
        console.log('Geocoding response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Erro no geocoding: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Dados do geocoding:', data);
        
        if (data.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].center;
          console.log('Coordenadas encontradas:', { lat, lng });
          
          setDebugInfo('Gerando mapa estático...');
          
          // Gera URL do mapa estático
          // Formato: /styles/v1/{username}/{style_id}/static/{overlay}/{lon},{lat},{zoom},{bearing},{pitch}/{width}x{height}{@2x}
          const staticMapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/pin-s-l+3B82F6(${lng},${lat})/${lng},${lat},15,0/400x300@2x?access_token=${token}`;
          
          console.log('URL do mapa estático:', staticMapUrl);
          setMapUrl(staticMapUrl);
          setDebugInfo('Mapa carregado!');
          setLoading(false);
        } else {
          throw new Error('Endereço não encontrado no geocoding');
        }
        
      } catch (err) {
        console.error('Erro ao gerar mapa estático:', err);
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        setDebugInfo('Erro ao carregar mapa');
        setLoading(false);
      }
    };

    if (address && token) {
      generateStaticMap();
    } else if (!address) {
      setError('Endereço não informado');
      setLoading(false);
    } else if (!token) {
      setError('Token do Mapbox não configurado');
      setLoading(false);
    }
  }, [address, token]);

  if (loading) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Carregando mapa...</p>
          <p className="text-xs text-gray-500 mt-1">{debugInfo}</p>
          <p className="text-xs text-gray-400 mt-1">Endereço: {address}</p>
        </div>
      </div>
    );
  }

  if (error || !mapUrl) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center border border-gray-300 rounded-lg`}>
        <div className="text-center">
          <p className="text-gray-600 mb-2">{error || 'Erro ao carregar mapa'}</p>
          <p className="text-xs text-gray-500">Verifique sua conexão com a internet</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <img 
        src={mapUrl}
        alt={`Mapa de ${address}`}
        className="w-full h-full object-cover rounded-lg border border-gray-300"
        loading="lazy"
        onError={() => {
          setError('Erro ao carregar a imagem do mapa');
        }}
      />
      {/* Informações de debug (remover em produção) */}
      <div className="text-xs text-gray-500 mt-1 px-2">
        <p>Debug: {debugInfo}</p>
      </div>
    </div>
  );
};

export default MapboxMap;
