import { useState, useEffect, useCallback } from 'react';
import { agendamentosService } from '../services/agendamentos';

interface PacienteAtivo {
  id_paciente: number;
  usuarios_id_usuario: number;
  enderecos_id_endereco: number;
  nome_paciente: string;
  cpf: string;
  data_nascimento: string;
  nivel_tea: string;
  e_titular: boolean;
  nome_titular: string | null;
}

export const useConsultasProfissional = () => {
  const [pacientes, setPacientes] = useState<PacienteAtivo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buscarPacientes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Iniciando busca de pacientes ativos do profissional...');
      console.log('🔑 Token presente:', !!localStorage.getItem('authToken'));
      console.log('👤 Tipo de usuário:', localStorage.getItem('userType'));
      
      // Usa o endpoint correto para profissionais
      const response = await agendamentosService.buscarMeusAgendamentosProfissional();
      console.log('🔍 Dados brutos do backend (pacientes-ativos):', response);
      
      // Log da estrutura dos dados
      if (response && response.length > 0) {
        console.log('📋 Estrutura do primeiro item:', Object.keys(response[0]));
        response.forEach((item: any, index: number) => {
          console.log(`📅 Paciente ${index + 1}:`, {
            id_paciente: item.id_paciente,
            nome_paciente: item.nome_paciente,
            nivel_tea: item.nivel_tea,
            data_nascimento: item.data_nascimento
          });
        });
      }
      
      setPacientes(response);
    } catch (err: any) {
      console.error('❌ Erro completo:', err);
      console.error('📋 Response status:', err.response?.status);
      console.error('📋 Response data:', err.response?.data);
      console.error('📋 Request URL:', err.config?.url);
      
      const errorMessage = err.response?.data?.message || err.message || 'Erro ao buscar pacientes';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Busca os pacientes quando o hook é inicializado
  useEffect(() => {
    buscarPacientes();
  }, [buscarPacientes]);

  const calcularIdade = (dataNascimento: string) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();
    
    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    
    return idade;
  };

  const formatarDataNascimento = (dataNascimento: string) => {
    return new Date(dataNascimento).toLocaleDateString('pt-BR');
  };

  const formatarNivelTea = (nivel: string) => {
    // Remove underscores e formata o nível TEA
    return nivel.replace(/_/g, ' ').replace('N VEL', 'Nível');
  };

  // Para compatibilidade com a página que espera consultas, 
  // vamos adaptar os dados de pacientes para simular consultas
  const consultasSimuladas = pacientes.map(paciente => ({
    id: paciente.id_paciente,
    paciente: {
      nome: paciente.nome_paciente,
      idade: calcularIdade(paciente.data_nascimento),
      cpf: paciente.cpf,
      nivel_tea: formatarNivelTea(paciente.nivel_tea),
      e_titular: paciente.e_titular,
      nome_titular: paciente.nome_titular
    },
    // Campos fictícios para compatibilidade
    data_horario_inicio: new Date().toISOString(),
    status: 'ativo', // Status baseado em ser um paciente ativo
    tipo: 'paciente_ativo'
  }));

  return {
    consultas: consultasSimuladas, // Mantém compatibilidade
    pacientes,
    loading,
    error,
    buscarConsultas: buscarPacientes, // Alias para compatibilidade
    calcularIdade,
    formatarDataNascimento,
    formatarNivelTea
  };
};
