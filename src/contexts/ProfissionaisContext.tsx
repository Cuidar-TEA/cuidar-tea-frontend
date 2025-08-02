import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useProfissionaisComFiltros } from '../hooks/useProfissionalFilter';

interface Profissional {
  id_profissional: number;
  usuarios_id_usuario: number;
  enderecos_id_endereco: number;
  foto_perfil_url: string | null;
  nome: string;
  cpf: string;
  tipo_registro: string;
  numero_registro: string;
  uf_registro: string;
  descricao: string | null;
  valor_consulta: string;
  aceita_convenio: boolean;
  atende_domicilio: number;
  enderecos: {
    id_endereco: number;
    estado: string;
    cidade: string;
    apelido_endereco: string | null;
    cep: string;
    logradouro: string;
    numero: string;
    bairro: string;
    complemento: string;
  };
  profissional_especialidades: Array<{
    profissionais_id_profissional: number;
    especialidades_id_especialidade: number;
    especialidades: {
      id_especialidade: number;
      nome_especialidade: string;
    };
  }>;
  agendamentos: Array<{
    nota_atendimento?: number;
  }>;
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
    aplicarFiltros,
    refetch
  } = useProfissionaisComFiltros();

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
