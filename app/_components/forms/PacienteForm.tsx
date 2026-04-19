'use client'
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { FloatLabel } from "primereact/floatlabel"; // Importação necessária

export default function PacienteForm() {
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    data_nasc: null as Date | null,
    estado: "",
    cidade: "",
    bairro: "",
    logradouro: "",
    num_apto: "",
    cep: "",
    obs: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
          <Calendar
            id="data_nasc"
            value={form.data_nasc}
            onChange={(e) => setForm(p => ({...p, data_nasc: e.value as Date}))}
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
          <InputText id="num_apto" name="num_apto" value={form.num_apto} onChange={handleChange} className="w-full" />
          <label htmlFor="num_apto">Número / Apto</label>
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

        <Button type="submit" label="Salvar Registro" icon="pi pi-check" className="col-span-full mt-4" />
      </form>
    </div>
  );
}