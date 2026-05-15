'use client'
import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { IProcedimento } from "@/src/types/IProcedimento";
import ProcedimentoForm from "../_components/forms/ProcedimentoForm";
import Modal from "../_components/modal/Modal";
import SideBar from "../_components/sidebar/SideBar";

export default function ProcedimentoPage() {
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [pesquisa, setPesquisa] = useState("");
    const [modalMode, setModalMode] = useState("create");
    const [procedimentos, setProcedimentos] = useState<IProcedimento[]>([]);
    const [selectedProcedimento, setSelectedProcedimento] = useState<IProcedimento | null>(null);

    useEffect(() => {
        const loadProcedimentos = async () => {
            const result = await fetch('/api/procedimentos');
            const obj = await result.json();
            setProcedimentos(obj);
        }
        loadProcedimentos();
    }, []);

    const formatCurrency = (value: number) => {
        return 'R$ ' + value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    };

    const handleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // Lógica de filtro para substituir o globalFilter do DataTable
    const procedimentosFiltrados = procedimentos.filter(item =>
        item.nome.toLowerCase().includes(pesquisa.toLowerCase())
    );

    return (
        <section className="flex flex-row min-h-screen bg-gray-50">
            <SideBar />

            <div className="flex-1 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Procedimentos</h2>

                <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                    {/* Barra de Pesquisa Customizada */}
                    <div className="relative flex-1 w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Pesquisar procedimento..."
                            value={pesquisa}
                            onChange={(e) => setPesquisa(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all shadow-sm"
                        />
                    </div>

                    <button
                        onClick={() => {
                            setModalMode('create');
                            setSelectedProcedimento(null);
                            handleModal();
                        }}
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Novo Procedimento
                    </button>
                </div>

                {/* Tabela de Procedimentos */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Nome</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Duração</th>
                                    <th className="px-6 py-4 font-semibold text-gray-700">Valor Padrão</th>
                                    <th className="px-6 py-4 font-semibold text-center text-gray-700">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {procedimentosFiltrados.length > 0 ? (
                                    procedimentosFiltrados.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{item.nome}</td>
                                            <td className="px-6 py-4">{item.duracao} min</td>
                                            <td className="px-6 py-4 font-semibold text-green-600">
                                                {formatCurrency(item.valorPadrao)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center gap-3">
                                                    <button
                                                        title="Editar"
                                                        onClick={() => {
                                                            setModalMode('update');
                                                            setSelectedProcedimento(item);
                                                            handleModal();
                                                        }}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    >
                                                        <BsPencilSquare size={18} />
                                                    </button>
                                                    <button
                                                        title="Excluir"
                                                        onClick={() => console.log('Excluir:', item)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <MdDeleteOutline size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-gray-400 italic bg-white">
                                            Nenhum procedimento encontrado.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {isModalVisible && (
                    <Modal
                        title={modalMode === 'update' ? 'Atualizar Procedimento' : 'Cadastrar Procedimento'}
                        Node={<ProcedimentoForm mode={modalMode} selectedProcedimento={selectedProcedimento} />}
                        setModalVisible={setModalVisible}
                    />
                )}
            </div>
        </section>
    );
}