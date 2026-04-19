'use client'
import { useState } from "react";
import PacienteForm from "../forms/PacienteForm";
import Modal from "../modal/Modal";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from 'primereact/datatable'
import { Column } from "primereact/column";
import ColaboradorForm from "../forms/ColaboradorForm";
import ProcedimentoForm from "../forms/ProcedimentoForm";

export function ProcedimentoSection() {
    const [isModalVisible, setModalVisible] = useState<boolean>(false)
    const [pesquisa, setPesquisa] = useState("");

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    };

    const valorTemplate = (rowData: any) => {
        return formatCurrency(rowData.valorPadrao);
    };

    // Dados de exemplo
    const [dados] = useState([
        { nome: "João Silva", duracao: '91983744455', valorPadrao: 100 },
        { nome: "Maria Oliveira", duracao: '91983744455', valorPadrao: 200 },
        { nome: "Carlos Souza", duracao: '91983744455', valorPadrao: 300 },
    ]);
    const handleModal = () => {
        setModalVisible(!isModalVisible)
    }
    return (
        <div className="flex flex-col flex-1">
            <h2 className="text-[1.5em] font-bold">Procedimento</h2>
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
                <Button style={{ margin: 5 }} label="Novo Procedimento" onClick={handleModal} />
            </div>
            {/* TABELA SIMPLES */}
            <DataTable value={dados} globalFilter={pesquisa} emptyMessage="Nada encontrado">
                <Column field="nome" header="Nome" />
                <Column field="duracao" header="Duração" />
                <Column field="valorPadrao" header="Valor Padrão" body={valorTemplate}/>

                {/* Coluna de ação simplificada */}
                <Column header="Ações" body={(rowData) => (
                    <div className="flex gap-2">
                        <Button label="Abrir" className="p-button-sm p-button-info" onClick={() => console.log(rowData)} />
                    </div>
                )} />
            </DataTable>
            {isModalVisible ? <Modal title="Cadastrar Procedimento" Node={<ProcedimentoForm />} setModalVisible={setModalVisible} /> : null}
        </div>
    )
}