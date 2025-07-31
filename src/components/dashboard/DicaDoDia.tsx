import React from 'react';

export default function TipOfTheDay() {
    return (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg shadow-md h-full">
            <h3 className="font-bold text-gray-800 mb-2">Dica do Dia</h3>
            <h4 className="font-semibold text-blue-800 mb-2">Rotina Estruturada</h4>
            <p className="text-sm text-gray-700">
                Manter uma rotina consistente pode ajudar crianças com TEA a se sentirem mais seguras e organizadas.
            </p>
        </div>
    )
}