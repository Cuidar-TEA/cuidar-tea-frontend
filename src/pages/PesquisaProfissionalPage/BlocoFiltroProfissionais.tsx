import React from "react";
import { useProfissionaisContext } from "../../contexts/ProfissionaisContext";

interface FormData {
    profissao: string;
    ordenacao: string;
    atendimentoDomicilio: boolean;
    aceitaConvenio: boolean;
    faixaPreco: string[];
}

const BlocoFiltroProfissionais: React.FC = () => {
    const { aplicarFiltros: aplicarFiltrosHook } = useProfissionaisContext();
    
    const [formData, setFormData] = React.useState<FormData>({
        profissao: "",
        ordenacao: "",
        atendimentoDomicilio: false,
        aceitaConvenio: false,
        faixaPreco: []
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    const handleFaixaPrecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            faixaPreco: checked 
                ? [...prev.faixaPreco, value]
                : prev.faixaPreco.filter(faixa => faixa !== value)
        }));
    };

    const aplicarFiltros = () => {
        console.log('=== BOTÃO APLICAR FILTROS CLICADO ===');
        console.log('Estado atual do formulário:', formData);
        aplicarFiltrosHook(formData);
    };

    return (
        <div className="w-72 h-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-6 ml-24 mt-10">
            <h2 className="text-2xl font-semibold mb-6 text-center">Filtros</h2>
            
            <div className="mb-6">
                <label htmlFor="profissao" className="block text-base font-medium text-gray-700 mb-2">
                    Profissão
                </label>
                <select
                    id="profissao"
                    name="profissao"
                    value={formData.profissao}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                >
                    <option value="">Todas as profissões</option>
                    <option value="medico">Médico(a)</option>
                    <option value="psicologo">Psicólogo(a)</option>
                    <option value="fonoaudiologo">Fonoaudiólogo(a)</option>
                    <option value="fisioterapeuta">Fisioterapeuta</option>
                    <option value="terapeuta">Terapeuta Ocupacional</option>
                    <option value="pedagogo">Pedagogo(a)</option>
                    <option value="psicopedagogo">Psicopedagogo(a)</option>
                </select>
            </div>

            <div className="mb-6">
                <label htmlFor="ordenacao" className="block text-base font-medium text-gray-700 mb-2">
                    Ordenar por
                </label>
                <select
                    id="ordenacao"
                    name="ordenacao"
                    value={formData.ordenacao}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                >
                    <option value="">Relevância</option>
                    <option value="avaliacao">Melhor avaliação</option>
                    <option value="preco-menor">Menor preço</option>
                    <option value="preco-maior">Maior preço</option>
                </select>
            </div>

            <div className="mb-6">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="atendimentoDomicilio"
                        name="atendimentoDomicilio"
                        checked={formData.atendimentoDomicilio}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                    />
                    <label htmlFor="atendimentoDomicilio" className="ml-2 text-sm font-medium text-gray-700">
                        Atendimento a domicílio
                    </label>
                </div>
            </div>

            <div className="mb-6">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="aceitaConvenio"
                        name="aceitaConvenio"
                        checked={formData.aceitaConvenio}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                    />
                    <label htmlFor="aceitaConvenio" className="ml-2 text-sm font-medium text-gray-700">
                        Aceita convênio
                    </label>
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-base font-medium text-gray-700 mb-3">
                    Faixa de Preço
                </label>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="ate150"
                            value="ate150"
                            checked={formData.faixaPreco.includes('ate150')}
                            onChange={handleFaixaPrecoChange}
                            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                        />
                        <label htmlFor="ate150" className="ml-2 text-sm font-medium text-gray-700">
                            Até R$ 150
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="ate300"
                            value="ate300"
                            checked={formData.faixaPreco.includes('ate300')}
                            onChange={handleFaixaPrecoChange}
                            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                        />
                        <label htmlFor="ate300" className="ml-2 text-sm font-medium text-gray-700">
                            Até R$ 300
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="ate500"
                            value="ate500"
                            checked={formData.faixaPreco.includes('ate500')}
                            onChange={handleFaixaPrecoChange}
                            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                        />
                        <label htmlFor="ate500" className="ml-2 text-sm font-medium text-gray-700">
                            Até R$ 500
                        </label>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <button
                    onClick={aplicarFiltros}
                    className="w-full bg-red-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-300"
                >
                    Aplicar Filtros
                </button>
            </div>
        </div>
    );
}

export default BlocoFiltroProfissionais;