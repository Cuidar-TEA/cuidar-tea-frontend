import React from 'react';
import { Input, Select } from '../../ui/FormElements';
import { IMaskInput } from 'react-imask';

interface StepProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    errors: any;
}

export const PatientInfoStep: React.FC<StepProps> = ({ formData, handleChange, errors }) => {
    return (
        <div className="space-y-4 animate-fade-in">
            <div className="text-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Tópico 2: Paciente</h2>
                <p className="text-sm text-gray-500">Informações sobre o paciente</p>
            </div>

            <div>
                <Input 
                    label="Nome completo do Paciente" 
                    name="nomePaciente" 
                    value={formData.souResponsavel ? formData.nomeCompleto : formData.nomePaciente} 
                    onChange={handleChange} 
                    required={!formData.souResponsavel} 
                    disabled={formData.souResponsavel}
                    className="disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                {errors.nomePaciente && <p className="text-red-500 text-xs mt-1">{errors.nomePaciente}</p>}
            </div>

            <div>
                <label htmlFor="cpfPaciente" className="block text-sm font-medium text-gray-700 mb-1">CPF do Paciente *</label>
                <IMaskInput
                    mask="000.000.000-00"
                    name="cpfPaciente"
                    id="cpfPaciente"
                    value={formData.souResponsavel ? formData.cpf : formData.cpfPaciente}
                    onAccept={(value: any) => handleChange({ target: { name: 'cpfPaciente', value } } as any)}
                    disabled={formData.souResponsavel}
                    className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="000.000.000-00"
                    required={!formData.souResponsavel}
                />
                {errors.cpfPaciente && <p className="text-red-500 text-xs mt-1">{errors.cpfPaciente}</p>}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full">
                    <Input 
                        label="Data de nascimento do paciente" 
                        name="dataNascimentoPaciente" 
                        type="date" 
                        value={formData.dataNascimentoPaciente} 
                        onChange={handleChange} 
                        required 
                    />
                    {errors.dataNascimentoPaciente && <p className="text-red-500 text-xs mt-1">{errors.dataNascimentoPaciente}</p>}
                </div>
                <div className="w-full">
                    <Select 
                        label="Nível TEA" 
                        name="nivelTsaPaciente" 
                        value={formData.nivelTsaPaciente} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="N_VEL_1">Nível 1 - Apoio</option>
                        <option value="N_VEL_2">Nível 2 - Apoio Substancial</option>
                        <option value="N_VEL_3">Nível 3 - Apoio Muito Substancial</option>
                    </Select>
                </div>
            </div>
        </div>
    );
};