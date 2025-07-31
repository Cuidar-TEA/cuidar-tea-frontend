import { useState } from "react";
import FluxoCadastroFamilia from "../components/flows/FluxoCadastroFamilia";
import FluxoCadastroProfissional from "../components/flows/FluxoCadastroProfissional";

export default function CadastroPage() {
  const [profileType, setProfileType] = useState<'familia' | 'profissional'>('profissional');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="w-full max-w-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Criar conta</h1>
          <p className="text-gray-600 mt-1">Junte-se à comunidade TEA Connect</p>
        </div>

        <div className="flex justify-center bg-gray-200 rounded-full p-1 mb-6">
          <button
            onClick={() => setProfileType('familia')}
            className={`w-full py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
              profileType === 'familia' ? 'bg-red-600 text-white shadow' : 'text-gray-600 hover:bg-gray-300'
            }`}
          >
            Família
          </button>
          <button
            onClick={() => setProfileType('profissional')}
            className={`w-full py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
              profileType === 'profissional' ? 'bg-red-600 text-white shadow' : 'text-gray-600 hover:bg-gray-300'
            }`}
          >
            Profissional
          </button>
        </div>

        {profileType === 'familia' ? <FluxoCadastroFamilia /> : <FluxoCadastroProfissional />}
        
        <a href="/" className="inline-block mx-auto text-center w-full mt-6 text-sm text-gray-500 hover:text-gray-800 hover:underline">
          ← Voltar para o início
        </a>
      </div>
    </div>
  );
}