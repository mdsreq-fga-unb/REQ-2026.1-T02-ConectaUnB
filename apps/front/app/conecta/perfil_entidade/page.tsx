"use client";

import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { ProjetoCardLarge } from '@/components/ProjetoCardLarge';
import { api } from '@/guards/api';

type Entidade = {
  id: number;
  nome: string;
  descricao?: string | null;
  classificacao: string;
  campus: string;
  departamento: string;
  linkBanner?: string | null;
  linkLogo?: string | null;
};

type Projeto = {
  id: number;
  idEntidade: number;
  nome: string;
  linkFoto?: string | null;
};

export default function PerfilEntidadePage() {
  const [entidade, setEntidade] = useState<Entidade | null>(null);
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const carregarPerfil = async () => {
      const idParam = new URLSearchParams(window.location.search).get('id');
      const entidadeId = Number(idParam);

      if (!idParam || !Number.isInteger(entidadeId) || entidadeId <= 0) {
        setError('Informe uma entidade valida na URL, por exemplo: /perfil_entidade?id=1.');
        setLoading(false);
        return;
      }

      try {
        const [entidadeResponse, projetosResponse] = await Promise.all([
          api.get<Entidade>(`/entidade/${entidadeId}`),
          api.get<Projeto[]>('/projeto'),
        ]);

        if (!entidadeResponse.data) {
          setError('Entidade nao encontrada.');
          return;
        }

        setEntidade(entidadeResponse.data);
        setProjetos(
          projetosResponse.data.filter(
            (projeto) => projeto.idEntidade === entidadeId,
          ),
        );
      } catch (requestError) {
        console.error('Erro ao carregar perfil da entidade:', requestError);
        setError('Nao foi possivel carregar as informacoes da entidade.');
      } finally {
        setLoading(false);
      }
    };

    void carregarPerfil();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-white">
        <main className="flex flex-1 items-center justify-center">
          <p className="text-gray-600">Carregando entidade...</p>
        </main>
      </div>
    );
  }

  if (error || !entidade) {
    return (
      <div className="flex min-h-screen bg-white">
        <main className="flex flex-1 items-center justify-center px-8">
          <p className="max-w-xl text-center text-red-600">
            {error || 'Entidade nao encontrada.'}
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white">

      <main className="flex-1 overflow-y-auto bg-white">
        <div
          className="h-48 w-full bg-[#E0E0E0] bg-cover bg-center"
          style={
            entidade.linkBanner
              ? { backgroundImage: `url(${entidade.linkBanner})` }
              : undefined
          }
        />

        <div className="mx-auto max-w-5xl px-8 pb-12">
          <div className="-mt-16 flex items-start justify-between gap-6">
            <div className="min-w-0">
              {entidade.linkLogo ? (
                <img
                  src={entidade.linkLogo}
                  alt={`Logo da entidade ${entidade.nome}`}
                  className="h-32 w-32 rounded-full border-4 border-white bg-white object-cover shadow-sm"
                />
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-[#A3A3A3] text-4xl font-bold text-white shadow-sm">
                  {entidade.nome.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="mt-4">
                <h1 className="text-2xl font-bold text-black">
                  {entidade.nome}
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  {entidade.campus} | {entidade.departamento}
                </p>
                <p className="mt-1 text-xs font-medium text-[#195b3d]">
                  {entidade.classificacao.replaceAll('_', ' ')}
                </p>
              </div>
            </div>

            <div className="mt-20 flex items-center gap-4">
              <button
                type="button"
                className="rounded-full bg-[#195b3d] px-6 py-2 font-medium text-white transition-colors hover:bg-[#12452c]"
              >
                Seguir
              </button>
              <button
                type="button"
                aria-label="Ativar notificacoes da entidade"
                className="text-[#003366] transition-colors hover:text-[#001a33]"
              >
                <Bell size={24} fill="currentColor" />
              </button>
            </div>
          </div>

          <section className="mt-10 rounded-lg border border-[#195b3d] p-6 shadow-sm">
            <h2 className="mb-4 font-bold text-black">Sobre</h2>
            <p className="whitespace-pre-line text-sm leading-6 text-gray-700">
              {entidade.descricao || 'Esta entidade ainda nao possui descricao.'}
            </p>
          </section>

          <section className="mt-12">
            <h2 className="mb-2 text-lg font-bold text-[#003366]">Projetos</h2>
            <hr className="mb-6 border-t-[1.5px] border-[#195b3d]" />

            {projetos.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {projetos.map((projeto) => (
                  <ProjetoCardLarge
                    key={projeto.id}
                    nome={projeto.nome}
                    imagem={projeto.linkFoto || undefined}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Nenhum projeto cadastrado para esta entidade.
              </p>
            )}
          </section>

          <section className="mt-12">
            <h2 className="mb-2 text-lg font-bold text-[#003366]">
              Publicacoes
            </h2>
            <hr className="mb-6 border-t-[1.5px] border-[#195b3d]" />
            <p className="text-sm text-gray-500">
              Nenhuma publicacao disponivel.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
