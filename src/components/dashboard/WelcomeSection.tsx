interface Props {
  name: string;
}

export default function WelcomeSection({ name }: Props) {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800">Bem-vindo de volta, {name}!</h2>
      <p className="text-gray-500 text-sm">Aqui está um resumo das suas atividades recentes</p>
    </section>
  );
}
