'use client'
import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { IProcedimento } from "@/src/types/IProcedimento";
import Modal from "../_components/modal/Modal";
import SideBar from "../_components/sidebar/SideBar";
import PagamentoForm from "../_components/forms/PagamentoForm";

export default function ProcedimentoPage() {
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [pesquisa, setPesquisa] = useState("");
    const [dataFiltro, setDataFiltro] = useState("");
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
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    };

    const handleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // Filtro manual (Nome do paciente ou critério de pesquisa)
    const dadosFiltrados = procedimentos.filter(item =>
        item.nome.toLowerCase().includes(pesquisa.toLowerCase())
    );

    return (
        <section className="flex flex-row min-h-screen bg-gray-50">
            <SideBar />

            <div className="flex-1 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Pagamentos</h2>

                {/* ÁREA DE BUSCA */}
                <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                    <div className="flex flex-1 gap-3 items-center w-full">

                        {/* Input de Pesquisa */}
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Paciente..."
                                value={pesquisa}
                                onChange={(e) => setPesquisa(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>

                        {/* Input de Data Nativo */}
                        <div className="relative">
                            <input
                                type="date"
                                value={dataFiltro}
                                onChange={(e) => setDataFiltro(e.target.value)}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-gray-700"
                            />
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setModalMode('create');
                            handleModal();
                        }}
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                    >
                        Buscar
                    </button>
                </div>

                {/* TABELA CUSTOMIZADA */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Paciente</th>
                                    <th className="px-6 py-4 font-semibold">Valor</th>
                                    <th className="px-6 py-4 font-semibold">Método</th>
                                    <th className="px-6 py-4 font-semibold text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {dadosFiltrados.length > 0 ? (
                                    dadosFiltrados.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{item.nome}</td>
                                            <td className="px-6 py-4 text-green-600 font-semibold">
                                                {formatCurrency(item.valorPadrao)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 bg-gray-100 rounded text-xs uppercase font-medium">
                                                    {/* Exemplo de dado fixo vindo do seu tipo */}
                                                    Pix
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center gap-3">
                                                    <button
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
                                                        onClick={() => console.log(item)}
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
                                        <td colSpan={4} className="px-6 py-10 text-center text-gray-400 italic">
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
                        title={modalMode === 'update' ? 'Atualizar Pagamento' : 'Cadastrar Pagamento'}
                        Node={<PagamentoForm />}
                        setModalVisible={setModalVisible}
                    />
                )}
            </div>
        </section>
    );
}