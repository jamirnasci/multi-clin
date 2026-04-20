'use client'
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel"; // Importação necessária
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { AutoComplete } from "primereact/autocomplete";
import { IAgendamento } from "@/src/types/IAgendamento";

export default function AgendamentoForm() {
    const [form, setForm] = useState<Partial<IAgendamento>>({
        data: null,
        hora: null,
        valorFinal: 0,
        status: '',
        paciente: null,
        colaborador: null,
        procedimento: null
    });
    const [pacientes, setPacientes] = useState([
        { nome: 'jamir', id: 1 },
        { nome: 'maria', id: 2 },
    ])
    const [procedimentos, setProcedimentos] = useState([
        { nome: 'Limpeza', valorPadrao: 100, id: 1 },
        { nome: 'Restauração', valorPadrao: 200, id: 2 }
    ])
    const [colaboradores, setColaboradores] = useState([
        { nome: 'Aleksander Volkanovski', id: 1 },
        { nome: 'Vladimir Putin', id: 2 }
    ])

    const status = [
        { name: 'MARCADO' },
        { name: 'CONFIRMADO' },
        { name: 'FINALIZADO' },
        { name: 'CANCELADO' }
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleDropdownChange = (key: string, e: DropdownChangeEvent) => {
        if (key === 'procedimento') {
            const p = procedimentos.find(p => p.id == e.value)
            setForm((prev) => ({ ...prev, valorFinal: p?.valorPadrao || 0 }));
            return
        }
        setForm((prev) => ({ ...prev, [key]: e.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form);
    };

    const handleNumberChange = (name: string, value: number | null) => {
        setForm((prev) => ({ ...prev, [name]: value ?? 0 }));
    };

    const [filteredPacientes, setFilteredPacientes] = useState<{ nome: string, id: number }[]>();

    const searchPaciente = (e: any) => {
        const query = e.query.toLowerCase();

        const filtered = pacientes.filter((p) =>
            p.nome.toLowerCase().includes(query)
        );

        setFilteredPacientes(filtered);
    };

    return (
        <div className="flex justify-center items-center p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl w-full max-w-[900px] grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                <FloatLabel className="md:col-span-2">
                    <AutoComplete
                        id="paciente"
                        value={
                            pacientes.find(p => p.id === form.paciente) || null
                        }
                        suggestions={filteredPacientes}
                        completeMethod={(e) => {
                            const query = e.query.toLowerCase();

                            setFilteredPacientes(
                                pacientes.filter(p =>
                                    p.nome.toLowerCase().includes(query)
                                )
                            );
                        }}
                        field="nome" // 👈 MOSTRA O NOME
                        onChange={(e) =>
                            setForm(prev => ({
                                ...prev,
                                paciente: e.value?.id || null // 👈 SALVA O ID
                            }))
                        }
                        className="w-full"
                        dropdown
                    />
                    <label htmlFor="paciente">Paciente</label>
                </FloatLabel>

                <FloatLabel>
                    <Dropdown
                        id="procedimento"
                        name="procedimento"
                        value={form.procedimento}
                        options={procedimentos}
                        onChange={e => handleDropdownChange('procedimento', e)}
                        optionLabel="nome"
                        optionValue="id"
                        className="w-full" />
                    <label htmlFor="procedimento">Procedimento</label>
                </FloatLabel>

                <FloatLabel className="md:col-span-2">
                    <Dropdown
                        id="colaborador"
                        name="colaborador"
                        value={form.colaborador}
                        options={colaboradores}
                        onChange={e => handleDropdownChange('colaborador', e)}
                        optionLabel="nome"
                        optionValue="id"
                        className="w-full" />
                    <label htmlFor="colaborador">Colaborador</label>
                </FloatLabel>

                <FloatLabel>
                    <Calendar
                        id="data"
                        name="data"
                        value={form.data}
                        onChange={(e) => setForm(prev => ({ ...prev, data: e.value ?? null }))}
                        className="w-full"
                        showIcon
                        dateFormat="dd/mm/yy"
                    />
                    <label htmlFor="data">Data</label>
                </FloatLabel>
                <FloatLabel>
                    <Calendar
                        id="hora"
                        value={form.hora}
                        onChange={(e) =>
                            setForm(prev => ({
                                ...prev,
                                hora: e.value ?? null
                            }))
                        }
                        timeOnly
                        hourFormat="24"
                        className="w-full"
                    />
                    <label htmlFor="hora">Hora</label>
                </FloatLabel>
                <FloatLabel>
                    <Dropdown
                        id="status"
                        name="status"
                        onChange={e => handleDropdownChange('status', e)}
                        value={form.status}
                        options={status}
                        className="w-full"
                        optionLabel="name"
                        optionValue="name"
                    />
                    <label htmlFor="status">Status</label>
                </FloatLabel>
                <FloatLabel>
                    <InputNumber id="valorFinal" name="valorFinal" value={form.valorFinal} onChange={(e) => handleNumberChange('valorFinal', e.value)} className="w-full" />
                    <label htmlFor="valorFinal">Valor Final</label>
                </FloatLabel>
                <Button type="submit" label="Salvar Registro" icon="pi pi-check" className="col-span-full mt-4" />
            </form>
        </div>
    );
}
