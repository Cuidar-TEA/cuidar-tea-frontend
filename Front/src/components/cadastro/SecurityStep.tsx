import React, { useState } from 'react';
import { Input } from '../ui/FormElements';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface StepProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    errors: any;
}

export const SecurityStep: React.FC<StepProps> = ({ formData, handleChange, errors }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="space-y-4 animate-fade-in">
            <div className="text-center mb-4"><h2 className="text-xl font-semibold text-gray-800">Tópico 3: Segurança</h2><p className="text-sm text-gray-500">Crie seus dados de acesso</p></div>
            <div><Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />{errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}</div>
            <div className="relative">
                <Input label="Senha" name="senha" type={showPassword ? "text" : "password"} value={formData.senha} onChange={handleChange} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500"><>{showPassword ? <FaEyeSlash /> : <FaEye />}</></button>
            </div>
            {errors.senha && <p className="text-red-500 text-xs mt-1">{errors.senha}</p>}
            <div className="relative">
                <Input label="Confirmar Senha" name="confirmarSenha" type={showConfirmPassword ? "text" : "password"} value={formData.confirmarSenha} onChange={handleChange} required />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500"><>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</></button>
            </div>
            {errors.confirmarSenha && <p className="text-red-500 text-xs mt-1">{errors.confirmarSenha}</p>}
            <div className="flex items-start">
                <input type="checkbox" name="aceitoTermos" id="aceitoTermos" checked={formData.aceitoTermos} onChange={handleChange} className="h-4 w-4 mt-1 text-red-600 border-gray-300 rounded focus:ring-red-500" />
                <label htmlFor="aceitoTermos" className="ml-2 block text-sm text-gray-800">Aceito os <a href="#" className="text-red-600 underline">termos de serviço</a> e <a href="#" className="text-red-600 underline">política de privacidade</a>.</label>
            </div>
            {errors.aceitoTermos && <p className="text-red-500 text-xs mt-1">{errors.aceitoTermos}</p>}
        </div>
    );
};