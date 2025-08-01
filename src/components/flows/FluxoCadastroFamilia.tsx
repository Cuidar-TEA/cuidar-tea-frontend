import { useState } from "react";
import { Link } from "react-router-dom";
import { useCadastroForm } from "../../hooks/useCadastroForm";
import { PersonalInfoStep } from "../cadastro/PersonalInfoStep";
import { PatientInfoStep } from "../cadastro/PatientInfoStep";
import { SecurityStep } from "../cadastro/SecurityStep";

const initialState = {
    nomeCompleto: "", telefone: "", cpf: "", email: "", senha: "", confirmarSenha: "", aceitoTermos: false,
    estado: "", cidade: "", cep: "", logradouro: "", numero: "", bairro: "", complemento: "",
    souResponsavel: false, nomePaciente: "", dataNascimentoPaciente: "", nivelTsaPaciente: "N_VEL_1", cpfPaciente: "",
};

export default function FluxoCadastroFamilia() {
  const [step, setStep] = useState(1);
  const { formData, errors, isLoading, apiError, handleChange, handleSubmit } = useCadastroForm(initialState);

  console.log("COMPONENTE RENDERIZOU. Etapa atual é:", step);


  const handleNext = () =>{
    console.log("--- Botão 'Próximo' foi clicado! ---");
    setStep(prev => (prev < 3 ? prev + 1 : prev));
  } 
  const handlePrev = () => setStep(prev => (prev > 1 ? prev - 1 : prev));
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      handleNext();
    } else {
      handleSubmit('familia');
    }
  };

  const StepIndicator = () => (
    <div className="flex justify-center items-center gap-6 mb-6">
      {[1, 2, 3].map(s => (<div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${ step === s ? 'bg-red-600 text-white scale-110' : 'bg-gray-200 text-gray-500' }`} >{s}</div>))}
    </div>
  );

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8">
      <StepIndicator />
      {apiError && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-4" role="alert"><span className="block sm:inline">{apiError}</span></div>}
      
      <form onSubmit={handleFormSubmit}>
        {step === 1 && <PersonalInfoStep formData={formData} handleChange={handleChange} errors={errors} />}
        {step === 2 && <PatientInfoStep formData={formData} handleChange={handleChange} errors={errors} />}
        {step === 3 && <SecurityStep formData={formData} handleChange={handleChange} errors={errors} />}
        
        <div className="flex justify-between mt-8">
            <button type="button" onClick={handlePrev} disabled={isLoading || step === 1} className={`px-6 py-2 text-sm font-semibold rounded-lg transition-opacity duration-300 ${step === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>Anterior</button>
            <button type="submit" disabled={isLoading} className="px-6 py-2 text-sm font-semibold bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-colors duration-300 flex items-center justify-center disabled:opacity-50 w-36 h-10">{isLoading ? (<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>) : (step === 3 ? 'Finalizar Cadastro' : 'Próximo')}</button>
        </div>
      </form>
       <p className="text-xs text-center text-gray-500 mt-6">
        {/* Corrigir Login para redirecionamento correto */}
        Já tem uma conta? <Link to="/login" className="font-semibold text-red-600 hover:underline">Faça login</Link>
      </p>
    </div>
  );
}