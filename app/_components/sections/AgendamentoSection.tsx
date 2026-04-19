'use client'
import { useState } from "react";
import PacienteForm from "../forms/PacienteForm";
import Modal from "../modal/Modal";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from 'primereact/datatable'
import { Column } from "primereact/column";
import ColaboradorForm from "../forms/ColaboradorForm";
import AgendamentoForm from "../forms/AgendamentoForm";

export function AgendamentoSection() {
    const [isModalVisible, setModalVisible] = useState<boolean>(false)
    const [pesquisa, setPesquisa] = useState("");

    // Dados de exemplo
    const [dados] = useState([
        {paciente: 'Jamir Junior', procedimento: 'Limpeza', data: '20/05/2026', hora: '09:30'}
    ]);
    const handleModal = () => {
        setModalVisible(!isModalVisible)
    }
    return (
        <div className="flex flex-col flex-1">
            <h2 className="text-[1.5em] font-bold">Agendamento</h2>
            <div className="flex items-center mb-1">
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
                <Button style={{margin: 5}} label="Novo Agendamento" onClick={handleModal} />
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
    )
}