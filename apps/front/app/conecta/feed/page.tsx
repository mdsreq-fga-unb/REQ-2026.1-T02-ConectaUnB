"use client";

import { useAuth } from "@/hooks/useAuth"; 

export default function HomePage() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando perfil...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-gray-50 text-[#1D1D1D]">
        <h1 className="text-2xl text-red-600 font-bold">Não Logado</h1>
        <p>Faça o Login - FEED</p>
        <a href="/auth/login" className="px-4 py-2 bg-[#003366] text-white rounded-full">
          Ir para o Login
        </a>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-[#1D1D1D]">
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
          
          <h1 className="text-3xl font-bold text-[#003366] mb-2">
            Painel do ConectaUnB
          </h1>
          
          {/* Acessando os dados extraídos do Token */}
          <p className="text-gray-600 mb-6">
            Logado como: <span className="font-semibold text-green-700">{user.email}</span>
          </p>

          <div className="p-4 border border-gray-200 rounded-lg mb-8">
            <h2 className="font-semibold mb-2">Seus Dados de Sessão:</h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li><strong>ID no Banco:</strong> {user.sub}</li>
              <li><strong>Sessão expira em:</strong> {new Date(user.exp * 1000).toLocaleTimeString()}</li>
            </ul>
          </div>

          {/* Usando a função de logout do Hook */}
          <button
            onClick={logout}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors"
          >
            Sair da Conta
          </button>

        </div>
      </main>
    </div>
  );
}