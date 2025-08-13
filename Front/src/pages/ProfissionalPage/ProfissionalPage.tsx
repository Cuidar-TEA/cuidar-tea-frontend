import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import BlocoProfissional from './BlocoProfissional';
import BlocoSobreLocalizacaoAvaliacoes from './BlocoSobreLocalizacaoAvaliacoes';
import BlocoAgendamento from './BlocoAgendamento';
import api from '../../services/api'; 

const ProfissionalPage: React.FC = () => {
    const location = useLocation();
    const { id } = useParams<{ id: string }>();
    const [profissional, setProfissional] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfissional() {
            setLoading(true);
            try {
                const res = await api.get(`/api/profissionais/buscar`, {
                    params: { id_profissional: id }
                });
                setProfissional(res.data[0]); // supondo que retorna array
            } catch (err) {
                setProfissional(null);
            } finally {
                setLoading(false);
            }
        }
        if (id) fetchProfissional();
    }, [id]);

    if (loading) return <div>Carregando...</div>;
    if (!profissional) return <div className="bg-white p-6 rounded-xl shadow text-center">Profissional não encontrado.</div>;

    const agendamentosSeguros = profissional.agendamentos || [];

    const profissionalFormatado = {
        id: profissional.id_profissional.toString(),
        nome: profissional.nome,
        especialidade: `${profissional.tipo_registro} ${profissional.numero_registro}`,
        
        avaliacao: agendamentosSeguros.length > 0 
            ? agendamentosSeguros.reduce((acc: number, ag: any) => acc + (ag.nota_atendimento || 0), 0) / agendamentosSeguros.length 
            : 0,
        totalAvaliacoes: agendamentosSeguros.length,

        preco: parseFloat(profissional.valor_consulta) || 0,
        foto: profissional.foto_perfil_url || '',
        especialidades: Array.isArray(profissional.profissional_especialidades)
  ? profissional.profissional_especialidades.map((pe: any) => pe.especialidades.nome_especialidade)
  : [],
        descricao: profissional.descricao || '',
        cidade: profissional.enderecos?.cidade || '',
        estado: profissional.enderecos?.estado || '',
        aceita_convenio: profissional.aceita_convenio || false,
        atende_domicilio: profissional.atende_domicilio === 1,
        endereco: {
            logradouro: profissional.enderecos?.logradouro || '',
            numero: profissional.enderecos?.numero || '',
            bairro: profissional.enderecos?.bairro || '',
            cep: profissional.enderecos?.cep || '',
            complemento: profissional.enderecos?.complemento || ''
        }
    };





    // Dados específicos para o BlocoSobreLocalizacaoAvaliacoes
    const dadosDetalhados = {
        id: profissional.id_profissional.toString(),
        nome: profissional.nome,
        descricao: profissional.descricao || '',
        cidade: profissional.enderecos?.cidade || '',
        estado: profissional.enderecos?.estado || '',
        endereco: {
            logradouro: profissional.enderecos?.logradouro || '',
            numero: profissional.enderecos?.numero || '',
            bairro: profissional.enderecos?.bairro || '',
            cep: profissional.enderecos?.cep || '',
            complemento: profissional.enderecos?.complemento || ''
        },
        agendamentos: profissional.agendamentos || []
    };

    return (
        <>
           <div className="mt-10 ml-40 space-y-6">
                <BlocoProfissional profissional={profissionalFormatado} />
                <BlocoSobreLocalizacaoAvaliacoes profissional={dadosDetalhados} />
                <BlocoAgendamento profissional={profissionalFormatado} />
            </div>
            
        </>
    );
};

export default ProfissionalPage;