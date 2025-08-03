import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import BlocoProfissional from './BlocoProfissional';
import BlocoSobreLocalizacaoAvaliacoes from './BlocoSobreLocalizacaoAvaliacoes';

const ProfissionalPage: React.FC = () => {
    const location = useLocation();
    const { id } = useParams<{ id: string }>();
    
    // Pega os dados do profissional passados via state
    const profissionalData = location.state?.profissional;

    // Se não há dados passados via state, você pode fazer uma busca por ID aqui
    if (!profissionalData) {
        return (
            <>
                <Navbar />
                <div className="mt-10 ml-40 text-center">
                    <p className="text-gray-600">Carregando dados do profissional...</p>
                    <p className="text-sm text-gray-400">ID: {id}</p>
                </div>
            </>
        );
    }

    // Converte os dados da API para o formato esperado pelo BlocoProfissional
    const profissionalFormatado = {
        id: profissionalData.id_profissional.toString(),
        nome: profissionalData.nome,
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
        <>
            <Navbar />
           <div className="mt-10 ml-40">
                <BlocoProfissional profissional={profissionalFormatado} />
                <BlocoSobreLocalizacaoAvaliacoes profissional={dadosDetalhados} />
            </div>
            
        </>
    );
};

export default ProfissionalPage;