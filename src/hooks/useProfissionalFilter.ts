import { useState, useEffect } from 'react';

// Função para ordenar profissionais no frontend
const ordenarProfissionais = (profissionais: Profissional[], orderBy: string): Profissional[] => {
  const profissionaisOrdenados = [...profissionais];
  
  switch (orderBy) {
    case 'valor_consulta_asc':
      // Menor preço primeiro
      return profissionaisOrdenados.sort((a, b) => {
        const valorA = parseFloat(a.valor_consulta) || 0;
        const valorB = parseFloat(b.valor_consulta) || 0;
        return valorA - valorB;
      });
      
    case 'valor_consulta_desc':
      // Maior preço primeiro
      return profissionaisOrdenados.sort((a, b) => {
        const valorA = parseFloat(a.valor_consulta) || 0;
        const valorB = parseFloat(b.valor_consulta) || 0;
        return valorB - valorA;
      });
      
    case 'nota_atendimento_desc':
      // Melhor avaliação primeiro
      return profissionaisOrdenados.sort((a, b) => {
        const notaA = a.agendamentos.length > 0 
          ? a.agendamentos.reduce((acc, ag) => acc + (ag.nota_atendimento || 0), 0) / a.agendamentos.length 
          : 0;
        const notaB = b.agendamentos.length > 0 
          ? b.agendamentos.reduce((acc, ag) => acc + (ag.nota_atendimento || 0), 0) / b.agendamentos.length 
          : 0;
        return notaB - notaA;
      });
      
    case 'nome_asc':
      // Ordem alfabética por nome
      return profissionaisOrdenados.sort((a, b) => a.nome.localeCompare(b.nome));
      
    default:
      return profissionaisOrdenados;
  }
};

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

interface FiltrosProfissionais {
  formacao?: string;  // Mudando de 'formacoes' para 'formacao' (singular)
  cidade?: string;
  estado?: string;
  aceita_convenio?: boolean;
  atende_a_domicilio?: boolean;
  valor_da_consulta?: number;
  nota_de_atendimento?: number;
  nome?: string;  // Adicionando parâmetro para busca por nome
  orderBy?: string;  // Adicionando parâmetro de ordenação
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
      
      if (filtrosParaBusca.formacao) {
        queryParams.append('formacao', filtrosParaBusca.formacao);
      }
      
