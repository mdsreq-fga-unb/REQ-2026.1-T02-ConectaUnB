"use client";
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ButtonGreen } from '@/components/entidade/ButtonGreen';
import { ProjetoCard } from '@/components/entidade/projetoCard';
import { CreateEntidadeModal } from '@/components/entidade/CreateEntidadeModal';
import { ManageMembersModal } from '@/components/entidade/ManageMembersModal';
import { EditEntidadeModal } from '@/components/entidade/EditEntidadeModal';
import { api } from '@/guards/api';

type VinculoEntidade = {
  id: number;
  classificacao: 'GESTOR' | 'CO_GESTOR' | 'MEMBRO';
  createdAt: string;
};

type EntidadeResumo = {
  id: number;
  nome: string;
  descricao?: string | null;
  classificacao?: string;
  campus?: string;
  departamento?: string;
  linkLogo?: string | null;
  vinculo: VinculoEntidade;
};

export default function EntidadesPage() {
  const router = useRouter();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const [entidadeToEdit, setEntidadeToEdit] = useState<EntidadeResumo | null>(null);
  const [entidadeToManageMembers, setEntidadeToManageMembers] = useState<EntidadeResumo | null>(null);
  
  const [minhasEntidades, setMinhasEntidades] = useState<EntidadeResumo[]>([]);
  const [entidadesCogestao, setEntidadesCogestao] = useState<EntidadeResumo[]>([]);
  const [entidadesMembro, setEntidadesMembro] = useState<EntidadeResumo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEntidades = useCallback(async () => {
    try {
      const response = await api.get('/entidade/minhas');
      const entidades = response.data;
      
      setMinhasEntidades(entidades.filter((e: EntidadeResumo) => e.vinculo.classificacao === 'GESTOR'));
      setEntidadesCogestao(entidades.filter((e: EntidadeResumo) => e.vinculo.classificacao === 'CO_GESTOR'));
      setEntidadesMembro(entidades.filter((e: EntidadeResumo) => e.vinculo.classificacao === 'MEMBRO'));
    } catch (error) {
      console.error("Erro ao buscar entidades", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntidades();
  }, [fetchEntidades]);

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      <main className="flex-1 p-12">
        <div className="flex justify-end mb-12">
          <ButtonGreen text="Criar Entidade" onClick={() => setIsCreateModalOpen(true)} />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#0d2a54] mb-6 border-b-2 border-[#195b3d] pb-2">
            Minhas Entidades
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isLoading ? <p className="text-gray-500">Carregando...</p> : minhasEntidades.length > 0 ? (
              minhasEntidades.map((entidade) => (
                <ProjetoCard
                  key={entidade.id}
                  nome={entidade.nome}
                  descricao=""
                  imagem={entidade.linkLogo || undefined}
                  onClick={() => router.push(`/conecta/entidades/${entidade.id}`)}
                  onEditClick={() => setEntidadeToEdit(entidade)}
                  onAddMemberClick={() => setEntidadeToManageMembers(entidade)}
                  vinculo={entidade.vinculo.classificacao}
                />
              ))
            ) : <p className="text-gray-500">Você não possui entidades nesta categoria.</p>}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#0d2a54] mb-6 border-b-2 border-[#195b3d] pb-2">
            Cogestão
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isLoading ? <p className="text-gray-500">Carregando...</p> : entidadesCogestao.length > 0 ? (
              entidadesCogestao.map((entidade) => (
                <ProjetoCard
                  key={entidade.id}
                  nome={entidade.nome}
                  descricao=""
                  imagem={entidade.linkLogo || undefined}
                  onClick={() => router.push(`/conecta/entidades/${entidade.id}`)}
                  onEditClick={() => setEntidadeToEdit(entidade)}
                  onAddMemberClick={() => setEntidadeToManageMembers(entidade)}
                  vinculo={entidade.vinculo.classificacao}
                />
              ))
            ) : <p className="text-gray-500">Nenhuma entidade em cogestão.</p>}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#0d2a54] mb-6 border-b-2 border-[#195b3d] pb-2">
            Sou Membro
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isLoading ? <p className="text-gray-500">Carregando...</p> : entidadesMembro.length > 0 ? (
              entidadesMembro.map((entidade) => (
                <ProjetoCard
                  key={entidade.id}
                  nome={entidade.nome}
                  descricao=""
                  imagem={entidade.linkLogo || undefined}
                  onClick={() => router.push(`/conecta/entidades/${entidade.id}`)}
                  vinculo={entidade.vinculo.classificacao}
                />
              ))
            ) : <p className="text-gray-500">Você não é membro de nenhuma entidade.</p>}
          </div>
        </section>
      </main>

      <CreateEntidadeModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSuccess={fetchEntidades}
      />

      <EditEntidadeModal
        isOpen={!!entidadeToEdit}
        entidade={entidadeToEdit}
        onClose={() => setEntidadeToEdit(null)}
        onChanged={fetchEntidades}
      />

      <ManageMembersModal
        isOpen={!!entidadeToManageMembers}
        entidade={entidadeToManageMembers}
        onClose={() => setEntidadeToManageMembers(null)}
        onChanged={fetchEntidades}
      />
    </div>
  );
}