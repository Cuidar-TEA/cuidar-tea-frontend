import React from "react";
import Navbar from "../../components/layout/Navbar";
import PesquisaDeProfissional from "./PesquisaDeProfissional";
import BlocoFiltroProfissionais from "./BlocoFiltroProfissionais";
import BlocoMostrarProfissionais from "./BlocoMostrarProfissionais";
import { ProfissionaisProvider } from "../../contexts/ProfissionaisContext";

const PesquisaProfissionalPage: React.FC = () => {
    return(
        <>
            <Navbar />
            <PesquisaDeProfissional />
            <ProfissionaisProvider>
                <div className="flex ml-40 mt-10 gap-8">
                    <BlocoFiltroProfissionais />
                    <BlocoMostrarProfissionais />
                </div>
            </ProfissionaisProvider>
        </>
    )
}

export default PesquisaProfissionalPage;