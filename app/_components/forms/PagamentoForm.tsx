'use client'
import { useState } from "react";

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form);
    };

    // Classes compartilhadas para manter o visual limpo e o efeito FloatLabel
    const containerClass = "relative";
    const inputClass = "block w-full px-3 py-3 text-gray-900 bg-transparent border-2 border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer";
    const labelClass = "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 cursor-text";

    return (
        <div className="flex justify-center items-center p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl w-full max-w-[900px] grid grid-cols-1 md:grid-cols-3 gap-6 shadow-sm border border-gray-100"
            >
                {/* Valor */}
                <div className={containerClass}>
                    <input
                        type="number"
                        id="valor"
                        name="valor"
                        value={form.valor}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder=" "
                        step="0.01"
                    />
                    <label htmlFor="valor" className={labelClass}>Valor (R$)</label>
                </div>

                {/* Método */}
                <div className={containerClass}>
                    <select
                        id="metodo"
                        name="metodo"
                        value={form.metodo}
                        onChange={handleChange}
                        className={inputClass}
                        required
                    >
                        <option value="" disabled hidden></option>
                        {metodos.map((m) => (
                            <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                    </select>
                    <label htmlFor="metodo" className={labelClass}>Método</label>
                </div>

                {/* Status */}
                <div className={containerClass}>
                    <select
                        id="status"
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className={inputClass}
                        required
                    >
                        <option value="" disabled hidden></option>
                        {statusOptions.map((s) => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                    </select>
                    <label htmlFor="status" className={labelClass}>Status</label>
                </div>

                {/* ID do Agendamento */}
                <div className={`${containerClass} md:col-span-2`}>
                    <input
                        type="text"
                        id="agendamento_id"
                        name="agendamento_id"
                        value={form.agendamento_id}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder=" "
                    />
                    <label htmlFor="agendamento_id" className={labelClass}>ID do Agendamento</label>
                </div>

                {/* Botão Salvar */}
                <button
                    type="submit"
                    className="col-span-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Atualizar Pagamento
                </button>
            </form>
        </div>
    );
}