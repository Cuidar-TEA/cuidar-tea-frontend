import React from "react";
import { FaSearch } from "react-icons/fa";
import { useProfissionaisContext } from "../../contexts/ProfissionaisContext";

const PesquisaDeProfissional: React.FC = () => {
    const [termoPesquisa, setTermoPesquisa] = React.useState("");
    const { buscarPorNome } = useProfissionaisContext();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (termoPesquisa.trim()) {
            buscarPorNome(termoPesquisa.trim());
        } else {
            buscarPorNome("");
        }
    }
    return(
        <div className="w-full max-w-4xl mx-auto p-4 mt-10">
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={termoPesquisa}
                        onChange={(e) => setTermoPesquisa(e.target.value)}
                        placeholder="Digite o nome do profissional  ..."
                        className="w-full px-4 py-3 pl-12 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm"
                    />
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                <button
                    type="submit"
                    className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-300 shadow-sm whitespace-nowrap"
                >
                    Pesquisar profissional
                </button>
            </form>
        </div>
    );
}

export default PesquisaDeProfissional;