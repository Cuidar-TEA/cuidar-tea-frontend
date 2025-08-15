import { useState, useEffect } from 'react';
import { z, type ZodIssue } from 'zod';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import axios from 'axios';
import api from '../../src/services/api';
import { toast } from 'react-toastify';

const profissionalSchema = z.object({
  nomeCompleto: z.string().min(3, "Nome deve ter no mínimo 3 caracteres."),
  telefone: z.string().refine(tel => tel.replace(/\D/g, '').length >= 10, "Telefone inválido."),
  //cpf: z.string().min(11, "cpf deve ter 11 digitos"),
  cpf: z.string().refine(cpf => cpfValidator.isValid(cpf), "CPF inválido."),
  profissao: z.string().min(1, "Profissão é obrigatória."),
  especialidade: z.string().min(1, "Especialidade é obrigatória."),
  numeroRegistro: z.string().min(1, "Número de registro é obrigatório."),
  tipoRegistro: z.string().min(1, "Tipo de registro é obrigatório."),
  ufRegistro: z.string().min(2, "UF do registro é obrigatória."),
  cep: z.string().refine(cep => cep.replace(/\D/g, '').length === 8, "CEP inválido."),
  logradouro: z.string().min(1, "Logradouro é obrigatório."),
  numero: z.string().min(1, "Número é obrigatório."),
  bairro: z.string().min(1, "Bairro é obrigatório."),
  cidade: z.string().min(1, "Cidade é obrigatória."),
  estado: z.string().min(2, "Estado é obrigatório."),
  complemento: z.string().optional(),
  email: z.string().email("Email inválido."),
  senha: z.string().min(8, "A senha deve ter no mínimo 8 caracteres."),
  confirmarSenha: z.string(),
  aceitoTermos: z.boolean().refine(aceito => aceito === true, "Você deve aceitar os termos."),
}).refine(data => data.senha === data.confirmarSenha, {
  message: "As senhas não correspondem.",
  path: ["confirmarSenha"],
});


type FormData = z.infer<typeof profissionalSchema>;
type ErrorData = Partial<Record<keyof FormData, string>>;

export function useProfissionalForm(initialState: FormData) {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<ErrorData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const cep = formData.cep?.replace(/\D/g, '');
    if (cep && cep.length === 8) {
      axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
          if (!response.data.erro) {
            setFormData(prev => ({ ...prev, logradouro: response.data.logradouro, bairro: response.data.bairro, cidade: response.data.localidade, estado: response.data.uf }));
          }
        })
        .catch(console.error);
    }
  }, [formData.cep]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = (target: EventTarget): target is HTMLInputElement => 'checked' in target;
    setFormData(prev => ({ ...prev, [name]: isCheckbox(e.target) && type === 'checkbox' ? e.target.checked : value }));
  };

  const validateAll = () => {
    const result = profissionalSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: ErrorData = {};
      result.error.issues.forEach((err: ZodIssue) => { if (err.path[0]) { fieldErrors[err.path[0] as keyof FormData] = err.message; } });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async () => {
    if (!validateAll()) {
      toast.error("Existem erros no formulário.");
      return;
    }
    setIsLoading(true);

    const payload = {
        email: formData.email, senha: formData.senha, nome: formData.nomeCompleto,
        cpf: formData.cpf.replace(/\D/g, ''),
        telefone: { ddd: formData.telefone.replace(/\D/g, '').substring(0, 2), numero: formData.telefone.replace(/\D/g, '').substring(2), tipo: 'COMERCIAL' },
        endereco: { cep: formData.cep.replace(/\D/g, ''), logradouro: formData.logradouro, numero: formData.numero, bairro: formData.bairro, cidade: formData.cidade, estado: formData.estado, complemento: formData.complemento },
        formacoes: [formData.profissao], especialidades: [formData.especialidade],
        numero_registro: formData.numeroRegistro, tipo_registro: formData.tipoRegistro, uf_registro: formData.ufRegistro,
    };
    try {
      const response = await api.post('/usuarios/criarContaProfissional', payload);
      if (response.status === 201) { 
        setIsSuccess(true);
      }
    } catch (err: any) {
      if (err.response?.status === 409) { toast.error(err.response.data.message); }
      else if (err.response?.status === 400) { toast.error("Dados inválidos."); }
      else { toast.error("Ocorreu um erro inesperado."); }
    } finally {
      setIsLoading(false);
    }
  };
  
  return { formData, errors, isLoading, isSuccess, handleChange, handleSubmit };
}