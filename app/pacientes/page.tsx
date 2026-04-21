
'use client'
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from 'primereact/datatable'
import { Column } from "primereact/column";
import { IPaciente } from "@/src/types/IPaciente";
import { MdDeleteOutline } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import PacienteForm from "../_components/forms/PacienteForm";
import Modal from "../_components/modal/Modal";
import SideBar from "../_components/sidebar/SideBar";

export default function PacientesPage() {
    const [isModalVisible, setModalVisible] = useState<boolean>(false)
    const [pesquisa, setPesquisa] = useState("");
    const [modalMode, setModalMode] = useState("create");
    const [selectedPaciente, setSelectedPaciente] = useState<IPaciente | null>(null)
    // Dados de exemplo
    const [pacientes, setPacientes] = useState<Partial<IPaciente>[]>([]);
    useEffect(() => {
        const loadPacientes = async () => {
            const result = await fetch('/api/pacientes')
            const obj = await result.json()
            setPacientes(obj)
        }
        loadPacientes()
    }, [])
    const handleModal = () => {
        setModalVisible(!isModalVisible)
    }
    const deletePaciente = async (paciente: IPaciente) => {
        console.log(paciente)
        if (confirm(`Deseja remover o cliente ${paciente.nome} ? `)) {
            const result = await fetch(`/api/pacientes/${paciente.idpaciente}`, {
                method: 'DELETE'
            })
            const obj = await result.json()
            alert(obj.msg)
            setPacientes(prev => prev.filter(p => p.idpaciente !== paciente.idpaciente))
        }
        setSelectedPaciente(null)
    }
    return (
        <section className="flex flex-row flex-1">
            <SideBar />
            <div className="content flex-1">


                <h2 className="text-[1.5em] font-bold p-2">Paciente</h2>
                <div className="flex items-center mb-1 p-2">
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-search"></i>
                        </span>
                        <InputText
                            placeholder="Pesquisar..."
                            value={pesquisa}
                            onChange={(e) => setPesquisa(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <Button className="p-button" style={{marginLeft: 5}} label="Novo Paciente" onClick={() => {
                        setModalMode('create')
                        setSelectedPaciente(null)
                        handleModal()
                    }} />
                </div>
                <DataTable value={pacientes} globalFilter={pesquisa} emptyMessage="Nada encontrado">
                    <Column field="nome" header="Nome" />
                    <Column field="cpf" header="CPF" />
                    <Column field="cidade" header="Cidade" />

                    <Column header="Ações" body={(rowData) => (
                        <div className="flex gap-2">
                            <Button className="p-button-sm" onClick={() => {
                                setModalMode('update')
                                setSelectedPaciente(rowData)
                                handleModal()
                            }}>
                                <BsPencilSquare size={20} />
                            </Button>
                            <Button className="p-button-sm p-button" severity="danger" onClick={() => {
                                deletePaciente(rowData)
                            }}>
                                <MdDeleteOutline size={20} />
                            </Button>
                        </div>
                    )} />
                </DataTable>
                {isModalVisible ? <Modal title={modalMode == 'update' ? 'Atualizar Paciente' : 'Cadastrar Paciente'} Node={<PacienteForm mode={modalMode} selectedPaciente={selectedPaciente} />} setModalVisible={setModalVisible} /> : null}
            </div>
        </section>
    )
}