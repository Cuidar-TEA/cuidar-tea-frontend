import { useState, useEffect } from 'react';
import { z, type ZodIssue } from 'zod';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import axios from 'axios';
import api from '../services/api';
import { toast } from 'react-toastify';

const familiaSchema = z.object({
  nomeCompleto: z.string().min(3, "Nome deve ter no mínimo 3 caracteres."),
  telefone: z.string().refine(tel => tel.replace(/\D/g, '').length >= 10, "Telefone inválido."),
  //cpf: z.string().min(11, "cpf deve ter 11 digitos"),
  cpf: z.string().refine(cpf => cpfValidator.isValid(cpf), "CPF do responsável inválido."),
  cep: z.string().refine(cep => cep.replace(/\D/g, '').length === 8, "CEP inválido."),
  logradouro: z.string().min(1, "Logradouro é obrigatório."),
  numero: z.string().min(1, "Número é obrigatório."),
  bairro: z.string().min(1, "Bairro é obrigatório."),
  cidade: z.string().min(1, "Cidade é obrigatória."),
  estado: z.string().min(2, "Estado é obrigatório."),
  nomePaciente: z.string(),
  cpfPaciente: z.string(),
  dataNascimentoPaciente: z.string().min(1, "Data de nascimento é obrigatória."),
  email: z.string().email("Email inválido."),
  senha: z.string().min(8, "A senha deve ter no mínimo 8 caracteres."),
  confirmarSenha: z.string(),
  aceitoTermos: z.boolean().refine(aceito => aceito === true, "Você deve aceitar os termos."),
  souResponsavel: z.boolean(),
  complemento: z.string().optional(),
  nivelTsaPaciente: z.string(),
}).superRefine((data, ctx) => {
    if (data.senha !== data.confirmarSenha) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "As senhas não correspondem.", path: ["confirmarSenha"] });
    }
    if (!data.souResponsavel) {
        if (data.nomePaciente.trim().length < 3) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Nome do paciente é obrigatório.", path: ["nomePaciente"] });
        }
        if (data.cpfPaciente && !cpfValidator.isValid(data.cpfPaciente)) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "CPF do paciente inválido.", path: ["cpfPaciente"] });
        }
    }
});

type FormData = z.infer<typeof familiaSchema>;
type ErrorData = Partial<Record<keyof FormData, string>>;

export function useCadastroForm(initialState: FormData) {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<ErrorData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const cep = formData.cep.replace(/\D/g, '');
    if (cep.length === 8) {
      axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => {
          if (!response.data.erro) {
            setFormData((prev: FormData) => ({ ...prev, logradouro: response.data.logradouro, bairro: response.data.bairro, cidade: response.data.localidade, estado: response.data.uf, }));
          }
        })
        .catch(console.error);
    }
  }, [formData.cep]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = (target: EventTarget): target is HTMLInputElement => 'checked' in target;
    setFormData((prev: FormData) => ({ ...prev, [name]: isCheckbox(e.target) && type === 'checkbox' ? e.target.checked : value, }));
  };
  
  const validateAll = () => {
    const dataToValidate = { ...formData };
    if (formData.souResponsavel) {
      dataToValidate.nomePaciente = dataToValidate.nomeCompleto;
      dataToValidate.cpfPaciente = dataToValidate.cpf;
    }
    const result = familiaSchema.safeParse(dataToValidate);
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
      toast.error("Existem erros no formulário. Verifique os campos em vermelho.");
      return;
    }
    
    setIsLoading(true);

    const eTitular = formData.souResponsavel;
    const payload = {
        email: formData.email, senha: formData.senha, e_titular: eTitular,
        nome_titular: !eTitular ? formData.nomeCompleto : undefined,
        nome_paciente: eTitular ? formData.nomeCompleto : formData.nomePaciente,
        cpf: eTitular ? formData.cpf.replace(/\D/g, '') : formData.cpfPaciente.replace(/\D/g, ''),
        data_nascimento: formData.dataNascimentoPaciente, nivel_tea: formData.nivelTsaPaciente,
        telefone: { ddd: formData.telefone.replace(/\D/g, '').substring(0, 2), numero: formData.telefone.replace(/\D/g, '').substring(2), tipo: 'CELULAR' },
        endereco: { cep: formData.cep.replace(/\D/g, ''), logradouro: formData.logradouro, numero: formData.numero, bairro: formData.bairro, cidade: formData.cidade, estado: formData.estado, complemento: formData.complemento },
    };

    try {
      const response = await api.post('/usuarios/criarContaFamilia', payload);
      if (response.status === 201) {
        setIsSuccess(true);
      }
    } catch (err: any) {
      if (err.response?.status === 409) { toast.error(err.response.data.message); }
      else if (err.response?.status === 400) { toast.error("Dados inválidos. Verifique os campos e tente novamente."); }
      else { toast.error("Ocorreu um erro inesperado. Tente novamente mais tarde."); }
    } finally {
      setIsLoading(false);
    }
  };

  return { formData, errors, isLoading, isSuccess, handleChange, handleSubmit };
}