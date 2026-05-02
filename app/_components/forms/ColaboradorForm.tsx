'use client'
import { useState } from "react";
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

    const statusOptions = ['ATIVO', 'INATIVO'];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await createColaborador(form);
        alert(result.msg);
    };

    // Estilos comuns para os grupos de input para simular o FloatLabel
    const groupClass = "relative mb-2";
    const inputClass = "block w-full px-3 py-3 text-gray-900 bg-transparent border-2 border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer";
    const labelClass = "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 cursor-text";

    return (
        <div className="flex justify-center items-center p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl w-full max-w-[900px] grid grid-cols-1 md:grid-cols-3 gap-6 shadow-lg"
            >
                {/* Nome */}
                <div className={`${groupClass} md:col-span-2`}>
                    <input 
                        type="text" id="nome" name="nome" value={form.nome} onChange={handleChange}
                        className={inputClass} placeholder=" " required
                    />
                    <label htmlFor="nome" className={labelClass}>Nome</label>
                </div>

                {/* CPF */}
                <div className={groupClass}>
                    <input 
                        type="text" id="cpf" name="cpf" value={form.cpf} onChange={handleChange}
                        className={inputClass} placeholder=" " maxLength={11} required
                    />
                    <label htmlFor="cpf" className={labelClass}>CPF</label>
                </div>

                {/* Telefone */}
                <div className={groupClass}>
                    <input 
                        type="text" id="telefone" name="telefone" value={form.telefone} onChange={handleChange}
                        className={inputClass} placeholder=" "
                    />
                    <label htmlFor="telefone" className={labelClass}>Telefone</label>
                </div>

                {/* Email */}
                <div className={groupClass}>
                    <input 
                        type="email" id="email" name="email" value={form.email} onChange={handleChange}
                        className={inputClass} placeholder=" " required
                    />
                    <label htmlFor="email" className={labelClass}>Email</label>
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

                {/* Senha */}
                <div className={`${groupClass} md:col-span-3`}>
                    <input 
                        type="password" id="senha" name="senha" value={form.senha} onChange={handleChange}
                        className={inputClass} placeholder=" " required
                    />
                    <label htmlFor="senha" className={labelClass}>Senha</label>
                </div>

                <button 
                    type="submit" 
                    className="col-span-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Salvar Registro
                </button>
            </form>
        </div>
    );
}