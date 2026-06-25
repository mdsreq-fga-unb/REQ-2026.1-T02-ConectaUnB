"use client";
import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ButtonGreen } from '@/components/ButtonGreen';
import { ProjetoCard } from '@/components/projetoCard';
import { CreateEntidadeModal } from '@/components/CreateEntidadeModal';
import { api } from '@/guards/api';

export default function EntidadesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [minhasEntidades, setMinhasEntidades] = useState<any[]>([]);
  const [entidadesCogestao, setEntidadesCogestao] = useState<any[]>([]);
  const [entidadesMembro, setEntidadesMembro] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEntidades() {
      try {
        const response = await api.get('/entidade/minhas');
        const entidades = response.data;
        console.log("Entidades recebidas da API:", entidades);
        
        const minhas = entidades.filter((e: any) => 
          e.vinculo.classificacao === 'GESTOR'
        );
        const cogestao = entidades.filter((e: any) => 
          e.vinculo.classificacao === 'CO_GESTOR'
        );
        const membro = entidades.filter((e: any) => 
          e.vinculo.classificacao === 'MEMBRO'
        );
        
        setMinhasEntidades(minhas);
        setEntidadesCogestao(cogestao);
        setEntidadesMembro(membro);
      } catch (error) {
        console.error("Erro ao buscar entidades", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchEntidades();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      {/* Barra Lateral Fixa à esquerda */}
      <Sidebar />

      {/* Conteúdo Principal */}
      <main className="flex-1 p-12">
        {/* Cabeçalho com o botão à direita */}
        <div className="flex justify-end mb-12">
          <ButtonGreen text="Criar Entidade" onClick={() => setIsModalOpen(true)} />
        </div>

        {/* Seção: Minhas Entidades */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#0d2a54] mb-6 border-b-2 border-[#195b3d] pb-2">
            Minhas Entidades
          </h2>
          {/* Grid responsivo: 1 coluna no mobile, 2 colunas em telas médias para cima */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isLoading ? (
              <p className="text-gray-500">Carregando...</p>
            ) : minhasEntidades.length > 0 ? (
              minhasEntidades.map((entidade) => (
                <ProjetoCard key={entidade.id} nome={entidade.nome} />
              ))
            ) : (
              <p className="text-gray-500">Você não possui entidades nesta categoria.</p>
            )}
          </div>
        </section>

        {/* Seção: Cogestão */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#0d2a54] mb-6 border-b-2 border-[#195b3d] pb-2">
            Cogestão
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isLoading ? (
              <p className="text-gray-500">Carregando...</p>
            ) : entidadesCogestao.length > 0 ? (
              entidadesCogestao.map((entidade) => (
                <ProjetoCard key={entidade.id} nome={entidade.nome} />
              ))
            ) : (
              <p className="text-gray-500">Nenhuma entidade em cogestão.</p>
            )}
          </div>
        </section>

        {/* Seção: Sou Membro */}
        <section>
          <h2 className="text-2xl font-bold text-[#0d2a54] mb-6 border-b-2 border-[#195b3d] pb-2">
            Sou Membro
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isLoading ? (
              <p className="text-gray-500">Carregando...</p>
            ) : entidadesMembro.length > 0 ? (
              entidadesMembro.map((entidade) => (
                <ProjetoCard key={entidade.id} nome={entidade.nome} />
              ))
            ) : (
              <p className="text-gray-500">Você não é membro de nenhuma entidade.</p>
            )}
          </div>
        </section>
      </main>

      <CreateEntidadeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}