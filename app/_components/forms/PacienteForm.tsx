'use client'
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel"; // Importação necessária
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
    console.log(props.selectedPaciente)
    if (props.mode == 'create') {
      const result = await createPaciente(form)
      alert(result.msg)      
    }
    if(props.mode == 'update' && props.selectedPaciente?.idpaciente){
      const result = await updatePaciente(form, props.selectedPaciente.idpaciente)
      alert(result.msg)
    }
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
          <Calendar
            id="data_nasc"
            value={form.dataNasc}
            onChange={(e) => setForm(p => ({ ...p, dataNasc: e.value as Date }))}
            dateFormat="dd/mm/yy"
            showIcon
            className="w-full"
            inputClassName="w-full"
          />
          <label htmlFor="data_nasc">Data de Nascimento</label>
        </FloatLabel>

        {/* ESTADO */}
        <FloatLabel>
          <InputText id="estado" name="estado" value={form.estado} onChange={handleChange} className="w-full" />
          <label htmlFor="estado">Estado</label>
        </FloatLabel>

        {/* CIDADE */}
        <FloatLabel>
          <InputText id="cidade" name="cidade" value={form.cidade} onChange={handleChange} className="w-full" />
          <label htmlFor="cidade">Cidade</label>
        </FloatLabel>

        {/* BAIRRO */}
        <FloatLabel>
          <InputText id="bairro" name="bairro" value={form.bairro} onChange={handleChange} className="w-full" />
          <label htmlFor="bairro">Bairro</label>
        </FloatLabel>

        {/* LOGRADOURO (OCUPA 2 COLUNAS) */}
        <FloatLabel className="md:col-span-2">
          <InputText id="logradouro" name="logradouro" value={form.logradouro} onChange={handleChange} className="w-full" />
          <label htmlFor="logradouro">Logradouro (Rua/Avenida)</label>
        </FloatLabel>

        {/* NÚMERO / APTO */}
        <FloatLabel>
          <InputText id="numApto" name="numApto" value={form.numApto} onChange={handleChange} className="w-full" />
          <label htmlFor="numApto">Número / Apto</label>
        </FloatLabel>

        {/* CEP */}
        <FloatLabel>
          <InputText id="cep" name="cep" value={form.cep} onChange={handleChange} className="w-full" />
          <label htmlFor="cep">CEP</label>
        </FloatLabel>

        <FloatLabel className="col-span-full">
          <InputTextarea
            id="obs"
            name="obs"
            value={form.obs}
            onChange={handleChange}
            rows={3}
            className="w-full"
          />
          <label htmlFor="obs">Observações</label>
        </FloatLabel>

        <Button type="submit" label={props.mode == 'update' ? 'Atualizar Paciente' : 'Cadastrar Paciente'} icon="pi pi-check" className="col-span-full mt-4" />
      </form>
    </div>
  );
}