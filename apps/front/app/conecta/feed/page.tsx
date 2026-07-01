"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, User, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/guards/api";
import {
  CAMPUS_OPTIONS,
  DEPARTAMENTO_OPTIONS,
  ClassificacaoEntidade,
} from "@/constants/options";
import { PostagemCardFeed } from "@/components/PostagemCardFeed";
import { PostagemModal, type PostagemDetalhe } from "@/components/PostagemModal";

type EntidadeResumo = {
  id: number;
  nome: string;
  descricao?: string | null;
  classificacao?: string;
  campus?: string;
  departamento?: string;
  linkLogo?: string | null;
};

type EntidadeBusca = {
  id: number;
  nome: string;
  classificacao: string;
  campus: string;
  linkLogo: string | null;
};

type Postagem = {
  id: number;
  idEntidade: number;
  titulo: string;
  conteudo: string;
  linkFoto?: string | null;
  createdAt?: string;
};

type Filtros = {
  campus: string;
  departamento: string;
  classificacao: string;
};

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [postagens, setPostagens] = useState<Postagem[]>([]);
  const [entidades, setEntidades] = useState<EntidadeResumo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filtros, setFiltros] = useState<Filtros>({
    campus: "",
    departamento: "",
    classificacao: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<EntidadeBusca[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [followingIds, setFollowingIds] = useState<Set<number>>(new Set());
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const [postagemSelecionada, setPostagemSelecionada] =
    useState<PostagemDetalhe | null>(null);

  const fetchDados = useCallback(async () => {
    setIsLoading(true);
    try {
      const [postagensRes, entidadesRes] = await Promise.all([
        api.get<Postagem[]>("/postagem"),
        api.get<EntidadeResumo[]>("/entidade"),
      ]);
      setPostagens(postagensRes.data);
      setEntidades(entidadesRes.data);
    } catch (error) {
      console.error("Erro ao buscar dados do feed:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDados();
  }, [fetchDados]);

  const entidadesMap = useMemo(() => {
    const map = new Map<number, EntidadeResumo>();
    entidades.forEach((e) => map.set(e.id, e));
    return map;
  }, [entidades]);

  const postagensFiltradas = useMemo<PostagemDetalhe[]>(() => {
    return postagens
      .map((postagem): PostagemDetalhe => {
        const entidade = entidadesMap.get(postagem.idEntidade);
        return {
          id: postagem.id,
          idEntidade: postagem.idEntidade,
          titulo: postagem.titulo,
          conteudo: postagem.conteudo,
          linkFoto: postagem.linkFoto ?? null,
          dataPublicacao: postagem.createdAt
            ? new Date(postagem.createdAt).toLocaleDateString("pt-BR")
            : undefined,
          entidadeNome: entidade?.nome ?? "Entidade",
          entidadeLogo: entidade?.linkLogo ?? null,
        };
      })
      .filter((postagem) => {
        const entidade = entidadesMap.get(postagem.idEntidade);
        if (!entidade) return false;
        if (filtros.campus && entidade.campus !== filtros.campus) return false;
        if (filtros.departamento && entidade.departamento !== filtros.departamento)
          return false;
        if (filtros.classificacao && entidade.classificacao !== filtros.classificacao)
          return false;
        return true;
      });
  }, [postagens, entidadesMap, filtros]);

  const filtrosAtivos =
    Boolean(filtros.campus) ||
    Boolean(filtros.departamento) ||
    Boolean(filtros.classificacao);

  const handleFiltroChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const limparFiltros = () => {
    setFiltros({ campus: "", departamento: "", classificacao: "" });
  };

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
        const res = await api.get("/entidade/buscar", {
          params: { q: searchQuery },
        });
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSeguir = async (id: number) => {
    try {
      await api.post(`/entidade/${id}/seguir`);
      setFollowingIds((prev) => new Set(prev).add(id));
    } catch {
      console.error("Erro ao seguir entidade");
    }
  };

  const classLabel = (c: string) =>
    c.replaceAll("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());

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
    <div className="p-8 bg-gray-50 text-[#1D1D1D]">
      <div className="max-w-4xl mx-auto">
        {/* Barra superior: filtros + buscar entidades à direita deles */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          {/* Filtros compactos */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d2a54]">
              <SlidersHorizontal size={16} /> Filtros
            </span>

            <select
              name="campus"
              value={filtros.campus}
              onChange={handleFiltroChange}
              className="min-w-[7rem] px-2.5 py-2 rounded-md border border-gray-300 bg-white text-black text-sm focus:ring-2 focus:ring-[#195b3d] focus:border-transparent outline-none"
            >
              <option value="">Campus</option>
              {CAMPUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              name="departamento"
              value={filtros.departamento}
              onChange={handleFiltroChange}
              className="min-w-[8rem] px-2.5 py-2 rounded-md border border-gray-300 bg-white text-black text-sm focus:ring-2 focus:ring-[#195b3d] focus:border-transparent outline-none"
            >
              <option value="">Departamento</option>
              {DEPARTAMENTO_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              name="classificacao"
              value={filtros.classificacao}
              onChange={handleFiltroChange}
              className="min-w-[8rem] px-2.5 py-2 rounded-md border border-gray-300 bg-white text-black text-sm focus:ring-2 focus:ring-[#195b3d] focus:border-transparent outline-none"
            >
              <option value="">Tipos</option>
              {ClassificacaoEntidade.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {filtrosAtivos ? (
              <button
                type="button"
                onClick={limparFiltros}
                className="inline-flex items-center gap-1 px-2.5 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                <X size={14} /> Limpar
              </button>
            ) : null}
          </div>

          {/* Buscar entidades */}
          <div ref={searchRef} className="relative w-56">
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
                onFocus={() => {
                  if (searchResults.length > 0) setShowResults(true);
                }}
                className="w-full pl-10 pr-4 py-2.5 rounded-md border border-gray-300 bg-white text-[#0d2a54] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#195b3d] focus:border-transparent text-sm"
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
                            {classLabel(entidade.classificacao)} &middot;{" "}
                            {entidade.campus}
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
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-[#195b3d] text-white hover:bg-[#13472f]"
                        }`}
                      >
                        {followingIds.has(entidade.id) ? "Seguindo" : "Seguir"}
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
        </div>

        {/* Publicações */}
        <section>
          <div className="flex flex-col gap-4">
            {isLoading ? (
              <p className="text-gray-500">Carregando publicações...</p>
            ) : postagensFiltradas.length > 0 ? (
              postagensFiltradas.map((postagem) => (
                <PostagemCardFeed
                  key={postagem.id}
                  postagem={postagem}
                  vinculo={null}
                  onClick={() => setPostagemSelecionada(postagem)}
                />
              ))
            ) : (
              <p className="text-gray-500">
                Nenhuma publicação encontrada para os filtros.
              </p>
            )}
          </div>
        </section>
      </div>

      <PostagemModal
        isOpen={!!postagemSelecionada}
        onClose={() => setPostagemSelecionada(null)}
        postagem={postagemSelecionada}
        vinculo={null}
      />
    </div>
  );
}
