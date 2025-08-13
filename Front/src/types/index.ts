export interface User {
  id: number;
  nome: string;
  email: string;
  // outros campos
}

export interface Appointment {
  id_agendamento: number;  
  data: string;
  tipo?: string;             
  
  status: 'AGENDADO' | 'CANCELADO' | 'FINALIZADO'; 

  profissionais: Profissional; 
}

export interface Profissional {
  id_profissional: number;
  nome: string;
  especialidade?: string;
  avaliacao_media?: number;
  total_avaliacoes?: number;
  cidade?: string;
  estado?: string;
  formacao?: string;
  foto_perfil_url?: string | null;
  proxima_disponibilidade?: string;
  valor_consulta?: number | null;
}
