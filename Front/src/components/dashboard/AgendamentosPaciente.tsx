import { useEffect, useState } from "react";

interface Consulta {
  data_formatada: string;
  especialidade: string;
  id_agendamento: number;
  nome_profissional: string;
  status: string;
}

export default function ConsultasRecentes() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function fetchConsultas() {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setErro("Usuário não autenticado. Faça login para ver seus agendamentos.");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:3000/api/agendamentos/proximos", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            setErro("Sessão expirada ou não autenticada. Faça login novamente.");
          } else {
            setErro("Erro ao buscar consultas.");
          }
          setLoading(false);
          return;
        }

        const data: Consulta[] = await res.json();
        console.log("data recebida:", data);

        const futuras = data.slice(0, 4);
        console.log("futuras:", futuras);

        setConsultas(futuras);
      } catch (err) {
        setErro("Erro de conexão com o servidor.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchConsultas();
  }, []);

  if (loading) return <p>Carregando consultas...</p>;

  if (erro) {
    return (
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <p className="text-red-500">{erro}</p>
      </div>
    );
  }

  if (consultas.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <p className="text-gray-500">Nenhuma consulta futura encontrada.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">📅 Próximas Consultas</h3>
      <ul className="space-y-3">
        {consultas.map((consulta) => (
          <li
            key={consulta.id_agendamento}
            className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition"
          >
            <div>
              <p className="font-medium">{consulta.nome_profissional}</p>
              <p className="text-sm text-gray-500">{consulta.especialidade}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">
                {consulta.data_formatada}
              </p>
              <p className="text-xs text-gray-400">{consulta.status}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
