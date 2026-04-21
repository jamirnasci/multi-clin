'use client'
import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from 'primereact/datatable'
import { Column } from "primereact/column";
import AgendamentoForm from "../_components/forms/AgendamentoForm";
import Modal from "../_components/modal/Modal";
import SideBar from "../_components/sidebar/SideBar";

export default function AgendamentosPage() {
    const [isModalVisible, setModalVisible] = useState<boolean>(false)
    const [pesquisa, setPesquisa] = useState("");

    // Dados de exemplo
    const [dados] = useState([
        { paciente: 'Jamir Junior', procedimento: 'Limpeza', data: '20/05/2026', hora: '09:30' }
    ]);
    const handleModal = () => {
        setModalVisible(!isModalVisible)
    }
    return (
        <section className="flex flex-row flex-1">
            <SideBar />
            <div className="flex-1">
                <h2 className="text-[1.5em] font-bold p-2">Agendamento</h2>
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
                    <Button style={{ marginLeft: 5 }} label="Novo Agendamento" onClick={handleModal} />
                </div>
                {/* TABELA SIMPLES */}
                <DataTable value={dados} globalFilter={pesquisa} emptyMessage="Nada encontrado">
                    <Column field="paciente" header="Paciente" />
                    <Column field="procedimento" header="Procedimento" />
                    <Column field="data" header="Data" />
                    <Column field="hora" header="Hora" />

                    {/* Coluna de ação simplificada */}
                    <Column header="Ações" body={(rowData) => (
                        <div className="flex gap-2">
                            <Button label="Abrir" className="p-button-sm p-button-info" onClick={() => console.log(rowData)} />
                        </div>
                    )} />
                </DataTable>
                {isModalVisible ? <Modal title="Cadastrar Agendamento" Node={<AgendamentoForm />} setModalVisible={setModalVisible} /> : null}
            </div>
        </section>
    )
}