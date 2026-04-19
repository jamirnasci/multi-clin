'use client'
import { useState } from "react";
import PacienteForm from "../forms/PacienteForm";
import Modal from "../modal/Modal";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from 'primereact/datatable'
import { Column } from "primereact/column";
import ColaboradorForm from "../forms/ColaboradorForm";

export function ColaboradorSection() {
    const [isModalVisible, setModalVisible] = useState<boolean>(false)
    const [pesquisa, setPesquisa] = useState("");

    // Dados de exemplo
    const [dados] = useState([
        { nome: "João Silva", telefone: '91983744455', email: "joao@gmail.com" },
        { nome: "Maria Oliveira", telefone: '91983744455', email: "maria@gmail.com" },
        { nome: "Carlos Souza", telefone: '91983744455', email: "carlos@gmail.com" },
    ]);
    const handleModal = () => {
        setModalVisible(!isModalVisible)
    }
    return (
        <div className="flex flex-col flex-1">
            <h2 className="text-[1.5em] font-bold">Colaborador</h2>
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
                <Button style={{margin: 5}} label="Novo Colaborador" onClick={handleModal} />
            </div>
            {/* TABELA SIMPLES */}
            <DataTable value={dados} globalFilter={pesquisa} emptyMessage="Nada encontrado">
                <Column field="nome" header="Nome" />
                <Column field="telefone" header="Telefone" />
                <Column field="email" header="E-mail" />

                {/* Coluna de ação simplificada */}
                <Column header="Ações" body={(rowData) => (
                    <div className="flex gap-2">
                        <Button label="Abrir" className="p-button-sm p-button-info" onClick={() => console.log(rowData)} />                        
                    </div>
                )} />
            </DataTable>
            {isModalVisible ? <Modal title="Cadastrar Colaborador" Node={<ColaboradorForm />} setModalVisible={setModalVisible} /> : null}
        </div>
    )
}