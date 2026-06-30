"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/guards/api";
import { CAMPUS_OPTIONS, DEPARTAMENTO_OPTIONS } from "@/constants/options";
import { ProjetoCard } from "@/components/entidade/projetoCard";

type EntidadeResumo = {
  id: number;
  nome: string;
  descricao?: string | null;
  classificacao?: string;
  campus?: string;
  departamento?: string;
  linkLogo?: string | null;
};

type Filtros = {
  campus: string;
  departamento: string;
  nome: string;
};

export default function HomePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const [entidades, setEntidades] = useState<EntidadeResumo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filtros, setFiltros] = useState<Filtros>({
    campus: "",
    departamento: "",
    nome: "",
  });

  const fetchEntidades = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/entidade");
      setEntidades(response.data);
    } catch (error) {
      console.error("Erro ao buscar entidades:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntidades();
  }, [fetchEntidades]);

  const nomesEntidades = useMemo(() => {
    const nomes = entidades
      .map((e) => e.nome)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
    return Array.from(new Set(nomes));
  }, [entidades]);

  const entidadesFiltradas = useMemo(() => {
    return entidades.filter((entidade) => {
      if (filtros.campus && entidade.campus !== filtros.campus) return false;
      if (filtros.departamento && entidade.departamento !== filtros.departamento)
        return false;
      if (filtros.nome && entidade.nome !== filtros.nome) return false;
      return true;
    });
  }, [entidades, filtros]);

  const filtrosAtivos =
    Boolean(filtros.campus) ||
    Boolean(filtros.departamento) ||
    Boolean(filtros.nome);

  const handleFiltroChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const limparFiltros = () => {
    setFiltros({ campus: "", departamento: "", nome: "" });
  };

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
    <div className="flex min-h-screen bg-gray-50 text-[#1D1D1D]">
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <div className="flex justify-between items-start gap-4 mb-2">
            <h1 className="text-3xl font-bold text-[#003366]">
              Painel do ConectaUnB
            </h1>
            <button
              onClick={logout}
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors"
            >
              Sair da Conta
            </button>
          </div>

          <p className="text-gray-600 mb-4">
            Logado como:{" "}
            <span className="font-semibold text-green-700">{user.email}</span>
          </p>

          <div className="p-4 border border-gray-200 rounded-lg mb-8">
            <h2 className="font-semibold mb-2">Seus Dados de Sessão:</h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li><strong>ID no Banco:</strong> {user.sub}</li>
              <li><strong>Sessão expira em:</strong> {new Date(user.exp * 1000).toLocaleTimeString()}</li>
            </ul>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-8">
          <section className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#0d2a54] border-b-2 border-[#195b3d] pb-2">
                Entidades
              </h2>
              {filtrosAtivos ? (
                <button
                  type="button"
                  onClick={limparFiltros}
                  className="px-4 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Limpar filtros
                </button>
              ) : null}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campus</label>
                <select
                  name="campus"
                  value={filtros.campus}
                  onChange={handleFiltroChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#195b3d] focus:border-[#195b3d] outline-none bg-white text-black"
                >
                  <option value="">Todos</option>
                  {CAMPUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                <select
                  name="departamento"
                  value={filtros.departamento}
                  onChange={handleFiltroChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#195b3d] focus:border-[#195b3d] outline-none bg-white text-black"
                >
                  <option value="">Todos</option>
                  {DEPARTAMENTO_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Entidade</label>
                <select
                  name="nome"
                  value={filtros.nome}
                  onChange={handleFiltroChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#195b3d] focus:border-[#195b3d] outline-none bg-white text-black"
                >
                  <option value="">Todas</option>
                  {nomesEntidades.map((nome) => (
                    <option key={nome} value={nome}>
                      {nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {isLoading ? (
                <p className="text-gray-500">Carregando...</p>
              ) : entidadesFiltradas.length > 0 ? (
                entidadesFiltradas.map((entidade) => (
                  <ProjetoCard
                    key={entidade.id}
                    nome={entidade.nome}
                    descricao={entidade.descricao ?? ""}
                    imagem={entidade.linkLogo || undefined}
                    onClick={() => router.push(`/conecta/entidades/${entidade.id}`)}
                    vinculo="MEMBRO"
                  />
                ))
              ) : (
                <p className="text-gray-500">Nenhuma entidade encontrada para os filtros.</p>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
