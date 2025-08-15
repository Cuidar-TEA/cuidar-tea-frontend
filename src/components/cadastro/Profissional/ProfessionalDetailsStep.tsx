import React from 'react';
import { IMaskInput } from 'react-imask';
import { Input, Select } from '../../ui/FormElements';
import { estadosBrasileiros, profissoes } from '../../../utils/brasilData'; 

interface StepProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    errors: any;
}

export const ProfessionalDetailsStep: React.FC<StepProps> = ({ formData, handleChange, errors }) => {
    return (
        <div className="space-y-4 animate-fade-in">
            <div className="text-center mb-4"><h2 className="text-xl font-semibold text-gray-800">Tópico 2: Profissão</h2><p className="text-sm text-gray-500">Suas informações profissionais</p></div>
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full">
                    <Select label="Profissão" name="profissao" value={formData.profissao} onChange={handleChange} required>
                        <option value="" disabled>Selecione sua profissao</option>
                        {profissoes.map(prof => (
                            <option key={prof} value={prof}>{prof}</option>
                        ))}
                    </Select>
                    {errors.profissao && <p className="text-red-500 text-xs mt-1">{errors.profissao}</p>}
                </div>
                <div className="w-full">
                    <Input label="Especialidade" name="especialidade" value={formData.especialidade} onChange={handleChange} placeholder="Ex: TEA, Terapia Cognitiva..." required />
                    {errors.especialidade && <p className="text-red-500 text-xs mt-1">{errors.especialidade}</p>}
                </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full"><Input label="Número de registro" name="numeroRegistro" value={formData.numeroRegistro} onChange={handleChange} placeholder="Ex: CRP 12345" required />{errors.numeroRegistro && <p className="text-red-500 text-xs mt-1">{errors.numeroRegistro}</p>}</div>
                <div className="w-full"><Select label="Tipo de registro" name="tipoRegistro" value={formData.tipoRegistro} onChange={handleChange} required><option value="" disabled>Selecione</option><option value="CRM">CRM</option><option value="CRP">CRP</option><option value="CREFITO">CREFITO</option><option value="Outro">Outro</option></Select>{errors.tipoRegistro && <p className="text-red-500 text-xs mt-1">{errors.tipoRegistro}</p>}</div>
            </div>
            <div>
                <Select label="UF de registro" name="ufRegistro" value={formData.ufRegistro} onChange={handleChange} required>
                    <option value="" disabled>Selecione</option>
                    {estadosBrasileiros.map(e => <option key={e.sigla} value={e.sigla}>{e.sigla}</option>)}
                </Select>
                {errors.ufRegistro && <p className="text-red-500 text-xs mt-1">{errors.ufRegistro}</p>}
            </div>
            <h3 className="text-md font-semibold text-gray-700 pt-2 border-t mt-4">Endereço Profissional</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1"><label htmlFor="cep" className="block text-sm font-medium text-gray-700 mb-1">CEP *</label><IMaskInput mask="00000-000" name="cep" id="cep" value={formData.cep} onAccept={(value: any) => handleChange({ target: { name: 'cep', value } } as any)} className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" placeholder="00000-000" required />{errors.cep && <p className="text-red-500 text-xs mt-1">{errors.cep}</p>}</div>
                <div className="sm:col-span-2">
                    <Select label="Estado" name="estado" value={formData.estado} onChange={handleChange} required>
                        <option value="">Selecione</option>
                        {estadosBrasileiros.map(e => <option key={e.sigla} value={e.sigla}>{e.nome}</option>)}
                    </Select>
                    {errors.estado && <p className="text-red-500 text-xs mt-1">{errors.estado}</p>}
                </div>
                <div className="sm:col-span-3"><Input label="Cidade" name="cidade" value={formData.cidade} onChange={handleChange} placeholder="Sua cidade" required />{errors.cidade && <p className="text-red-500 text-xs mt-1">{errors.cidade}</p>}</div>
                <div className="sm:col-span-2"><Input label="Logradouro" name="logradouro" value={formData.logradouro} onChange={handleChange} placeholder="Rua, Avenida, etc." required />{errors.logradouro && <p className="text-red-500 text-xs mt-1">{errors.logradouro}</p>}</div>
                <div className="sm:col-span-1"><Input label="Número" name="numero" value={formData.numero} onChange={handleChange} placeholder="123" required />{errors.numero && <p className="text-red-500 text-xs mt-1">{errors.numero}</p>}</div>
                <div className="sm:col-span-3"><Input label="Bairro" name="bairro" value={formData.bairro} onChange={handleChange} placeholder="Seu bairro" required />{errors.bairro && <p className="text-red-500 text-xs mt-1">{errors.bairro}</p>}</div>
                <div className="sm:col-span-3"><Input label="Complemento" name="complemento" value={formData.complemento} onChange={handleChange} placeholder="Sala, Andar, etc." /></div>
            </div>
        </div>
    );
};