import React from 'react';
import { Input, Select } from '../../ui/FormElements';
import { IMaskInput } from 'react-imask';
import { estadosBrasileiros } from '../../../utils/brasilData';

interface StepProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    errors: any;
}

export const PersonalInfoStep: React.FC<StepProps> = ({ formData, handleChange, errors }) => {
    return (
        <div className="space-y-4 animate-fade-in">
            <div className="text-center mb-4"><h2 className="text-xl font-semibold text-gray-800">Tópico 1: Pessoal</h2><p className="text-sm text-gray-500">Informações do responsável</p></div>
            <div><Input label="Nome completo" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} required />{errors.nomeCompleto && <p className="text-red-500 text-xs mt-1">{errors.nomeCompleto}</p>}</div>
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full">
                    <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">Telefone *</label>
                    <IMaskInput
                        mask="(00) 00000-0000"
                        name="telefone"
                        id="telefone"
                        value={formData.telefone}
                        onAccept={(value: any) => handleChange({ target: { name: 'telefone', value } } as any)}
                        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
                        placeholder="(00) 00000-0000"
                        required
                    />
                    {errors.telefone && <p className="text-red-500 text-xs mt-1">{errors.telefone}</p>}
                </div>
                <div className="w-full">
                    <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">CPF *</label>
                    <IMaskInput
                        mask="000.000.000-00"
                        name="cpf"
                        id="cpf"
                        value={formData.cpf}
                        onAccept={(value: any) => handleChange({ target: { name: 'cpf', value } } as any)}
                        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
                        placeholder="000.000.000-00"
                        required
                    />
                    {errors.cpf && <p className="text-red-500 text-xs mt-1">{errors.cpf}</p>}
                </div>
            </div>
            <h3 className="text-md font-semibold text-gray-700 pt-2 border-t mt-4">Endereço</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="w-full">
                    <label htmlFor="cep" className="block text-sm font-medium text-gray-700 mb-1">CEP *</label>
                    <IMaskInput
                        mask="00000-000"
                        name="cep"
                        id="cep"
                        value={formData.cep}
                        onAccept={(value: any) => handleChange({ target: { name: 'cep', value } } as any)}
                        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
                        placeholder="00000-000"
                        required
                    />
                    {errors.cep && <p className="text-red-500 text-xs mt-1">{errors.cep}</p>}
                </div>
                <div><Select label="Estado" name="estado" value={formData.estado} onChange={handleChange} required><option value="">Selecione</option>{estadosBrasileiros.map(e => <option key={e.sigla} value={e.sigla}>{e.nome}</option>)}</Select>{errors.estado && <p className="text-red-500 text-xs mt-1">{errors.estado}</p>}</div>
                <div><Input label="Cidade" name="cidade" value={formData.cidade} onChange={handleChange} required />{errors.cidade && <p className="text-red-500 text-xs mt-1">{errors.cidade}</p>}</div>
                <div><Input label="Logradouro" name="logradouro" value={formData.logradouro} onChange={handleChange} required />{errors.logradouro && <p className="text-red-500 text-xs mt-1">{errors.logradouro}</p>}</div>
                <div><Input label="Bairro" name="bairro" value={formData.bairro} onChange={handleChange} required />{errors.bairro && <p className="text-red-500 text-xs mt-1">{errors.bairro}</p>}</div>
                <div><Input label="Número" name="numero" value={formData.numero} onChange={handleChange} required />{errors.numero && <p className="text-red-500 text-xs mt-1">{errors.numero}</p>}</div>
                <div className="sm:col-span-2"><Input label="Complemento" name="complemento" value={formData.complemento} onChange={handleChange} /></div>
            </div>
            <div className="flex items-start pt-2"><input type="checkbox" name="souResponsavel" id="souResponsavel" checked={formData.souResponsavel} onChange={handleChange} className="h-4 w-4 mt-1 text-red-600 border-gray-300 rounded focus:ring-red-500" /><label htmlFor="souResponsavel" className="ml-2 block text-sm text-gray-800">Sou o titular responsável (o paciente)</label></div>
        </div>
    );
};