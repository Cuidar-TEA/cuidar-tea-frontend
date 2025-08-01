import React from 'react';
import Navbar from '../../components/layout/Navbar';
import BlocoProfissional from './BlocoProfissional';

const ProfissionalPage: React.FC = () => {
    // Dados mockados de um profissional para teste
    const profissionalMock = {
        id: '1',
        nome: 'Dra. Ana Beatriz Silva',
        especialidade: 'Psicóloga Clínica',
        avaliacao: 4.9,
        totalAvaliacoes: 127,
        preco: 150,
        foto: '',
        especialidades: [
            'TEA',
            'Terapia Cognitivo-Comportamental',
            'Avaliação Neuropsicológica'
        ]
    };

    return (
        <>
            <Navbar />
           <div className="mt-10 ml-40">
                <BlocoProfissional profissional={profissionalMock} />
            </div>
            
        </>
    );
};

export default ProfissionalPage;