      if (filtrosParaBusca.nome) {
        queryParams.append('nome', filtrosParaBusca.nome);
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
      
      if (filtrosParaBusca.atende_a_domicilio !== undefined) {
        queryParams.append('atende_domicilio', filtrosParaBusca.atende_a_domicilio.toString());
      }
      
      if (filtrosParaBusca.valor_da_consulta !== undefined) {
        queryParams.append('valor_consulta', filtrosParaBusca.valor_da_consulta.toString());
      }
      
      if (filtrosParaBusca.nota_de_atendimento !== undefined) {
        queryParams.append('nota_de_atendimento', filtrosParaBusca.nota_de_atendimento.toString());
      }
      
      // Não enviamos orderBy para a API, fazemos ordenação no frontend
      
      // URL direta do seu backend local
      const url = `http://localhost:3001/api/profissionais${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      
      console.log('=== REQUISIÇÃO PARA API ===');
      console.log('URL completa:', url);
      console.log('URL decodificada:', decodeURIComponent(url));
      console.log('Filtros aplicados:', filtrosParaBusca);
      console.log('Query params enviados:', queryParams.toString());
      console.log('Query params decodificados:', decodeURIComponent(queryParams.toString()));
      console.log('===========================');
      
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
      console.log('=== RESPOSTA DA API ===');
      console.log('Número de profissionais encontrados:', data.length);
      
      if (data.length > 0) {
        console.log('Exemplo do primeiro profissional:');
        console.log('- Nome:', data[0].nome);
        console.log('- Valor consulta:', data[0].valor_consulta);
        console.log('- Cidade:', data[0].enderecos?.cidade);
        console.log('- Estado:', data[0].enderecos?.estado);
        console.log('- Aceita convênio:', data[0].aceita_convenio);
        console.log('- Atende domicílio:', data[0].atende_domicilio);
        console.log('- Especialidades:', data[0].profissional_especialidades?.map((pe: any) => pe.especialidades?.nome_especialidade));
      } else {
        console.log('Nenhum profissional encontrado com os filtros aplicados');
      }

      // Aplicar ordenação no frontend se especificada
      let dadosOrdenados = [...data];
      if (filtrosParaBusca.orderBy) {
        console.log('Aplicando ordenação no frontend:', filtrosParaBusca.orderBy);
        dadosOrdenados = ordenarProfissionais(data, filtrosParaBusca.orderBy);
      }

      console.log('======================');

      setProfissionais(dadosOrdenados);
      
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
    aceitaConvenio: boolean;
    faixaPreco: string[];
  }) => {
    const filtros: FiltrosProfissionais = {};
    
    console.log('=== APLICANDO FILTROS ===');
    console.log('Form data recebido:', formData);
    
    // Mapeia profissão para formacao (parâmetro da API)
    if (formData.profissao && formData.profissao !== '') {
      const mapeamentoProfissao: { [key: string]: string } = {
        'medico': 'Medico',
        'psicologo': 'Psicologo',
        'fonoaudiologo': 'Fonoaudiologo',
        'fisioterapeuta': 'Fisioterapeuta',
        'terapeuta': 'Terapeuta Ocupacional',
        'pedagogo': 'Pedagogo',
        'psicopedagogo': 'Psicopedagogo'
      };
      
      filtros.formacao = mapeamentoProfissao[formData.profissao] || formData.profissao;
      console.log('Profissão mapeada para parâmetro formacao:', filtros.formacao);
    }
    
    // Mapeia ordenação (implementação no frontend)
    if (formData.ordenacao && formData.ordenacao !== '') {
      const mapeamentoOrdenacao: { [key: string]: string } = {
        'avaliacao': 'nota_atendimento_desc',      // Melhor avaliação (maior nota primeiro)
        'preco-menor': 'valor_consulta_asc',       // Menor preço primeiro
        'preco-maior': 'valor_consulta_desc'       // Maior preço primeiro
      };
      
      filtros.orderBy = mapeamentoOrdenacao[formData.ordenacao] || formData.ordenacao;
      console.log('Ordenação mapeada (frontend):', filtros.orderBy);
    }
    
    // Mapeia atendimento domicílio
    if (formData.atendimentoDomicilio) {
      filtros.atende_a_domicilio = true;
      console.log('Atende a domicílio:', filtros.atende_a_domicilio);
    }
    
    // Mapeia aceita convênio
    if (formData.aceitaConvenio) {
      filtros.aceita_convenio = true;
      console.log('Aceita convênio:', filtros.aceita_convenio);
    }
    
    // Mapeia faixa de preço para valor da consulta (valor MÁXIMO permitido)
    if (formData.faixaPreco && formData.faixaPreco.length > 0) {
      console.log('Faixas de preço selecionadas:', formData.faixaPreco);
      
      // Se múltiplas faixas estão selecionadas, pega a maior para permitir todas
      // Exemplo: se "até 150" e "151-300" estão marcados, mostra até 300
      const valores = formData.faixaPreco.map(faixa => {
        switch(faixa) {
          case 'ate150': return 150;    // Até R$ 150
          case 'ate300': return 300;    // R$ 151 - R$ 300 (mas API filtra até 300)
          case 'ate500': return 500;    // R$ 301 - R$ 500 (mas API filtra até 500)
          default: return null;
        }
      }).filter(Boolean) as number[];
      
      if (valores.length > 0) {
        // Pega o MAIOR valor selecionado como limite máximo
        // Isso permite que todas as faixas selecionadas sejam incluídas
        const maxValor = Math.max(...valores);
        filtros.valor_da_consulta = maxValor;
        console.log('Valor máximo da consulta (mostra ATÉ este valor):', filtros.valor_da_consulta);
      }
    }
    
    console.log('Filtros finais enviados para API:', filtros);
    console.log('========================');
    
    buscarProfissionais(filtros);
  };

  const buscarPorNome = (nome: string) => {
    const filtros: FiltrosProfissionais = {};
    
    if (nome && nome.trim() !== '') {
      filtros.nome = nome.trim();
      console.log('=== BUSCA POR NOME ===');
      console.log('Nome pesquisado:', filtros.nome);
      console.log('======================');
    }
    
    buscarProfissionais(filtros);
  };

  return {
    profissionais,
    loading,
    error,
    aplicarFiltros,
    buscarPorNome,
    refetch
  };
};