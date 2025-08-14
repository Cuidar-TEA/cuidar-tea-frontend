import { useState } from "react";
// import { Link } from "react-router-dom"; // Não está sendo usado
import { useCadastroForm } from "../../hooks/useCadastroForm";
import { PersonalInfoStep } from "../cadastro/Paciente/PersonalInfoStep";
import { PatientInfoStep } from "../cadastro/Paciente/PacienteInfoStep";
import { SecurityStep } from "../cadastro/SecurityStep";
import { SuccessStep } from "../cadastro/SuccessStep";

const initialState = {
    nomeCompleto: "", telefone: "", cpf: "", email: "", senha: "", confirmarSenha: "", aceitoTermos: false,
    estado: "", cidade: "", cep: "", logradouro: "", numero: "", bairro: "", complemento: "",
    souResponsavel: false, nomePaciente: "", dataNascimentoPaciente: "", nivelTsaPaciente: "N_VEL_1", cpfPaciente: "",
};

export default function FluxoCadastroFamilia() {
  const [step, setStep] = useState(1);
  const { formData, errors, isLoading, isSuccess, handleChange, handleSubmit } = useCadastroForm(initialState);

  const handleNext = () => setStep(prev => (prev < 3 ? prev + 1 : prev));
  const handlePrev = () => setStep(prev => (prev > 1 ? prev - 1 : prev));
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      handleNext();
    } else {
      handleSubmit();
    }
  };

  const StepIndicator = () => (
    <div className="flex justify-center items-center gap-6 mb-6">
      {[1, 2, 3].map(s => (<div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${ step === s ? 'bg-red-600 text-white scale-110' : 'bg-gray-200 text-gray-500' }`} >{s}</div>))}
    </div>
  );

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8">
      {isSuccess ? <SuccessStep /> : (
        <>
          <StepIndicator />
          <form onSubmit={handleFormSubmit}>
            {step === 1 && <PersonalInfoStep formData={formData} handleChange={handleChange} errors={errors} />}
            {step === 2 && <PatientInfoStep formData={formData} handleChange={handleChange} errors={errors} />}
            {step === 3 && <SecurityStep formData={formData} handleChange={handleChange} errors={errors} />}
            
            <div className="flex justify-between mt-8">
                <button type="button" onClick={handlePrev} disabled={isLoading || step === 1} className={`px-6 py-2 text-sm font-semibold rounded-lg transition-opacity duration-300 ${step === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>Anterior</button>
                <button type="submit" disabled={isLoading} className="px-6 py-2 text-sm font-semibold bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-colors duration-300 flex items-center justify-center disabled:opacity-50 w-36 h-10">{isLoading ? ('Carregando...') : (step === 3 ? 'Finalizar Cadastro' : 'Próximo')}</button>
            </div>
          </form>
        </>
      )}
      <p className="text-xs text-center text-gray-500 mt-6">
        Já tem uma conta? <a href="/login" className="font-semibold text-red-600 hover:underline">Faça login</a>
      </p>
    </div>
  );
}