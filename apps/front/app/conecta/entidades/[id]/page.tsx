"use client";

import { useEffect, useState, useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { ProjetoCardLarge } from '@/components/ProjetoCardLarge';
import { api } from '@/guards/api';
import { useParams } from 'next/navigation';
import { ButtonGreen } from '@/components/ButtonGreen';
import { PostagemModal, type PostagemDetalhe } from '@/components/PostagemModal';
import { ProjetoModal } from '@/components/ProjetoModal';
import { PostagemCardFeed } from '@/components/PostagemCardFeed';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { CriarProjetoModal } from '@/components/CreateProjetoModal';
import { CriarPostagemModal } from '@/components/CriarPostagemModal';
import { ConfirmModal } from '@/components/ConfirmModal';
import { EditablePhoto } from '@/components/EditablePhoto';

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
  descricao?: string | null;
  status: string;
  dataInicio: string;
  dataFim?: string | null;
  linkFoto?: string | null;
};

export default function PerfilEntidadePage() {

  const { user } = useAuth();

  const [entidade, setEntidade] = useState<Entidade | null>(null);
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const params = useParams();
  const idParam = params?.id;

  const [projetoIndex, setProjetoIndex] = useState(0);
  const [projetoSelecionado, setProjetoSelecionado] = useState<Projeto | null>(null);

  const [iniciarEditando, setIniciarEditando] = useState(false);
  const [vinculoUsuario, setVinculoUsuario] = useState<'GESTOR' | 'CO_GESTOR' | 'MEMBRO' | string | null>(null);

  const [postagens, setPostagens] = useState<PostagemDetalhe[]>([]);
  const [postagemSelecionada, setPostagemSelecionada] = useState<PostagemDetalhe | null>(null);

  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowLoading, setIsFollowLoading] = useState(false);

  const [isCriarProjetoModalOpen, setIsCriarProjetoModalOpen] = useState(false);

  const [iniciarPostagemEditando, setIniciarPostagemEditando] = useState(false);

  const [isModalDeleteProjetoOpen, setIsModalDeleteProjetoOpen] = useState(false);
  const [projetoToDelete, setProjetoToDelete] = useState<Projeto | null>(null);

  const [isModalDeletePostagemOpen, setIsModalDeletePostagemOpen] = useState(false);
  const [postagemToDelete, setPostagemToDelete] = useState<PostagemDetalhe | null>(null);

  const bannerFileRef = useRef<File | null>(null);
  const logoFileRef = useRef<File | null>(null);

  const recarregarProjetos = async () => {
    if (!entidade) return;
    try {
      const response = await api.get<Projeto[]>(`/projeto/entidade/${entidade.id}`);
      setProjetos(response.data);
    } catch (error) {
      console.error('Erro ao recarregar projetos:', error);
    }
  };

  const [isCriarPostagemModalOpen, setIsCriarPostagemModalOpen] = useState(false);

  const recarregarPostagens = async () => {
    if (!entidade) return;
    try {
      const response = await api.get(`/postagem/entidade/${entidade.id}`);
      setPostagens(response.data);
    } catch (error) {
      console.error('Erro ao recarregar postagens:', error);
    }
  };

  const handleDeletePostagem = async () => {
    if (!postagemToDelete) return;
    
    try {
      await api.delete(`/postagem/${postagemToDelete.id}`);
      toast.success('Publicação excluída com sucesso!');
      recarregarPostagens(); 
    } catch (error) {
      console.error('Erro ao excluir postagem:', error);
      toast.error('Erro ao excluir a publicação.');
    } finally {
      setIsModalDeletePostagemOpen(false);
      setPostagemToDelete(null);
    }
  };

  const handleDeleteProjeto = async () => {
    if (!projetoToDelete) return;
    
    try {
      await api.delete(`/projeto/${projetoToDelete.id}`);
      toast.success('Projeto excluído com sucesso!');
      recarregarProjetos(); 
    } catch (error) {
      console.error('Erro ao excluir projeto:', error);
      toast.error('Erro ao excluir o projeto.');
    } finally {
      setIsModalDeleteProjetoOpen(false);
      setProjetoToDelete(null);
    }
  };

