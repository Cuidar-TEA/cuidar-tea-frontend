import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import api from '../services/api';
import { Input } from '../components/ui/FormElements';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await api.post('/usuarios/login', {
                email,
                senha,
            });

            if (response.data.data.token) {
                const { token, tipoUsuario } = response.data.data;
                
                // Salvar dados no localStorage
                localStorage.setItem('authToken', token);
                localStorage.setItem('userType', tipoUsuario);
                
                // Disparar evento para notificar outros componentes sobre mudança de auth
                window.dispatchEvent(new Event('authChanged'));
                
                toast.success('Login realizado com sucesso! Redirecionando...');
                
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1500);

            } else {
                toast.error("Resposta inesperada do servidor. Token não encontrado.");
                setIsLoading(false);
            }
        } catch (err: any) {
            if (err.response && (err.response.status === 401 || err.response.status === 404)) {
                toast.error("Email ou senha inválidos.");
            } else {
                toast.error("Ocorreu um erro no servidor. Tente novamente mais tarde.");
            }
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Bem-vindo de volta!</h1>
                    <p className="text-gray-600 mt-1">Acesse sua conta para continuar</p>
                </div>
                <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Email" name="email" type="email" value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            placeholder="seu@email.com" required
                        />
                        <div className="relative">
                            <Input
                                label="Senha" name="senha" type={showPassword ? "text" : "password"}
                                value={senha} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
                                placeholder="••••••••" required
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-500 hover:text-gray-700">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Lembrar de mim</label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-red-600 hover:text-red-500">Esqueceu a senha?</a>
                            </div>
                        </div>
                        <div>
                            <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50">
                                {isLoading ? 'Entrando...' : 'Entrar'}
                            </button>
                        </div>
                    </form>
                    <p className="text-sm text-center text-gray-500 mt-8">
                        Não tem uma conta?{' '}
                        <a href="/cadastro" className="font-semibold text-red-600 hover:text-red-500">
                            Cadastre-se
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}