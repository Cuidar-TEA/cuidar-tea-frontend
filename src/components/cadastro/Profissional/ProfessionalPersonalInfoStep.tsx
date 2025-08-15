import React from 'react';
import { IMaskInput } from 'react-imask';
import { Input } from '../../ui/FormElements';

interface StepProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    errors: any;
}

export const ProfessionalPersonalInfoStep: React.FC<StepProps> = ({ formData, handleChange, errors }) => {
    return (
        <div className="space-y-4 animate-fade-in">
            <div className="text-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Tópico 1: Pessoal</h2>
                <p className="text-sm text-gray-500">Suas informações pessoais</p>
            </div>
            <div>
                <Input label="Nome completo" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} placeholder="Seu nome completo" required />
                {errors.nomeCompleto && <p className="text-red-500 text-xs mt-1">{errors.nomeCompleto}</p>}
            </div>
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
        </div>
    );
};