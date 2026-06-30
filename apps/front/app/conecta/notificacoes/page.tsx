"use client";

import { useAuth } from "@/hooks/useAuth"; 
import { useState, useEffect } from "react";
import { PreferenciasModal } from "@/components/notificacao/PreferenciasModal";
import { NotificacaoCard } from "@/components/notificacao/NotificacaoCard";
import { Settings } from "lucide-react";

interface Notificacao {
  id: string;
  tipo: "ATUALIZACAO_PROJETO" | "NOVA_PUBLICACAO" | "PROCESSO_SELETIVO";
  referenciaId: number; 
  entidade?: {
    nome: string;
    linkLogo?: string;
  };
  idEntidade: string;
}

export default function NotificacoesPage() {
  const { user, loading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [loadingNotificacoes, setLoadingNotificacoes] = useState(false);

  const marcarNotificacoesComoLidas = async () => {
    try {
      const token = localStorage.getItem("conecta_unb_token");
      await fetch('http://localhost:3000/notificacao', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });
    } catch (error) {
      console.error("Erro ao registrar última leitura:", error);
    }
  };

  const buscarNotificacoes = async () => {
    setLoadingNotificacoes(true);
    try {
      const token = localStorage.getItem("conecta_unb_token");
      
      const response = await fetch('http://localhost:3000/notificacao', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });

      if (!response.ok) {
        throw new Error('Falha ao buscar notificações');
      }

      const data = await response.json();
      setNotificacoes(data);
      marcarNotificacoesComoLidas();
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
    } finally {
      setLoadingNotificacoes(false);
    }
  };

  useEffect(() => {
    if (user) {
      buscarNotificacoes();
    }
  }, [user]);

  const formatarDadosNotificacao = (notificacao: Notificacao) => {
    let tipoFormatado: "PROCESSO_SELETIVO" | "PROJETO" | "POSTAGEM" = "PROJETO";
    let textoFormatado = "Você tem uma nova notificação.";

    switch (notificacao.tipo) {
      case "ATUALIZACAO_PROJETO":
        tipoFormatado = "PROJETO";
        textoFormatado = "Você tem uma nova atualização pendente neste projeto.";
        break;
      case "NOVA_PUBLICACAO":
        tipoFormatado = "POSTAGEM";
        textoFormatado = "Nova publicação adicionada ao feed da entidade.";
        break;
      case "PROCESSO_SELETIVO":
        tipoFormatado = "PROCESSO_SELETIVO";
        textoFormatado = "Um novo processo seletivo foi aberto ou atualizado!";
        break;
    }

    return { tipoFormatado, textoFormatado };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>A carregar notificações...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-gray-50 text-[#1D1D1D]">
        <h1 className="text-2xl text-red-600 font-bold">Não tem sessão iniciada</h1>
        <p>Inicie sessão para ver as suas Notificações</p>
        <a href="/auth/login" className="px-4 py-2 bg-[#003366] text-white rounded-full">
          Ir para o Login
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white text-[#1D1D1D]">
      <main className="flex-1 p-8 sm:p-12 flex justify-center">
        <div className="w-full max-w-4xl">
          
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-[#003366] font-bold text-xl tracking-wide">
              Notificações
            </h1>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#006633] text-white font-medium rounded-full hover:bg-[#004d26] transition-colors"
            >
               <Settings className="w-5 h-5" /> Preferências
            </button>
          </div>
          
          <hr className="border-[#006633] border-t-2 mb-6" />

          <div className="flex flex-col gap-4">
            {loadingNotificacoes ? (
              <p className="text-gray-500 text-center py-4">A procurar as suas notificações mais recentes...</p>
            ) : notificacoes.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Ainda não tem nenhuma notificação.</p>
            ) : (
              notificacoes.map((notif) => {
                const { tipoFormatado, textoFormatado } = formatarDadosNotificacao(notif);
                
                return (
                  <NotificacaoCard 
                    key={notif.id}
                    nome={notif.entidade?.nome || "Sistema"} 
                    texto={textoFormatado}
                    fotoLogo={notif.entidade?.linkLogo} 
                    idReferencia={notif.referenciaId} 
                    tipoNotificacao={tipoFormatado} 
                  />
                );
              })
            )}
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