useEffect(() => {
    const carregarPerfil = async () => {
      const entidadeId = Number(idParam);

      if (!idParam || !Number.isInteger(entidadeId) || entidadeId <= 0) {
        setError('Informe uma entidade valida na URL, por exemplo: /perfil_entidade?id=1.');
        setLoading(false);
        return;
      }

      try {
        const [entidadeResponse, projetosResponse, postagensResponse] = await Promise.all([
          api.get<Entidade>(`/entidade/${entidadeId}`),
          api.get<Projeto[]>(`/projeto/entidade/${entidadeId}`),
          api.get<PostagemDetalhe[]>(`/postagem/entidade/${entidadeId}`), 
        ]);

        if (!entidadeResponse.data) {
          setError('Entidade não encontrada.');
          return;
        }

        setEntidade(entidadeResponse.data);
        setProjetos(
          projetosResponse.data.filter(
            (projeto) => projeto.idEntidade === entidadeId,
          ),
        );
        setPostagens(
          postagensResponse.data.filter(
            (postagem) => postagem.idEntidade === entidadeId,
          ),
        );
        
        if (user?.sub) {
          
          try {
            const seguindoResponse = await api.get(`/perfil/seguindo/${user.sub}`);
            const segue = seguindoResponse.data.some((e: Entidade) => e.id === entidadeId);
            setIsFollowing(segue);
          } catch (err) {
            console.error('Erro ao checar status de seguindo:', err);
          }

          
          try {
            const minhasResponse = await api.get('/entidade/minhas');
            
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const minhaEntidade = minhasResponse.data.find((e: any) => e.id === entidadeId);
            
            if (minhaEntidade && minhaEntidade.vinculo) {
              setVinculoUsuario(minhaEntidade.vinculo.classificacao); 
            } else {
              setVinculoUsuario(null); 
            }
          } catch (err) {
            console.error('Erro ao checar vínculo:', err);
          }
        }

      } catch (requestError) {
        console.error('Erro ao carregar perfil da entidade:', requestError);
        setError('Não foi possível carregar as informações da entidade.');
      } finally {
        setLoading(false);
      }
    };

    void carregarPerfil();
  }, [idParam, user?.sub]); 

  const handleFollowToggle = async () => {
    if (!user) {
      alert("Você precisa estar logado para seguir uma entidade.");
      return;
    }

    if (!entidade) return;

    setIsFollowLoading(true);
    try {
      
      await api.post(`/perfil/seguir/${entidade.id}`);
      
      
      setIsFollowing((prev) => !prev);
    } catch (error) {
      console.error('Erro ao seguir/deixar de seguir:', error);
      alert('Ocorreu um erro ao tentar seguir a entidade.');
    } finally {
      setIsFollowLoading(false);
    }
  };


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
        <EditablePhoto
          src={entidade.linkBanner ?? undefined}
          alt="Banner da entidade"
          variant="overlay"
          editable={vinculoUsuario === 'GESTOR' || vinculoUsuario === 'CO_GESTOR'}
          onFileSelected={(file) => {
            bannerFileRef.current = file;
            toast('Banner selecionado', {
              description: 'A integração com o Cloudflare R2 está em breve.',
            });
          }}
          className="h-48 w-full bg-[#E0E0E0]"
          fallback={<div className="h-full w-full bg-[#E0E0E0]" />}
        />

      <div className="mx-auto max-w-5xl px-8 pb-12">
          
          <div className="mb-4 flex items-end justify-between">
            <div className="-mt-16">
              <EditablePhoto
                src={entidade.linkLogo ?? undefined}
                alt={`Logo da entidade ${entidade.nome}`}
                variant="badge"
                editable={vinculoUsuario === 'GESTOR' || vinculoUsuario === 'CO_GESTOR'}
                onFileSelected={(file) => {
                  logoFileRef.current = file;
                  toast('Logo selecionado', {
                    description: 'A integração com o Cloudflare R2 está em breve.',
                  });
                }}
                className="h-32 w-32 rounded-full border-4 border-white bg-white shadow-sm"
                fallback={
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#A3A3A3] text-4xl font-bold text-white">
                    {entidade.nome.charAt(0).toUpperCase()}
                  </div>
                }
              />
            </div>

            <button
              type="button"
              className="rounded-full bg-[#195b3d] px-6 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#12452c]"
              onClick={handleFollowToggle}
            >
              {isFollowing ? (
                <span className="group-hover:hidden">Seguindo</span>
              ) : (
                'Seguir'
              )}
            </button>
          </div>

          <div className="flex items-start justify-between gap-6">
            
            <div className="min-w-0 flex flex-col gap-1">
              <h1 className="truncate text-3xl font-bold text-black">
                {entidade.nome}
              </h1>
              <p className="truncate text-sm text-gray-600">
                {entidade.campus} | {entidade.departamento}
              </p>
              
              <div className="mt-1">
                <span className="inline-block rounded-md bg-[#195b3d]/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[#195b3d]">
                  {entidade.classificacao.replaceAll('_', ' ')}
                </span>
              </div>
            </div>

            {/* Botão de Processo Seletivo */}
            {/* <div className="flex shrink-0 items-center pt-2">
              <ButtonGreen
                text="Criar Processo Seletivo"
                onClick={() => {
                  
                }}
              />
            </div> */}
          </div>

          <section className="mt-10 rounded-lg border border-[#195b3d] p-6 shadow-sm">
            <h2 className="mb-4 font-bold text-black">Sobre</h2>
            <p className="whitespace-pre-line text-sm leading-6 text-gray-700">
              {entidade.descricao || 'Esta entidade ainda nao possui descricao.'}
            </p>
          </section>

          <section className="mt-12">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#003366]">Projetos</h2>
              
              {(vinculoUsuario === 'GESTOR' || vinculoUsuario === 'CO_GESTOR') && (
                <ButtonGreen
                  text="Criar Projeto"
                  onClick={() => setIsCriarProjetoModalOpen(true)}
                />
              )}
              
            </div>
            <hr className="mb-6 border-t-[1.5px] border-[#195b3d]" />

            {projetos.length > 0 ? (
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setProjetoIndex((prev) => Math.max(0, prev - 1))}
                  disabled={projetoIndex === 0}
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    projetoIndex === 0
                      ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                      : 'border-[#195b3d] text-[#195b3d] hover:bg-[#195b3d]/10'
                  }`}
                >
                  <ChevronLeft size={24} />
                </button>

                <div className="flex-1 overflow-hidden">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {projetos
                      .slice(projetoIndex, projetoIndex + 3)
                      .map((projeto) => (
                        <ProjetoCardLarge
                          key={projeto.id}
                          nome={projeto.nome}
                          status={projeto.status}
                          imagem={projeto.linkFoto || undefined}
                          vinculo={vinculoUsuario} 
                          onClick={() => {
                            setIniciarEditando(false); 
                            setProjetoSelecionado(projeto); 
                          }}
                          onEditClick={() => {
                            setIniciarEditando(true);  
                            setProjetoSelecionado(projeto); 
                          }}
                          onDeleteClick={() => {
                            setProjetoToDelete(projeto);
                            setIsModalDeleteProjetoOpen(true);
                          }}
                        />
                      ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setProjetoIndex((prev) => prev + 1)}
                  disabled={projetoIndex + 3 >= projetos.length}
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    projetoIndex + 3 >= projetos.length
                      ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                      : 'border-[#195b3d] text-[#195b3d] hover:bg-[#195b3d]/10'
                  }`}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Nenhum projeto cadastrado para esta entidade.
              </p>
            )}
          </section>
          <section className="mt-12">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#003366]">Publicações</h2>
              {(vinculoUsuario === 'GESTOR' || vinculoUsuario === 'CO_GESTOR') && (
                <ButtonGreen
                  text="Criar Publicação"
                  onClick={() => setIsCriarPostagemModalOpen(true)}
                />
              )}
            </div>
            <hr className="mb-6 border-t-[1.5px] border-[#195b3d]" />
            
            {postagens.length > 0 ? (
              <div className="flex flex-col gap-4">
                {postagens.map((postagem) => {
                  
                  const postagemCompleta = {
                    ...postagem,
                    entidadeNome: entidade?.nome || 'Entidade',
                    entidadeLogo: entidade?.linkLogo || null
                  };

                  return (
                    <PostagemCardFeed
                      key={postagem.id}
                      postagem={postagemCompleta}
                      vinculo={vinculoUsuario} 
                      onClick={() => {
                        setPostagemSelecionada(postagemCompleta);
                        setIniciarPostagemEditando(false); 
                      }}
                      onEditClick={() => {
                        setPostagemSelecionada(postagemCompleta);
                        setIniciarPostagemEditando(true); 
                      }}
                      onDeleteClick={() => {
                        setPostagemToDelete(postagemCompleta);
                        setIsModalDeletePostagemOpen(true);
                      }}
                    />
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Nenhuma publicação disponível.
              </p>
            )}
          </section>
        </div>
      </main>

      <PostagemModal
        isOpen={!!postagemSelecionada}
        onClose={() => setPostagemSelecionada(null)}
        postagem={postagemSelecionada}
        startEditing={iniciarPostagemEditando} 
        vinculo={vinculoUsuario} 
        onSuccess={recarregarPostagens} 
      />
      <ProjetoModal
        isOpen={!!projetoSelecionado}
        onClose={() => setProjetoSelecionado(null)}
        projeto={projetoSelecionado}
        startEditing={iniciarEditando}
        vinculo={vinculoUsuario} 
        onSuccess={recarregarProjetos} 
      />
      {entidade && (
        <CriarProjetoModal
          isOpen={isCriarProjetoModalOpen}
          onClose={() => setIsCriarProjetoModalOpen(false)}
          idEntidade={entidade.id}
          onSuccess={recarregarProjetos}
        />
      )}
      {entidade && (
        <CriarPostagemModal
          isOpen={isCriarPostagemModalOpen}
          onClose={() => setIsCriarPostagemModalOpen(false)}
          idEntidade={entidade.id}
          onSuccess={recarregarPostagens}
        />
      )}
      <ConfirmModal
        isOpen={isModalDeleteProjetoOpen}
        title="Excluir Projeto"
        description={`Tem certeza que deseja excluir o projeto "${projetoToDelete?.nome}"? Esta ação não pode ser desfeita e todos os dados serão perdidos.`}
        confirmText="Confirmar Exclusão"
        variant="danger"
        onClose={() => {
          setIsModalDeleteProjetoOpen(false);
          setProjetoToDelete(null);
        }}
        onConfirm={handleDeleteProjeto}
      />
      <ConfirmModal
        isOpen={isModalDeletePostagemOpen}
        title="Excluir Publicação"
        description={`Tem certeza que deseja excluir a publicação "${postagemToDelete?.titulo}"? Esta ação não pode ser desfeita.`}
        confirmText="Confirmar Exclusão"
        variant="danger"
        onClose={() => {
          setIsModalDeletePostagemOpen(false);
          setPostagemToDelete(null);
        }}
        onConfirm={handleDeletePostagem}
      />
    </div>
  );
}
