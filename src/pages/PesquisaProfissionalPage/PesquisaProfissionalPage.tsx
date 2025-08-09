import React from "react";
import PesquisaDeProfissional from "./PesquisaDeProfissional";
import BlocoFiltroProfissionais from "./BlocoFiltroProfissionais";
import BlocoMostrarProfissionais from "./BlocoMostrarProfissionais";
import { ProfissionaisProvider } from "../../contexts/ProfissionaisContext";

const PesquisaProfissionalPage: React.FC = () => {
    return(
        <div className="bg-gray-50 min-h-screen">
            <ProfissionaisProvider>
                <PesquisaDeProfissional />
                <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8">
                    <BlocoFiltroProfissionais />
                    <BlocoMostrarProfissionais />
                </div>
            </ProfissionaisProvider>
        </div>
    )
}

export default PesquisaProfissionalPage;