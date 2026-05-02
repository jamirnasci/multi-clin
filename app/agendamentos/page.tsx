'use client'

import { useEffect, useState } from "react";
import AgendamentoForm from "../_components/forms/AgendamentoForm";
import Modal from "../_components/modal/Modal";
import SideBar from "../_components/sidebar/SideBar";
import { IPaciente } from "@/src/types/IPaciente";

export default function AgendamentosPage() {
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [pesquisa, setPesquisa] = useState("");

    // Dados de exemplo
    const [dados] = useState([
        { id: 1, paciente: 'Jamir Junior', procedimento: 'Limpeza', data: '20/05/2026', hora: '09:30' }
    ]);

    const handleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // Lógica de filtro simples para a tabela
    const dadosFiltrados = dados.filter(item => 
        item.paciente.toLowerCase().includes(pesquisa.toLowerCase()) ||
        item.procedimento.toLowerCase().includes(pesquisa.toLowerCase())
    );

    return (
        <section className="flex flex-row min-h-screen bg-gray-50">
            <SideBar />
            
            <div className="flex-1 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Agendamentos</h2>
                
                <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                    {/* Campo de Pesquisa Customizado */}
                    <div className="relative flex-1 w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Pesquisar por paciente ou procedimento..."
                            value={pesquisa}
                            onChange={(e) => setPesquisa(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                        />
                    </div>

                    <button 
                        onClick={handleModal}
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Novo Agendamento
                    </button>
                </div>

                {/* TABELA CUSTOMIZADA */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Paciente</th>
                                    <th className="px-6 py-4 font-semibold">Procedimento</th>
                                    <th className="px-6 py-4 font-semibold">Data</th>
                                    <th className="px-6 py-4 font-semibold">Hora</th>
                                    <th className="px-6 py-4 font-semibold text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {dadosFiltrados.length > 0 ? (
                                    dadosFiltrados.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{item.paciente}</td>
                                            <td className="px-6 py-4">{item.procedimento}</td>
                                            <td className="px-6 py-4">{item.data}</td>
                                            <td className="px-6 py-4">{item.hora}</td>
                                            <td className="px-6 py-4 text-center">
                                                <button 
                                                    onClick={() => console.log(item)}
                                                    className="text-blue-600 hover:text-blue-900 font-medium px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
                                                >
                                                    Abrir
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                                            Nada encontrado
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {isModalVisible && (
                    <Modal 
                        title="Cadastrar Agendamento" 
                        Node={<AgendamentoForm />} 
                        setModalVisible={setModalVisible} 
                    />
                )}
            </div>
        </section>
    );
}