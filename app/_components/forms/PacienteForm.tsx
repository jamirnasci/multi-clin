'use client'
import { useState } from "react";
import { IPaciente } from "@/src/types/IPaciente";
import { createPaciente } from "@/app/actions/pacienteActions/createPaciente";
import { updatePaciente } from "@/app/actions/pacienteActions/updatePaciente";

interface PacienteFormProps {
  selectedPaciente: IPaciente | null
  mode: string
}

export default function PacienteForm(props: PacienteFormProps) {
  const [form, setForm] = useState<Partial<IPaciente>>({
    nome: props.selectedPaciente?.nome || "",
    cpf: props.selectedPaciente?.cpf || "",
    telefone: props.selectedPaciente?.telefone || "",
    email: props.selectedPaciente?.email || "",
    dataNasc: props.selectedPaciente?.dataNasc ? new Date(props.selectedPaciente.dataNasc) : null,
    estado: props.selectedPaciente?.estado || "",
    cidade: props.selectedPaciente?.cidade || "",
    bairro: props.selectedPaciente?.bairro || "",
    logradouro: props.selectedPaciente?.logradouro || "",
    numApto: props.selectedPaciente?.numApto || "",
    cep: props.selectedPaciente?.cep || "",
    obs: props.selectedPaciente?.obs || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (props.mode === 'create') {
      const result = await createPaciente(form)
      alert(result.msg)      
    }
    if(props.mode === 'update' && props.selectedPaciente?.idpaciente){
      const result = await updatePaciente(form, props.selectedPaciente.idpaciente)
      alert(result.msg)
    }
  };

  // Classes utilitárias para evitar repetição
  const groupClass = "relative";
  const inputClass = "block w-full px-3 py-3 text-gray-900 bg-transparent border-2 border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer";
  const labelClass = "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 cursor-text";

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl w-full max-w-[900px] grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Nome */}
        <div className={`${groupClass} md:col-span-2`}>
          <input type="text" id="nome" name="nome" value={form.nome} onChange={handleChange} className={inputClass} placeholder=" " required />
          <label htmlFor="nome" className={labelClass}>Nome</label>
        </div>

        {/* CPF */}
        <div className={groupClass}>
          <input type="text" id="cpf" name="cpf" value={form.cpf} onChange={handleChange} className={inputClass} placeholder=" " maxLength={11} />
          <label htmlFor="cpf" className={labelClass}>CPF</label>
        </div>

        {/* Telefone */}
        <div className={groupClass}>
          <input type="text" id="telefone" name="telefone" value={form.telefone} onChange={handleChange} className={inputClass} placeholder=" " />
          <label htmlFor="telefone" className={labelClass}>Telefone</label>
        </div>

        {/* Email */}
        <div className={groupClass}>
          <input type="email" id="email" name="email" value={form.email} onChange={handleChange} className={inputClass} placeholder=" " />
          <label htmlFor="email" className={labelClass}>Email</label>
        </div>

        {/* Data de Nascimento */}
        <div className={groupClass}>
          <input 
            type="date" 
            id="data_nasc" 
            name="dataNasc" 
            value={form.dataNasc ? new Date(form.dataNasc).toISOString().split('T')[0] : ''} 
            onChange={(e) => setForm(p => ({ ...p, dataNasc: e.target.value ? new Date(e.target.value) : null }))} 
            className={inputClass} 
          />
          <label htmlFor="data_nasc" className="absolute text-sm text-gray-500 -top-4 left-1 bg-white px-2">Data de Nascimento</label>
        </div>

        {/* Estado */}
        <div className={groupClass}>
          <input type="text" id="estado" name="estado" value={form.estado} onChange={handleChange} className={inputClass} placeholder=" " />
          <label htmlFor="estado" className={labelClass}>Estado</label>
        </div>

        {/* Cidade */}
        <div className={groupClass}>
          <input type="text" id="cidade" name="cidade" value={form.cidade} onChange={handleChange} className={inputClass} placeholder=" " />
          <label htmlFor="cidade" className={labelClass}>Cidade</label>
        </div>

        {/* Bairro */}
        <div className={groupClass}>
          <input type="text" id="bairro" name="bairro" value={form.bairro} onChange={handleChange} className={inputClass} placeholder=" " />
          <label htmlFor="bairro" className={labelClass}>Bairro</label>
        </div>

        {/* Logradouro */}
        <div className={`${groupClass} md:col-span-2`}>
          <input type="text" id="logradouro" name="logradouro" value={form.logradouro} onChange={handleChange} className={inputClass} placeholder=" " />
          <label htmlFor="logradouro" className={labelClass}>Logradouro (Rua/Avenida)</label>
        </div>

        {/* Número / Apto */}
        <div className={groupClass}>
          <input type="text" id="numApto" name="numApto" value={form.numApto} onChange={handleChange} className={inputClass} placeholder=" " />
          <label htmlFor="numApto" className={labelClass}>Número / Apto</label>
        </div>

        {/* CEP */}
        <div className={groupClass}>
          <input type="text" id="cep" name="cep" value={form.cep} onChange={handleChange} className={inputClass} placeholder=" " />
          <label htmlFor="cep" className={labelClass}>CEP</label>
        </div>

        {/* Observações */}
        <div className="col-span-full relative">
          <textarea
            id="obs"
            name="obs"
            value={form.obs}
            onChange={handleChange}
            rows={3}
            className={`${inputClass} resize-none`}
            placeholder=" "
          />
          <label htmlFor="obs" className={labelClass}>Observações</label>
        </div>

        {/* Botão Salvar */}
        <button 
          type="submit" 
          className="col-span-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          {props.mode === 'update' ? 'Atualizar Paciente' : 'Cadastrar Paciente'}
        </button>
      </form>
    </div>
  );
}