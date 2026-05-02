'use client'
import { useEffect, useState } from "react";
import { IAgendamento } from "@/src/types/IAgendamento";
import { IPaciente } from "@/src/types/IPaciente";
import { IProcedimento } from "@/src/types/IProcedimento";
import { createAgendamento } from "@/app/actions/agendamentoActions/createAgendamento";

export default function AgendamentoForm() {
    const [form, setForm] = useState<Partial<IAgendamento>>({
        data: null,
        hora: null,
        valorFinal: 0,
        status: '',
        paciente_id: null,
        colaborador_id: null,
        procedimento_id: null
    });

    const [pacientes, setPacientes] = useState<IPaciente[]>([]);
    const [procedimentos, setProcedimentos] = useState<IProcedimento[]>([]);
    const [colaboradores, setColaboradores] = useState<any[]>([]);

    const statusOptions = ['AGENDADO', 'CONFIRMADO', 'FINALIZADO', 'CANCELADO'];

    useEffect(() => {
        const fetchData = async () => {
            const [resPaci, resProc, resColab] = await Promise.all([
                fetch('/api/pacientes'),
                fetch('/api/procedimentos'),
                fetch('/api/colaboradores')
            ]);
            setPacientes(await resPaci.json());
            setProcedimentos(await resProc.json());
            setColaboradores(await resColab.json());
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await createAgendamento(form);
        alert(result.msg);
    };

    // Estilo padrão para os inputs simulando o FloatLabel
    const inputStyle = "peer w-full border-b-2 border-gray-300 px-0 py-2 placeholder-transparent focus:border-blue-500 focus:outline-none bg-transparent";
    const labelStyle = "absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-500 peer-focus:text-sm";
    const groupStyle = "relative mt-4";

    return (
        <div className="flex justify-center items-center p-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl w-full max-w-[900px] grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Paciente - Simulação de AutoComplete com Datalist */}
                <div className={`${groupStyle} md:col-span-2`}>
                    <input 
                        list="pacientes-list"
                        id="paciente"
                        className={inputStyle}
                        placeholder="Paciente"
                        onChange={(e) => {
                            const selected = pacientes.find(p => p.nome === e.target.value);
                            setForm(prev => ({ ...prev, paciente_id: selected ? selected.idpaciente : null }));
                        }}
                    />
                    <datalist id="pacientes-list">
                        {pacientes.map(p => <option key={p.idpaciente} value={p.nome} />)}
                    </datalist>
                    <label htmlFor="paciente" className={labelStyle}>Paciente</label>
                </div>

                {/* Procedimento */}
                <div className={groupStyle}>
                    <select 
                        id="procedimento"
                        className={inputStyle}
                        value={form.procedimento_id || ""}
                        onChange={(e) => {
                            const id = Number(e.target.value);
                            const p = procedimentos.find(proc => proc.idprocedimento === id);
                            setForm(prev => ({ ...prev, procedimento_id: id, valorFinal: p?.valorPadrao || 0 }));
                        }}
                    >
                        <option value="" disabled hidden></option>
                        {procedimentos.map(p => (
                            <option key={p.idprocedimento} value={p.idprocedimento}>{p.nome}</option>
                        ))}
                    </select>
                    <label htmlFor="procedimento" className={labelStyle}>Procedimento</label>
                </div>

                {/* Colaborador */}
                <div className={`${groupStyle} md:col-span-2`}>
                    <select 
                        id="colaborador"
                        className={inputStyle}
                        value={form.colaborador_id || ""}
                        onChange={(e) => setForm(prev => ({ ...prev, colaborador_id: Number(e.target.value) }))}
                    >
                        <option value="" disabled hidden></option>
                        {colaboradores.map(c => (
                            <option key={c.idcolaborador} value={c.idcolaborador}>{c.nome}</option>
                        ))}
                    </select>
                    <label htmlFor="colaborador" className={labelStyle}>Colaborador</label>
                </div>

                {/* Data */}
                <div className={groupStyle}>
                    <input 
                        type="date" 
                        id="data"
                        className={inputStyle}
                        onChange={(e) => setForm(prev => ({ ...prev, data: e.target.value as any }))}
                    />
                    <label htmlFor="data" className={labelStyle}>Data</label>
                </div>

                {/* Hora */}
                <div className={groupStyle}>
                    <input 
                        type="time" 
                        id="hora"
                        className={inputStyle}
                        onChange={(e) => setForm(prev => ({ ...prev, hora: e.target.value as any }))}
                    />
                    <label htmlFor="hora" className={labelStyle}>Hora</label>
                </div>

                {/* Status */}
                <div className={groupStyle}>
                    <select 
                        id="status"
                        className={inputStyle}
                        value={form.status}
                        onChange={(e) => setForm(prev => ({ ...prev, status: e.target.value }))}
                    >
                        <option value="" disabled hidden></option>
                        {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <label htmlFor="status" className={labelStyle}>Status</label>
                </div>

                {/* Valor Final */}
                <div className={groupStyle}>
                    <input 
                        type="number" 
                        id="valorFinal"
                        className={inputStyle}
                        value={form.valorFinal || 0}
                        onChange={(e) => setForm(prev => ({ ...prev, valorFinal: Number(e.target.value) }))}
                    />
                    <label htmlFor="valorFinal" className={labelStyle}>Valor Final</label>
                </div>

                <button 
                    type="submit" 
                    className="col-span-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                    <span className="pi pi-check"></span> Salvar Registro
                </button>
            </form>
        </div>
    );
}