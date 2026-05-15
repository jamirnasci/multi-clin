'use client'
import { useState } from "react";
import Modal from "../../_components/modal/Modal";
import SideBar from "../../_components/sidebar/SideBar";
import { IUsuario } from "@/src/types/IUsuario";
import UsuarioForm from "../../_components/forms/UsuarioForm";
import { useUsuarios } from "@/src/hooks/useUsuarios";
import { useSession } from "next-auth/react";
import { data } from "autoprefixer";

export default function UsuarioPage() {
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [modalMode, setModalMode] = useState<'create' | 'update'>('create')
    const [selectedUsuario, setSelectedUsuario] = useState<IUsuario | null>(null)
    const {usuarios, error, loading} = useUsuarios()
    const [pesquisa, setPesquisa] = useState("");

    const handleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const dadosFiltrados = usuarios.filter(item => 
        item.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
        item.email.toLowerCase().includes(pesquisa.toLowerCase())
    );

    return (
        <section className="flex flex-row min-h-screen bg-gray-50">
            <SideBar />
            
            <div className="flex-1 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Usuários</h2>
                
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
                            placeholder="Pesquisar por nome ou e-mail..."
                            value={pesquisa}
                            onChange={(e) => setPesquisa(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all shadow-sm"
                        />
                    </div>

                    <button 
                        onClick={()=>{
                            setSelectedUsuario(null)
                            setModalMode('create')
                            handleModal()
                        }}
                        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Novo Usuário
                    </button>
                </div>

                {/* Tabela de Colaboradores */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Nome</th>
                                    <th className="px-6 py-4 font-semibold">Telefone</th>
                                    <th className="px-6 py-4 font-semibold">E-mail</th>
                                    <th className="px-6 py-4 font-semibold">Tipo</th>
                                    <th className="px-6 py-4 font-semibold text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {dadosFiltrados.length > 0 ? (
                                    dadosFiltrados.map((user, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{user.nome}</td>
                                            <td className="px-6 py-4">{user.telefone}</td>
                                            <td className="px-6 py-4">{user.email}</td>
                                            <td className="px-6 py-4">{user.role}</td>
                                            <td className="px-6 py-4 text-center">
                                                <button 
                                                    onClick={() =>{
                                                        setSelectedUsuario(user)
                                                        setModalMode('update')
                                                        handleModal()
                                                    }}
                                                    className="text-blue-600 hover:text-blue-900 font-medium px-4 py-1.5 rounded-md hover:bg-blue-50 transition-colors"
                                                >
                                                    Abrir
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-10 text-center text-gray-400">
                                            Nenhum usuário encontrado.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {isModalVisible && (
                    <Modal 
                        title={modalMode === 'create' ? 'Cadastrar Usuário' : 'Atualizar Usuário'}
                        Node={<UsuarioForm mode={modalMode} selectedUsuario={selectedUsuario}/>} 
                        setModalVisible={setModalVisible} 
                    />
                )}
            </div>
        </section>
    );
}