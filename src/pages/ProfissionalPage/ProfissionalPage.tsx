import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import BlocoProfissional from './BlocoProfissional';
import BlocoSobreLocalizacaoAvaliacoes from './BlocoSobreLocalizacaoAvaliacoes';
import BlocoAgendamento from './BlocoAgendamento';

const ProfissionalPage: React.FC = () => {
    const location = useLocation();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    console.log('ProfissionalPage carregada - ID:', id);
    console.log('Location state:', location.state);
    
    // Pega os dados do profissional passados via state
    const profissionalData = location.state?.profissional;
    
    console.log('🆔 Dados do profissional:', {
        profissionalData_id: profissionalData?.id_profissional,
        url_id: id
    });

    // Se não há dados passados via state, você pode fazer uma busca por ID aqui
    if (!profissionalData) {
        return (
            <div className="bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-gray-600">Carregando dados do profissional...</p>
                        <p className="text-sm text-gray-400">ID: {id}</p>
                    </div>
                </div>
            </div>
        );
    }

    // Converte os dados da API para o formato esperado pelo BlocoProfissional
    const profissionalFormatado = {
        id: profissionalData.id_profissional.toString(),
        nome: profissionalData.nome,
        enderecos_id_endereco: profissionalData.enderecos_id_endereco,
        especialidade: `${profissionalData.tipo_registro} ${profissionalData.numero_registro}`,
        avaliacao: profissionalData.agendamentos.length > 0 
            ? profissionalData.agendamentos.reduce((acc: number, ag: any) => acc + (ag.nota_atendimento || 0), 0) / profissionalData.agendamentos.length 
            : 0,
        totalAvaliacoes: profissionalData.agendamentos.length,
        preco: parseFloat(profissionalData.valor_consulta) || 0,
        foto: profissionalData.foto_perfil_url || '',
        especialidades: profissionalData.profissional_especialidades.map((pe: any) => pe.especialidades.nome_especialidade),
        descricao: profissionalData.descricao || '',
        cidade: profissionalData.enderecos?.cidade || '',
        estado: profissionalData.enderecos?.estado || '',
        aceita_convenio: profissionalData.aceita_convenio || false,
        atende_domicilio: profissionalData.atende_domicilio === 1,
        endereco: {
            logradouro: profissionalData.enderecos?.logradouro || '',
            numero: profissionalData.enderecos?.numero || '',
            bairro: profissionalData.enderecos?.bairro || '',
            cep: profissionalData.enderecos?.cep || '',
            complemento: profissionalData.enderecos?.complemento || ''
        }
    };

    // Dados específicos para o BlocoSobreLocalizacaoAvaliacoes
    const dadosDetalhados = {
        id: profissionalData.id_profissional.toString(),
        nome: profissionalData.nome,
        descricao: profissionalData.descricao || '',
        cidade: profissionalData.enderecos?.cidade || '',
        estado: profissionalData.enderecos?.estado || '',
        endereco: {
            logradouro: profissionalData.enderecos?.logradouro || '',
            numero: profissionalData.enderecos?.numero || '',
            bairro: profissionalData.enderecos?.bairro || '',
            cep: profissionalData.enderecos?.cep || '',
            complemento: profissionalData.enderecos?.complemento || ''
        },
        agendamentos: profissionalData.agendamentos || []
    };

    return (
        <div className="bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                {/* Botão de voltar */}
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                    <FaArrowLeft className="mr-2" />
                    Voltar
                </button>
                
                <BlocoProfissional profissional={profissionalFormatado} />
                <BlocoSobreLocalizacaoAvaliacoes profissional={dadosDetalhados} />
                <BlocoAgendamento profissional={profissionalFormatado} />
            </div>
        </div>
    );
};

export default ProfissionalPage;