import { useState, useEffect } from 'react';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface UseGeolocationResult {
  coordinates: Coordinates | null;
  loading: boolean;
  error: string | null;
}

// Hook para converter endereço em coordenadas usando a API do Mapbox
export const useGeocoding = (address: string): UseGeolocationResult => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!address || !import.meta.env.VITE_MAPBOX_ACCESS_TOKEN) {
      return;
    }

    const geocodeAddress = async () => {
      setLoading(true);
      setError(null);

      try {
        // Codifica o endereço para URL
        const encodedAddress = encodeURIComponent(address);
        
        // Chama a API de Geocoding do Mapbox
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}&country=BR&limit=1`;
        
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.features && data.features.length > 0) {
          const [longitude, latitude] = data.features[0].center;
          setCoordinates({ latitude, longitude });
        } else {
          // Coordenadas padrão para São Paulo caso não encontre o endereço
          setCoordinates({ latitude: -23.5505, longitude: -46.6333 });
          setError('Endereço não encontrado, mostrando localização padrão');
        }
      } catch (err) {
        setError('Erro ao buscar localização');
        // Coordenadas padrão para São Paulo em caso de erro
        setCoordinates({ latitude: -23.5505, longitude: -46.6333 });
      } finally {
        setLoading(false);
      }
    };

    geocodeAddress();
  }, [address]);

  return { coordinates, loading, error };
};

// Hook para obter a localização atual do usuário
export const useCurrentLocation = (): UseGeolocationResult => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocalização não suportada pelo navegador');
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoading(false);
      },
      () => {
        setError('Erro ao obter localização atual');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000, // 10 minutos
      }
    );
  }, []);

  return { coordinates, loading, error };
};
