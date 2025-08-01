import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useProfissionais } from '../hooks/useProfissionalFilter';

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

interface ProfissionaisContextType {
  profissionais: Profissional[];
  loading: boolean;
  error: string | null;
  aplicarFiltros: (formData: {
    profissao: string;
    ordenacao: string;
    atendimentoDomicilio: boolean;
    faixaPreco: string[];
  }) => void;
  refetch: () => void;
}

const ProfissionaisContext = createContext<ProfissionaisContextType | undefined>(undefined);

export const ProfissionaisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
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

  return (
    <ProfissionaisContext.Provider value={{
      profissionais,
      loading,
      error,
      aplicarFiltros,
      refetch
    }}>
      {children}
    </ProfissionaisContext.Provider>
  );
};

export const useProfissionaisContext = () => {
  const context = useContext(ProfissionaisContext);
  if (!context) {
    throw new Error('useProfissionaisContext deve ser usado dentro de ProfissionaisProvider');
  }
  return context;
};
