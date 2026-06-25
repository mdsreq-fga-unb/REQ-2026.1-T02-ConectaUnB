"use client";

import React, { useEffect, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ButtonGreen } from '@/components/ButtonGreen';
import { ProjetoCard } from '@/components/projetoCard';
import { api } from '@/guards/api';
import { toast } from 'sonner';

export default function ProjectsPage() {
  const [meusProjetos, setMeusProjetos] = useState<any[]>([]);
  const [cogestao, setCogestao] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const response = await api.get('/entidade/minhas');
        const entidades = response.data;

        // Separar "Meus Projetos" e "Cogestão" com base na classificação do vínculo
        const meus = entidades.filter((e: any) => e.vinculo.classificacao !== 'CO_GESTOR');
        const coGestor = entidades.filter((e: any) => e.vinculo.classificacao === 'CO_GESTOR');

        setMeusProjetos(meus);
        setCogestao(coGestor);
      } catch (error) {
        console.error("Erro ao carregar projetos:", error);
        toast.error("Ocorreu um erro ao carregar os projetos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjetos();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      {/* Barra Lateral Fixa à esquerda */}
      <Sidebar />

      {/* Conteúdo Principal */}
      <main className="flex-1 p-12">
        {/* Cabeçalho com o botão à direita */}
        <div className="flex justify-end mb-12">
          <ButtonGreen />
        </div>

        {loading ? (
          <p className="text-gray-500">Carregando projetos...</p>
        ) : (
          <>
            {/* Seção: Meus Projetos */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-[#0d2a54] mb-6 border-b-2 border-[#195b3d] pb-2">
                Meus Projetos
              </h2>
              {/* Grid responsivo: 1 coluna no mobile, 2 colunas em telas médias para cima */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {meusProjetos.length === 0 ? (
                  <p className="text-gray-500">Nenhum projeto encontrado.</p>
                ) : (
                  meusProjetos.map((projeto) => (
                    <ProjetoCard key={projeto.id} nome={projeto.nome || "Projeto Sem Nome"} />
                  ))
                )}
              </div>
            </section>

            {/* Seção: Cogestão */}
            <section>
              <h2 className="text-2xl font-bold text-[#0d2a54] mb-6 border-b-2 border-[#195b3d] pb-2">
                Cogestão
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {cogestao.length === 0 ? (
                  <p className="text-gray-500">Nenhum projeto de cogestão encontrado.</p>
                ) : (
                  cogestao.map((projeto) => (
                    <ProjetoCard key={projeto.id} nome={projeto.nome || "Projeto Sem Nome"} />
                  ))
                )}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}