"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ButtonGreen } from '@/components/entidade/ButtonGreen';
import { ProjetoCard } from '@/components/entidade/projetoCard';
import { CreateProjetoModal } from '@/components/CreateProjetoModal';
import { api } from '@/guards/api';
import { toast } from 'sonner';

type ProjetoResumo = {
  id: number;
  idEntidade?: number;
  nome: string;
  descricao?: string | null;
  status?: string;
  dataInicio?: string;
  dataFim?: string | null;
  vinculoProjeto: 'GERENTE' | 'COLABORADOR';
  entidade?: {
    id: number;
    nome: string;
  };
};

type EntidadeResumo = {
  id: number;
  nome: string;
  vinculo: {
    classificacao: 'GESTOR' | 'CO_GESTOR' | 'MEMBRO';
  };
};

export default function ProjectsPage() {
  const [meusProjetos, setMeusProjetos] = useState<ProjetoResumo[]>([]);
  const [colaboracoes, setColaboracoes] = useState<ProjetoResumo[]>([]);
  const [entidadesGerenciaveis, setEntidadesGerenciaveis] = useState<EntidadeResumo[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProjeto, setSelectedProjeto] = useState<ProjetoResumo | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProjetos = useCallback(async () => {
    try {
      const [projetosResponse, entidadesResponse] = await Promise.all([
        api.get('/projeto/minhas'),
        api.get('/entidade/minhas'),
      ]);
      const projetos = projetosResponse.data as ProjetoResumo[];
      const entidades = entidadesResponse.data as EntidadeResumo[];

      const meus = projetos.filter((projeto) => projeto.vinculoProjeto === 'GERENTE');
      const colaborador = projetos.filter((projeto) => projeto.vinculoProjeto === 'COLABORADOR');
      const gerenciaveis = entidades.filter((entidade) =>
        entidade.vinculo.classificacao === 'GESTOR' ||
        entidade.vinculo.classificacao === 'CO_GESTOR'
      );

      setMeusProjetos(meus);
      setColaboracoes(colaborador);
      setEntidadesGerenciaveis(gerenciaveis);
    } catch (error) {
      console.error("Erro ao carregar projetos:", error);
      toast.error("Ocorreu um erro ao carregar os projetos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProjetos();
  }, [fetchProjetos]);

  const handleOpenCreateModal = () => {
    if (entidadesGerenciaveis.length === 0) {
      toast.error('Você precisa gerenciar uma entidade para criar projetos.');
      return;
    }

    setIsCreateModalOpen(true);
  };

  const handleCloseProjectModal = () => {
    setIsCreateModalOpen(false);
    setSelectedProjeto(null);
  };

  return (
    <div className="flex min-h-screen bg-[#fafafa]">

      {/* Conteúdo Principal */}
      <main className="flex-1 p-12">
        {/* Cabeçalho com o botão à direita */}
        <div className="flex justify-end mb-12">
          <ButtonGreen text="Criar Projeto" onClick={handleOpenCreateModal} />
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
                    <ProjetoCard
                      key={projeto.id}
                      nome={projeto.nome || "Projeto Sem Nome"}
                      descricao={`${projeto.entidade?.nome ?? 'Sem entidade'} - Clique para editar`}
                      onClick={() => {
                        setSelectedProjeto(projeto);
                        setIsCreateModalOpen(true);
                      }}
                    />
                  ))
                )}
              </div>
            </section>

            {/* Seção: Cogestão */}
            <section>
              <h2 className="text-2xl font-bold text-[#0d2a54] mb-6 border-b-2 border-[#195b3d] pb-2">
                Colaborações
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {colaboracoes.length === 0 ? (
                  <p className="text-gray-500">Nenhum projeto de colaboração encontrado.</p>
                ) : (
                  colaboracoes.map((projeto) => (
                    <ProjetoCard
                      key={projeto.id}
                      nome={projeto.nome || "Projeto Sem Nome"}
                      descricao={projeto.entidade?.nome}
                    />
                  ))
                )}
              </div>
            </section>
          </>
        )}
      </main>
      <CreateProjetoModal
        isOpen={isCreateModalOpen}
        entidades={entidadesGerenciaveis}
        projeto={selectedProjeto}
        onClose={handleCloseProjectModal}
        onCreated={fetchProjetos}
      />
    </div>
  );
}
