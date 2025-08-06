import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

export const SuccessStep = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-4 animate-fade-in">
            <FaCheckCircle className="text-green-500 text-6xl mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Cadastro Realizado!</h2>
            <p className="text-gray-600 mb-6">
                Sua conta foi criada com sucesso. Agora você já pode fazer o login na plataforma.
            </p>
            <Link 
                to="/login" 
                className="w-full max-w-xs px-6 py-3 text-sm font-semibold bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-colors duration-300"
            >
                Ir para o Login
            </Link>
        </div>
    );
};