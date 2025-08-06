import type { Appointment } from "../../types";

interface Props {
  appointments: Appointment[];
}

export default function UpcomingAppointments({ appointments }: Props) {
  return (
    <section className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">📅 Próximas Consultas</h3>

      {appointments.length === 0 ? (
        <p className="text-gray-500 text-sm">Nenhuma consulta agendada.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((a, idx) => (
            <div key={idx} className="flex justify-between items-center border p-4 rounded-md">
              <div>
                <p className="font-semibold">{a.profissional.nome} <span className="text-sm text-gray-500">({a.profissional.especialidade})</span></p>
                <p className="text-sm text-gray-500">{a.data} - {a.tipo}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`font-medium ${
                  a.status === "confirmado" ? "text-green-600" :
                  a.status === "pendente" ? "text-yellow-600" : "text-gray-500"
                }`}>
                  {a.status}
                </span>
                <button className="text-sm text-gray-700 hover:underline">Detalhes</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-4">
        <button className="text-red-600 hover:underline text-sm font-medium">Ver todas as consultas</button>
      </div>
    </section>
  );
}
