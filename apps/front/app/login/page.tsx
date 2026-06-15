"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSenha, setShowSenha] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErro("");

    if (!email.trim().endsWith("@aluno.unb.br") && !email.trim().endsWith("@unb.br")) {
      setErro("Utilize um e-mail institucional da UnB (@aluno.unb.br ou @unb.br).");
      return;
    }

    try {
      setLoading(true);
      
      const response = await axios.post("http://localhost:3000/auth/login", {
        email: email.trim(),
        senha: senha,
      });

      console.log("Login realizado com sucesso!", response.data);

      router.push("/");

    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string | string[] }; status?: number } };
      
      const rawMsg = Array.isArray(err.response?.data?.message)
        ? err.response.data.message.join("; ")
        : err.response?.data?.message || "Erro ao conectar com o servidor.";

      if (err.response?.status === 401 || err.response?.status === 404) {
        setErro("E-mail ou senha incorretos.");
      } else {
        setErro(rawMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 text-[#1D1D1D]">
      <section className="hidden md:flex flex-col items-center justify-center bg-[#003366] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('/fundoGeometrico.svg')] bg-[length:100%] bg-[position:0%_35%] bg-no-repeat" />
        <div className="relative z-10 bg-white p-8 rounded-xl shadow-2xl">
          <Image
            src="/logoConecta.svg"
            alt="Logo Conecta UnB"
            width={250}
            height={250}
            priority
            className="w-auto h-auto"
          />
        </div>
      </section>

      {/* Seção do Formulário de Login */}
      <section className="flex flex-col items-center justify-center bg-white p-8 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#003366]">Bem Vindo!</h1>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-sm">
            
            <div className="flex flex-col">
              <label className="mb-1 ml-4 text-[#003366] font-medium">E-mail Institucional</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="@aluno.unb.br ou @unb.br"
                className={`w-full px-4 py-2 bg-transparent border rounded-full focus:outline-none focus:ring-2 placeholder:text-gray-400 placeholder:text-xs ${
                  erro ? "border-red-400 focus:ring-red-400" : "border-[#006633] focus:ring-[#006633]"
                }`}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 ml-4 text-[#003366] font-medium">Senha</label>
              <div className="relative">
                <input
                  type={showSenha ? "text" : "password"}
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className={`w-full px-4 py-2 pr-10 bg-transparent border rounded-full focus:outline-none focus:ring-2 ${
                    erro ? "border-red-400 focus:ring-red-400" : "border-[#006633] focus:ring-[#006633]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowSenha((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#003366]"
                  tabIndex={-1}
                  aria-label={showSenha ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showSenha ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end px-4">
              <Link href="/esqueci-senha" className="text-xs text-[#003366] hover:underline">
                Esqueci minha senha
              </Link>
            </div>

            {erro && (
              <p className="mt-1 ml-4 text-xs text-red-500 font-medium">{erro}</p>
            )}

            <div className="pt-4 flex flex-col items-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-[#006633] text-white font-semibold rounded-full hover:bg-[#004d26] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006633] disabled:opacity-50"
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>

              <Link href="/cadastro" className="text-sm text-[#003366] hover:underline mt-4">
                Ainda não tem uma conta? Cadastre-se
              </Link>
            </div>

          </form>
        </div>
      </section>

    </main>
  );
}