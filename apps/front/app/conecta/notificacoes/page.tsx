"use client";

import { useAuth } from "@/hooks/useAuth"; 
import { useState } from "react";
import { PreferenciasModal } from "@/components/notificacao/PreferenciasModal";
import { NotificacaoCard } from "@/components/notificacao/NotificacaoCard";

export default function NotificacoesPage() {
  const { user, loading, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando notificações...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-gray-50 text-[#1D1D1D]">
        <h1 className="text-2xl text-red-600 font-bold">Não Logado</h1>
        <p>Faça o Login para ver suas Notificações</p>
        <a href="/auth/login" className="px-4 py-2 bg-[#003366] text-white rounded-full">
          Ir para o Login
        </a>
      </div>
    );
  }

  //tela de Notificações
  return (
    <div className="min-h-screen flex bg-white text-[#1D1D1D]">

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 p-8 sm:p-12 flex justify-center">
        <div className="w-full max-w-4xl">
          
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-[#003366] font-bold text-xl tracking-wide">
              Notificações
            </h1>
            
           <button 
              onClick={() => setIsModalOpen(true)} // AÇÃO AO CLICAR
              className="flex items-center gap-2 px-4 py-2 bg-[#006633] text-white font-medium rounded-full hover:bg-[#004d26] transition-colors"
            >
               Preferências
            </button>
          </div>
          
          <hr className="border-[#006633] border-t-2 mb-6" />

          <div className="flex flex-col gap-4">
            <NotificacaoCard 
              nome="Projeto 01" 
              texto="Você tem uma nova atualização pendente neste projeto." 
            />
            <NotificacaoCard 
              nome="Projeto 02" 
              texto="Nova publicação adicionada ao feed da entidade." 
            />
            <NotificacaoCard 
              nome="Projeto 03" 
              texto="O processo seletivo foi encerrado." 
            />
        </div>
        </div>
      </main>

      <PreferenciasModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
}