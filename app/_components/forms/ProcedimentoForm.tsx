'use client'
import { useState } from "react";
import { IProcedimento } from "@/src/types/IProcedimento";
import { createProcedimento } from "@/app/actions/procedimentoActions/createProcedimento";
import { updateProcedimento } from "@/app/actions/procedimentoActions/updateProcedimento";

interface ProcedimentoFormProps {
  selectedProcedimento: IProcedimento | null
  mode: string
}

export default function ProcedimentoForm(props: ProcedimentoFormProps) {
    const [form, setForm] = useState<Partial<IProcedimento>>({
        nome: props.selectedProcedimento?.nome || '',
        duracao: props.selectedProcedimento?.duracao || 0,
        valorPadrao: props.selectedProcedimento?.valorPadrao || 0,
        descricao: props.selectedProcedimento?.descricao || '',
        status: props.selectedProcedimento?.status || ''
    });

    const statusOptions = ['ATIVO', 'INATIVO'];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // Tratamento para campos numéricos
        const isNumber = name === 'valorPadrao' || name === 'duracao';
        setForm((prev) => ({ 
            ...prev, 
            [name]: isNumber ? Number(value) : value 
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();        
        if(props.mode === 'create'){
            const result = await createProcedimento(form);
            alert(result.msg);
            return;
        }
        if(props.mode === 'update' && props.selectedProcedimento?.idprocedimento){            
            const result = await updateProcedimento(form, props.selectedProcedimento.idprocedimento);
            alert(result.msg);
        }
    };

    // Classes compartilhadas para o efeito Float Label
    const groupClass = "relative";
    const inputClass = "block w-full px-3 py-3 text-gray-900 bg-transparent border-2 border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer";
    const labelClass = "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 cursor-text";

    return (
        <div className="flex justify-center items-center p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl w-full max-w-[900px] grid grid-cols-1 md:grid-cols-3 gap-6 shadow-sm border border-gray-100"
            >
                {/* Nome */}
                <div className={`${groupClass} md:col-span-2`}>
                    <input 
                        type="text" id="nome" name="nome" value={form.nome} onChange={handleChange} 
                        className={inputClass} placeholder=" " required 
                    />
                    <label htmlFor="nome" className={labelClass}>Nome</label>
                </div>

                {/* Valor Padrão */}
                <div className={groupClass}>
                    <input 
                        type="number" id="valorPadrao" name="valorPadrao" value={form.valorPadrao} onChange={handleChange} 
                        className={inputClass} placeholder=" " step="0.01" required 
                    />
                    <label htmlFor="valorPadrao" className={labelClass}>Valor Padrão (R$)</label>
                </div>

                {/* Duração */}
                <div className={groupClass}>
                    <input 
                        type="number" id="duracao" name="duracao" value={form.duracao} onChange={handleChange} 
                        className={inputClass} placeholder=" " required 
                    />
                    <label htmlFor="duracao" className={labelClass}>Duração (min)</label>
                </div>

                {/* Status */}
                <div className={groupClass}>
                    <select 
                        id="status" name="status" value={form.status} onChange={handleChange} 
                        className={inputClass} required
                    >
                        <option value="" disabled hidden></option>
                        {statusOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                    <label htmlFor="status" className={labelClass}>Status</label>
                </div>

                {/* Descrição */}
                <div className="col-span-full relative">
                    <textarea
                        id="descricao"
                        name="descricao"
                        value={form.descricao}
                        onChange={handleChange}
                        rows={3}
                        className={`${inputClass} resize-none`}
                        placeholder=" "
                    />
                    <label htmlFor="descricao" className={labelClass}>Descrição</label>
                </div>

                {/* Botão de Ação */}
                <button 
                    type="submit" 
                    className="col-span-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {props.mode === 'update' ?  'Atualizar Registro' : 'Salvar Registro'}
                </button>
            </form>
        </div>
    );
}