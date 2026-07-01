"use client";
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, User } from 'lucide-react';
import { ButtonGreen } from '@/components/ButtonGreen';
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

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<EntidadeBusca[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [followingIds, setFollowingIds] = useState<Set<number>>(new Set());

  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

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

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await api.get('/entidade/buscar', { params: { q: searchQuery } });
        setSearchResults(res.data);
        setShowResults(true);
      } catch {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSeguir = async (id: number) => {
    try {
      await api.post(`/entidade/${id}/seguir`);
      setFollowingIds((prev) => new Set(prev).add(id));
    } catch {
      console.error('Erro ao seguir entidade');
    }
  };

  const classLabel = (c: string) =>
    c.replaceAll('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      <main className="flex-1 p-12">
        <div className="flex justify-between items-center mb-12 gap-4">
          <div ref={searchRef} className="relative flex-1 max-w-md">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Buscar entidades..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => { if (searchResults.length > 0) setShowResults(true); }}
                className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 bg-white text-[#0d2a54] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#195b3d] focus:border-transparent text-sm"
              />
              {isSearching && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-[#195b3d] border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
            {showResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((entidade) => (
                    <div
                      key={entidade.id}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    >
                      <div
                        className="flex-1 flex items-center gap-3 min-w-0 cursor-pointer"
                        onClick={() => {
                          setShowResults(false);
                          router.push(`/conecta/entidades/${entidade.id}`);
                        }}
                      >
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
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSeguir(entidade.id);
                        }}
                        disabled={followingIds.has(entidade.id)}
                        className={`flex-shrink-0 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                          followingIds.has(entidade.id)
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-[#195b3d] text-white hover:bg-[#13472f]'
                        }`}
                      >
                        {followingIds.has(entidade.id) ? 'Seguindo' : 'Seguir'}
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="px-4 py-6 text-center text-sm text-gray-500">
                    Nenhuma entidade encontrada.
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
    </div>
  );
}