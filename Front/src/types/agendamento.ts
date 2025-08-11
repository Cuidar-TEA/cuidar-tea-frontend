export interface CriarAgendamentoRequest {
  profissionais_id_profissional: number;
  enderecos_id_endereco: number;
  data_horario_inicio: string; // ISO string format
  duracao_consulta_minutos: number;
}

export interface CriarAgendamentoResponse {
  id: number;
  profissionais_id_profissional: number;
  enderecos_id_endereco: number;
  data_horario_inicio: string;
  duracao_consulta_minutos: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface DisponibilidadeResponse {
  data: string; // AAAA-MM-DD
  horarios_disponiveis: string[]; // Array de horários no formato "HH:MM"
  horarios_ocupados: string[]; // Array de horários ocupados no formato "HH:MM"
}

export interface AgendamentoFormData {
  profissionalId: string;
  dia: string;
  horario: string;
  endereco_id?: number;
}

// Mapeamento dos dias da semana para calcular datas
export const DIAS_SEMANA_MAP = {
  'segunda': 1, // Segunda = 1
  'terca': 2,   // Terça = 2
  'quarta': 3,  // Quarta = 3
  'quinta': 4,  // Quinta = 4
  'sexta': 5,   // Sexta = 5
  'sabado': 6,  // Sábado = 6
  'domingo': 0  // Domingo = 0
} as const;

export type DiaSemana = keyof typeof DIAS_SEMANA_MAP;