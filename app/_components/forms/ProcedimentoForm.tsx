'use client'
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel"; // Importação necessária
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { IProcedimento } from "@/src/types/IProcedimento";

export default function ProcedimentoForm() {
    const [form, setForm] = useState<Partial<IProcedimento>>({
        nome: '',
        duracao: 0,
        valorPadrao: 0,
        descricao: '',
        status: ''
    });

    const status = [
        { name: 'ATIVO' },
        { name: 'INATIVO' }
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleDropdownChange = (e: DropdownChangeEvent) => {
        setForm((prev) => ({ ...prev, status: e.value }));
    };

    const handleNumberChange = (name: string, value: number | null) => {
        setForm((prev) => ({ ...prev, [name]: value ?? 0 }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form);
    };

    return (
        <div className="flex justify-center items-center p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl w-full max-w-[900px] grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                <FloatLabel className="md:col-span-2">
                    <InputText id="nome" name="nome" value={form.nome} onChange={handleChange} className="w-full" />
                    <label htmlFor="nome">Nome</label>
                </FloatLabel>

                <FloatLabel>
                    <InputNumber id="valorPadrao" name="valorPadrao" value={form.valorPadrao} onChange={(e)=> handleNumberChange('valorPadrao', e.value)} className="w-full" />
                    <label htmlFor="valorPadrao">Valor Padrão</label>
                </FloatLabel>

                <FloatLabel>
                    <InputNumber id="duracao" name="duracao" value={form.duracao} onChange={(e)=> handleNumberChange('duracao', e.value)} className="w-full" />
                    <label htmlFor="duracao">Duração</label>
                </FloatLabel>
                <FloatLabel>
                    <Dropdown
                        id="status"
                        name="status"
                        onChange={handleDropdownChange}
                        value={form.status}
                        options={status}
                        className="w-full"
                        optionLabel="name"
                        optionValue="name"
                    />
                    <label htmlFor="status">Status</label>
                </FloatLabel>
                <FloatLabel className="col-span-full">
                    <InputTextarea
                        id="descricao"
                        name="descricao"
                        value={form.descricao}
                        onChange={handleChange}
                        rows={3}
                        className="w-full"
                    />
                    <label htmlFor="descricao">Descrição</label>
                </FloatLabel>
                <Button type="submit" label="Salvar Registro" icon="pi pi-check" className="col-span-full mt-4" />
            </form>
        </div>
    );
}