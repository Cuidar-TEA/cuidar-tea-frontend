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
  id: number;
  nome: string;
  especialidade: string;
  estrelas: number;
  avaliacoes: number;
  local: string;
  horario: string;
  preco: string;
  disponivel: boolean;
}
