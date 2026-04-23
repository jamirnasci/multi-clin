'use client'
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";

export default function PagamentoForm() {
    const [form, setForm] = useState({
        valor: 0,
        metodo: "",
        status: "",
        agendamento_id: ""
    });

    const metodos = [
        { label: "Dinheiro", value: "dinheiro" },
        { label: "Cartão", value: "cartao" },
        { label: "Pix", value: "pix" }
    ];

    const statusOptions = [
        { label: "Pendente", value: "pendente" },
        { label: "Pago", value: "pago" },
        { label: "Cancelado", value: "cancelado" }
    ];

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

                <FloatLabel>
                    <InputNumber
                        id="valor"
                        name="valor"
                        value={form.valor}
                        onValueChange={(e) => handleNumberChange('valor', e.value ?? null)}
                        mode="currency"
                        currency="BRL"
                        locale="pt-BR"
                        className="w-full"
                    />
                    <label htmlFor="valor">Valor</label>
                </FloatLabel>

                <FloatLabel>
                    <Dropdown
                        id="metodo"
                        name="metodo"
                        value={form.metodo}
                        options={metodos}
                        onChange={handleDropdownChange}
                        className="w-full"
                        optionLabel="label"
                        optionValue="value"
                    />
                    <label htmlFor="metodo">Método</label>
                </FloatLabel>

                <FloatLabel>
                    <Dropdown
                        id="status"
                        name="status"
                        value={form.status}
                        options={statusOptions}
                        onChange={handleDropdownChange}
                        className="w-full"
                        optionLabel="label"
                        optionValue="value"
                    />
                    <label htmlFor="status">Status</label>
                </FloatLabel>

                <FloatLabel className="md:col-span-2">
                    <InputText
                        id="agendamento_id"
                        name="agendamento_id"
                        value={form.agendamento_id}
                        onChange={handleChange}
                        className="w-full"
                    />
                    <label htmlFor="agendamento_id">ID do Agendamento</label>
                </FloatLabel>

                <Button
                    type="submit"
                    label={'Atualizar Pagamento'}
                    icon="pi pi-check"
                    className="col-span-full mt-4"
                />

            </form>
        </div>
    );
}