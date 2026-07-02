"use client";
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, User } from 'lucide-react';
import { ButtonGreen } from '@/components/ButtonGreen';
import { ProjetoCard } from '@/components/entidade/projetoCard';
import { CreateEntidadeModal } from '@/components/entidade/CreateEntidadeModal';
import { ManageMembersModal } from '@/components/entidade/ManageMembersModal';
import { EditEntidadeModal } from '@/components/entidade/EditEntidadeModal';
import { ProcessoSeletivoViewModal } from '@/components/ProcessoSeletivoViewModal';
import { type ProcessoSeletivo } from '@/components/ProcessoSeletivoFormModal';
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

type EntidadeBusca = {
  id: number;
  nome: string;
  classificacao: string;
  campus: string;
  linkLogo: string | null;
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

  const [processosAbertos, setProcessosAbertos] = useState<ProcessoSeletivo[]>([]);
  const [psSearchQuery, setPsSearchQuery] = useState('');
  const [psSearchResults, setPsSearchResults] = useState<EntidadeBusca[]>([]);
  const [psIsSearching, setPsIsSearching] = useState(false);
  const [psShowResults, setPsShowResults] = useState(false);
  const [processoSelecionado, setProcessoSelecionado] = useState<ProcessoSeletivo | null>(null);

  const psSearchRef = useRef<HTMLDivElement>(null);
  const psDebounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

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

  const fetchProcessosAbertos = useCallback(async () => {
    try {
      const response = await api.get<ProcessoSeletivo[]>('/processo-seletivo');
      const agora = new Date();
      const abertos = response.data.filter(
        (p) => p.classificacao === 'ABERTA' && new Date(p.fimInscricao as string) >= agora,
      );
      setProcessosAbertos(abertos);
    } catch (error) {
      console.error('Erro ao buscar processos seletivos:', error);
    }
  }, []);

  useEffect(() => {
    fetchEntidades();
    fetchProcessosAbertos();
  }, [fetchEntidades, fetchProcessosAbertos]);

  useEffect(() => {
    if (psDebounceRef.current) clearTimeout(psDebounceRef.current);
    if (!psSearchQuery.trim()) {
      setPsSearchResults([]);
      setPsShowResults(false);
      return;
    }
    psDebounceRef.current = setTimeout(async () => {
      setPsIsSearching(true);
      try {
        const res = await api.get<EntidadeBusca[]>('/entidade/buscar', {
          params: { q: psSearchQuery },
        });
        const comProcessos = res.data.filter((entidade) =>
          processosAbertos.some((p) => p.idEntidade === entidade.id),
        );
        setPsSearchResults(comProcessos);
        setPsShowResults(true);
      } catch {
        setPsSearchResults([]);
      } finally {
        setPsIsSearching(false);
      }
    }, 300);
  }, [psSearchQuery, processosAbertos]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (psSearchRef.current && !psSearchRef.current.contains(e.target as Node)) {
        setPsShowResults(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const classLabel = (c: string) =>
    c.replaceAll('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      <main className="flex-1 p-12">
        <div className="flex justify-between items-center mb-12 gap-4">
          <div ref={psSearchRef} className="relative flex-1 max-w-md">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Buscar processos seletivos por entidade..."
                value={psSearchQuery}
                onChange={(e) => setPsSearchQuery(e.target.value)}
                onFocus={() => { if (psSearchResults.length > 0) setPsShowResults(true); }}
                className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 bg-white text-[#0d2a54] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#195b3d] focus:border-transparent text-sm"
              />
              {psIsSearching && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-[#195b3d] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
            {psShowResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
                {psSearchResults.length > 0 ? (
                  psSearchResults.map((entidade) => {
                    const processosDaEntidade = processosAbertos.filter(
                      (p) => p.idEntidade === entidade.id,
                    );
                    return (
                      <div
                        key={entidade.id}
                        className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          {entidade.linkLogo ? (
                            <img
                              src={entidade.linkLogo}
                              alt={entidade.nome}
                              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-400">
                              <User size={20} />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-medium text-[#0d2a54] text-sm truncate">
                              {entidade.nome}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {classLabel(entidade.classificacao)} &middot; {entidade.campus}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 pl-[3.25rem]">
                          {processosDaEntidade.map((processo) => (
                            <button
                              key={processo.id}
                              type="button"
                              onClick={() => {
                                setProcessoSelecionado(processo);
                                setPsShowResults(false);
                              }}
                              className="text-left text-sm text-[#195b3d] font-medium hover:underline truncate"
                            >
                              {processo.titulo}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="px-4 py-6 text-center text-sm text-gray-500">
                    Nenhum processo seletivo aberto encontrado.
                  </p>
                )}
              </div>
            )}
          </div>
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

      <ProcessoSeletivoViewModal
        isOpen={!!processoSelecionado}
        onClose={() => setProcessoSelecionado(null)}
        processo={processoSelecionado}
      />
    </div>
  );
}
