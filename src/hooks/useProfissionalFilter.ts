import { useState, useEffect } from 'react';

interface Profissional {
  id: string;
  nome: string;
  especialidade: string;
  avaliacao: number;
  totalAvaliacoes: number;
  preco: number;
  foto: string;
  especialidades: string[];
  cidade?: string;
  estado?: string;
  aceitaConvenio?: boolean;
}

interface FiltrosProfissionais {
  especialidade?: string;
  cidade?: string;
  estado?: string;
  aceita_convenio?: boolean;
  preco_min?: number;
  preco_max?: number;
}

interface UseProfissionaisReturn {
  profissionais: Profissional[];
  loading: boolean;
  error: string | null;
  buscarProfissionais: (filtros?: FiltrosProfissionais) => void;
  refetch: () => void;
}

export const useProfissionais = (filtrosIniciais?: FiltrosProfissionais): UseProfissionaisReturn => {
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filtrosAtuais, setFiltrosAtuais] = useState<FiltrosProfissionais>(filtrosIniciais || {});

  const buscarProfissionais = async (filtros?: FiltrosProfissionais) => {
    try {
      setLoading(true);
      setError(null);
      
      // Atualiza filtros se fornecidos
      const filtrosParaBusca = filtros || filtrosAtuais;
      setFiltrosAtuais(filtrosParaBusca);
      
      // Constrói query params
      const queryParams = new URLSearchParams();
      
      if (filtrosParaBusca.especialidade) {
        queryParams.append('especialidade', filtrosParaBusca.especialidade);
      }
      
      if (filtrosParaBusca.cidade) {
        queryParams.append('cidade', filtrosParaBusca.cidade);
      }
      
      if (filtrosParaBusca.estado) {
        queryParams.append('estado', filtrosParaBusca.estado);
      }
      
      if (filtrosParaBusca.aceita_convenio !== undefined) {
        queryParams.append('aceita_convenio', filtrosParaBusca.aceita_convenio.toString());
      }
      
      if (filtrosParaBusca.preco_min !== undefined) {
        queryParams.append('preco_min', filtrosParaBusca.preco_min.toString());
      }
      
      if (filtrosParaBusca.preco_max !== undefined) {
        queryParams.append('preco_max', filtrosParaBusca.preco_max.toString());
      }
      
      // URL direta do seu backend local
      const url = `http://localhost:3001/api/profissionais${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      console.log('Fazendo requisição para:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Dados recebidos:', data);
      setProfissionais(data);
      
    } catch (err) {
      console.error('Erro ao buscar profissionais:', err);
      setError(err instanceof Error ? err.message : 'Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    buscarProfissionais(filtrosAtuais);
  };

  // Busca inicial ao montar o componente
  useEffect(() => {
    buscarProfissionais();
  }, []);

  return {
    profissionais,
    loading,
    error,
    buscarProfissionais,
    refetch
  };
};

// Hook especializado para usar com os filtros do BlocoFiltroProfissionais
export const useProfissionaisComFiltros = () => {
  const {
    profissionais,
    loading,
    error,
    buscarProfissionais,
    refetch
  } = useProfissionais();

  const aplicarFiltros = (formData: {
    profissao: string;
    ordenacao: string;
    atendimentoDomicilio: boolean;
    faixaPreco: string[];
  }) => {
    const filtros: FiltrosProfissionais = {};
    
    // Mapeia profissão para especialidade
    if (formData.profissao) {
      const mapeamentoProfissao: { [key: string]: string } = {
        'psicologo': 'psicologo',
        'fonoaudiologo': 'fonoaudiologo', 
        'terapeuta': 'terapeuta',
        'pediatra': 'pediatra'
      };
      
      filtros.especialidade = mapeamentoProfissao[formData.profissao] || formData.profissao;
    }
    
    // Mapeia atendimento domicílio para aceita convênio
    if (formData.atendimentoDomicilio) {
      filtros.aceita_convenio = true;
    }
    
    // Mapeia faixa de preço
    if (formData.faixaPreco && formData.faixaPreco.length > 0) {
      const valores = formData.faixaPreco.map(faixa => {
        switch(faixa) {
          case 'ate150': return { min: 0, max: 150 };
          case 'ate300': return { min: 151, max: 300 };
          case 'ate500': return { min: 301, max: 500 };
          default: return null;
        }
      }).filter(Boolean);
      
      if (valores.length > 0) {
        const minValor = Math.min(...valores.map(v => v!.min));
        const maxValor = Math.max(...valores.map(v => v!.max));
        filtros.preco_min = minValor;
        filtros.preco_max = maxValor;
      }
    }
    
    buscarProfissionais(filtros);
  };

  return {
    profissionais,
    loading,
    error,
    aplicarFiltros,
    refetch
  };
};