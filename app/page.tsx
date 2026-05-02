'use client'

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita o reload da página
    
    if (!email || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    const result = await signIn('credentials', {
      redirect: false,
      email: email,
      password: senha
    });

    if (result?.ok) {
      router.push('/pacientes');
    } else {
      alert('Falha ao realizar login');
    }
  };

  // Estilos reutilizáveis para o efeito Float Label
  const containerClass = "relative";
  const inputClass = "block w-full px-3 py-3 text-gray-900 bg-transparent border-2 border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer";
  const labelClass = "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 cursor-text";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      {/* Card manual usando Tailwind */}
      <div className="bg-white p-8 rounded-2xl w-full max-w-[400px] shadow-xl border border-gray-100">
        
        <form onSubmit={handleLogin} className="flex flex-col gap-6">

          {/* Título */}
          <div className="text-center mb-2">
            <h2 className="text-3xl font-bold text-gray-800">Multi Clin</h2>
            <p className="text-gray-500 text-sm mt-1">Acesse sua conta</p>
          </div>

          {/* Email */}
          <div className={containerClass}>
            <input
              id="email"
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              required
            />
            <label htmlFor="email" className={labelClass}>Email</label>
          </div>

          {/* Senha */}
          <div className={containerClass}>
            <input
              id="senha"
              type="password"
              placeholder=" "
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className={inputClass}
              required
            />
            <label htmlFor="senha" className={labelClass}>Senha</label>
          </div>

          {/* Botão Entrar */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 group"
          >
            <svg 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Entrar
          </button>

        </form>
      </div>
    </div>
  );
}