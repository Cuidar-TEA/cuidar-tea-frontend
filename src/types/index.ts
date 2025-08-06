export interface User {
  id: number;
  nome: string;
  email: string;
  // outros campos
}

export interface Appointment {
  id: number;
  data: string;
  tipo: "Online" | "Presencial";
  status: "confirmado" | "pendente" | "cancelado";
  profissional: {
    nome: string;
    especialidade: string;
  };
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
