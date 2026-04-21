'use client'
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from 'primereact/datatable'
import { Column } from "primereact/column";
import { BsPencilSquare } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { IProcedimento } from "@/src/types/IProcedimento";
import ProcedimentoForm from "../_components/forms/ProcedimentoForm";
import Modal from "../_components/modal/Modal";
import SideBar from "../_components/sidebar/SideBar";

export default function ProcedimentoPage() {
    const [isModalVisible, setModalVisible] = useState<boolean>(false)
    const [pesquisa, setPesquisa] = useState("");
    const [modalMode, setModalMode] = useState("create");
    const [procedimentos, setProcedimentos] = useState<IProcedimento[]>([])
    const [selectedProcedimento, setSelectedProcedimento] = useState<IProcedimento | null>(null)

    useEffect(() => {
        const loadProcedimentos = async () => {
            const result = await fetch('/api/procedimentos')
            const obj = await result.json()
            setProcedimentos(obj)
        }
        loadProcedimentos()
    }, [])

    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    };

    const valorTemplate = (rowData: any) => {
        return formatCurrency(rowData.valorPadrao);
    };

    const handleModal = () => {
        setModalVisible(!isModalVisible)
    }
    return (
        <section className="flex flex-row flex-1">
            <SideBar/>
            <div className="flex-1">

                <h2 className="text-[1.5em] font-bold p-2">Procedimento</h2>
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
                    <Button style={{ marginLeft: 5 }} label="Novo Procedimento" onClick={handleModal} />
                </div>
                {/* TABELA SIMPLES */}
                <DataTable value={procedimentos} globalFilter={pesquisa} emptyMessage="Nada encontrado">
                    <Column field="nome" header="Nome" />
                    <Column field="duracao" header="Duração" />
                    <Column field="valorPadrao" header="Valor Padrão" body={valorTemplate} />

                    {/* Coluna de ação simplificada */}
                    <Column header="Ações" body={(rowData) => (
                        <div className="flex gap-2">
                            <Button className="p-button-sm" onClick={() => {
                                setModalMode('update')
                                setSelectedProcedimento(rowData)
                                handleModal()
                            }}>
                                <BsPencilSquare size={20} />
                            </Button>
                            <Button className="p-button-sm" severity="danger" onClick={() => console.log(rowData)}>
                                <MdDeleteOutline size={20} />
                            </Button>
                        </div>
                    )} />
                </DataTable>
                {isModalVisible ? <Modal title={modalMode == 'update' ? 'Atualizar Procedimento' : 'Cadastrar Procedimento'} Node={<ProcedimentoForm mode={modalMode} selectedProcedimento={selectedProcedimento} />} setModalVisible={setModalVisible} /> : null}
            </div>
        </section>
    )
}