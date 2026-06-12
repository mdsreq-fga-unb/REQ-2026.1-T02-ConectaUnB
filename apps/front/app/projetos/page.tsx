import React from 'react';
import { Sidebar } from '@/app/components/Sidebar';
import { ButtonGreen } from '@/app/components/ButtonGreen';
import { ProjetoCard } from '@/app/components/projetoCard';

export default function ProjectsPage() {
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

        {/* Seção: Meus Projetos */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#0d2a54] mb-6 border-b-2 border-[#195b3d] pb-2">
            Meus Projetos
          </h2>
          {/* Grid responsivo: 1 coluna no mobile, 2 colunas em telas médias para cima */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjetoCard nome="Projeto 01" />
            <ProjetoCard nome="Projeto 02" />
            <ProjetoCard nome="Projeto 03" />
            <ProjetoCard nome="Projeto 04" />
          </div>
        </section>

        {/* Seção: Cogestão */}
        <section>
          <h2 className="text-2xl font-bold text-[#0d2a54] mb-6 border-b-2 border-[#195b3d] pb-2">
            Cogestão
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjetoCard nome="Projeto 01" />
            <ProjetoCard nome="Projeto 02" />
            <ProjetoCard nome="Projeto 03" />
            <ProjetoCard nome="Projeto 04" />
          </div>
        </section>
      </main>
    </div>
  );
}