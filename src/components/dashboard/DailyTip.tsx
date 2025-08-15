export default function DailyTip() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm animate-fade-in">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">📌 Dica do Dia</h3>
      <div className="bg-rose-50 p-4 rounded-md border border-rose-100">
        <p className="text-rose-800 font-semibold">Rotina Estruturada</p>
        <p className="text-sm text-rose-700">
          Manter uma rotina consistente pode ajudar crianças com TEA a se sentirem mais seguras e organizadas.
        </p>
      </div>
    </div>
  )
}
