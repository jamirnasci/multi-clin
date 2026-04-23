'use client'

import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter()

  
  const handleLogin = async () => {
    if (!email || !senha) {
      alert("Preencha todos os campos");
      return;
    }
    const result = await signIn('credentials', {
      redirect: false,
      email: email,
      password: senha
    })
    if(result?.ok){
      router.push('/pacientes')
    }else{
      alert('Falha ao realizar login')
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-[400px] shadow-lg border-round-2xl">

        <div className="flex flex-col gap-4">

          {/* Título */}
          <div className="text-center mb-2">
            <h2 className="text-2xl font-bold">Multi Clin</h2>
            <p className="text-gray-500 text-sm">Acesse sua conta</p>
          </div>

          {/* Email */}
          <span className="p-float-label">
            <InputText
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
            <label htmlFor="email">Email</label>
          </span>

          {/* Senha */}
          <div className="p-fluid">
            <span className="p-float-label">
              <Password
                id="senha"
                name="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                toggleMask
                feedback={false}
              />
              <label htmlFor="senha">Senha</label>
            </span>
          </div>

          {/* Botão */}
          <Button
            label="Entrar"
            icon="pi pi-sign-in"
            className="w-full mt-2"
            onClick={handleLogin}
          />

        </div>
      </Card>
    </div>
  );
}

