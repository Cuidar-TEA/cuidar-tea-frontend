/**
 * Utilitários para manipulação de datas e horários em agendamentos
 */

/**
 * Converte uma data e horário para formato ISO (usado pela API)
 * @param data Data no formato AAAA-MM-DD
 * @param horario Horário no formato HH:MM
 * @returns Data/hora em formato ISO
 */
export const criarDatetimeISO = (data: string, horario: string): string => {
  const [ano, mes, dia] = data.split('-');
  const [hora, minuto] = horario.split(':');
  
  const date = new Date(
    parseInt(ano),
    parseInt(mes) - 1, // JavaScript usa 0-11 para meses
    parseInt(dia),
    parseInt(hora),
    parseInt(minuto)
  );
  
  return date.toISOString();
};

/**
 * Formata uma data para o formato brasileiro (DD/MM/AAAA)
 * @param data Data no formato AAAA-MM-DD
 * @returns Data formatada como DD/MM/AAAA
 */
export const formatarDataBrasileira = (data: string): string => {
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
};

/**
 * Formata uma data para o formato brasileiro completo com dia da semana
 * @param data Data no formato AAAA-MM-DD
 * @returns Data formatada como "segunda-feira, 15 de janeiro de 2024"
 */
export const formatarDataCompletaBrasileira = (data: string): string => {
  const [ano, mes, dia] = data.split('-').map(Number);
  // Cria a data corretamente evitando problemas de fuso horário
  const dataLocal = new Date(ano, mes - 1, dia); // mes - 1 porque Date usa 0-11 para meses
  
  return dataLocal.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Gera uma lista de datas futuras no formato AAAA-MM-DD
 * @param dias Número de dias a partir de hoje
 * @returns Array com as datas
 */
export const gerarProximasDatas = (dias: number): { valor: string; label: string }[] => {
  const opcoes: { valor: string; label: string }[] = [];
  
  for (let i = 1; i <= dias; i++) {
    const data = new Date();
    data.setDate(data.getDate() + i);
    
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    
    const valor = `${ano}-${mes}-${dia}`;
    const label = formatarDataBrasileira(valor);
    
    opcoes.push({ valor, label });
  }
  
  return opcoes;
};
