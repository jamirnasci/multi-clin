'use client'
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel"; // Importação necessária
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Password } from "primereact/password";
import { IColaborador } from "@/src/types/IColaborador";
import { createColaborador } from "@/app/actions/colaboradorActions/createColaborador";

export default function ColaboradorForm() {
    const [form, setForm] = useState<Partial<IColaborador>>({
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        status: '',
        senha: ''
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await createColaborador(form)
        alert(result.msg)
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
                    <InputText id="cpf" name="cpf" value={form.cpf} onChange={handleChange} className="w-full" max={11}/>
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
                <FloatLabel>
                    <Password id="senha" name="senha" value={form.senha} onChange={handleChange} className="w-full" />
                    <label htmlFor="senha">Senha</label>
                </FloatLabel>
                <Button type="submit" label="Salvar Registro" icon="pi pi-check" className="col-span-full mt-4" />
            </form>
        </div>
    );
}