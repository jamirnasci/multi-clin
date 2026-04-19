'use client'
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel"; // Importação necessária
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

interface IColaborador {
    nome: string
    cpf: string
    email: string
    telefone: string
    status: string
}


export default function ColaboradorForm() {
    const [form, setForm] = useState<IColaborador>({
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
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
                    <InputText id="cpf" name="cpf" value={form.cpf} onChange={handleChange} className="w-full" />
                    <label htmlFor="cpf">CPF</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="telefone" name="telefone" value={form.telefone} onChange={handleChange} className="w-full" />
                    <label htmlFor="telefone">Telefone</label>
                </FloatLabel>

                <FloatLabel>
                    <InputText id="email" name="email" value={form.email} onChange={handleChange} className="w-full" />
                    <label htmlFor="email">Email</label>
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
                <Button type="submit" label="Salvar Registro" icon="pi pi-check" className="col-span-full mt-4" />
            </form>
        </div>
    );
}