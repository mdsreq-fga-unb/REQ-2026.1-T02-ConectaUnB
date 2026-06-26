"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { Trash2, X } from 'lucide-react';
import { Sidebar } from '@/components/Sidebar';
import { ButtonGreen } from '@/components/ButtonGreen';
import { ProjetoCard } from '@/components/projetoCard';
import { CreateEntidadeModal } from '@/components/CreateEntidadeModal';
import { api } from '@/guards/api';
import { CAMPUS_OPTIONS, ClassificacaoEntidade, ClassificacaoMembro, DEPARTAMENTO_OPTIONS } from '@/constants/options';

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

type MembroEntidade = {
  id: number;
  idPerfil: number;
  classificacao: 'GESTOR' | 'CO_GESTOR' | 'MEMBRO';
  perfil: {
    id: number;
    name: string;
    email: string;
  };
};

type EntidadeDetalhada = EntidadeResumo & {
  membros: MembroEntidade[];
};

type MemberManagerModalProps = {
  entidade: EntidadeResumo | null;
  onClose: () => void;
  onChanged: () => void;
};

function getErrorMessage(error: unknown) {
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof error.response === 'object' &&
    error.response !== null &&
    'data' in error.response &&
    typeof error.response.data === 'object' &&
    error.response.data !== null &&
    'message' in error.response.data
  ) {
    const message = error.response.data.message;
    return Array.isArray(message) ? message.join('\n') : String(message);
  }

  return 'Não foi possível concluir a ação. Tente novamente.';
}

function MemberManagerModal({ entidade, onClose, onChanged }: MemberManagerModalProps) {
  const [detalhe, setDetalhe] = useState<EntidadeDetalhada | null>(null);
  const [email, setEmail] = useState('');
  const [classificacao, setClassificacao] = useState('MEMBRO');
  const [editForm, setEditForm] = useState({
    nome: '',
    descricao: '',
    classificacao: '',
    campus: '',
    departamento: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!entidade) return;
    const entidadeId = entidade.id;

    async function fetchDetalhe() {
      setIsLoading(true);
      setErrorMessage('');
      try {
        const response = await api.get(`/entidade/${entidadeId}`);
        setDetalhe(response.data);
        setEditForm({
          nome: response.data.nome ?? '',
          descricao: response.data.descricao ?? '',
          classificacao: response.data.classificacao ?? '',
          campus: response.data.campus ?? '',
          departamento: response.data.departamento ?? '',
        });
      } catch (error) {
        console.error('Erro ao buscar membros da entidade:', error);
        setErrorMessage(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    }

    fetchDetalhe();
  }, [entidade]);

  if (!entidade) return null;

  const canManage = entidade.vinculo.classificacao === 'GESTOR' || entidade.vinculo.classificacao === 'CO_GESTOR';
  const canDelete = entidade.vinculo.classificacao === 'GESTOR';

  const refreshDetalhe = async () => {
    const response = await api.get(`/entidade/${entidade.id}`);
    setDetalhe(response.data);
  };

  const handleAddMember = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await api.post(`/entidade/${entidade.id}/membros`, {
        email,
        classificacao,
      });
      setEmail('');
      setClassificacao('MEMBRO');
      await refreshDetalhe();
    } catch (error) {
      console.error('Erro ao adicionar membro:', error);
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemoveMember = async (memberIdPerfil: number) => {
    const shouldRemove = window.confirm('Remover este membro da entidade?');
    if (!shouldRemove) return;

    setIsSaving(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await api.delete(`/entidade/${entidade.id}/membros/${memberIdPerfil}`);
      await refreshDetalhe();
    } catch (error) {
      console.error('Erro ao remover membro:', error);
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateEntidade = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await api.patch(`/entidade/${entidade.id}`, {
        nome: editForm.nome,
        descricao: editForm.descricao || undefined,
        classificacao: editForm.classificacao,
        campus: editForm.campus,
        departamento: editForm.departamento,
      });
      await refreshDetalhe();
      onChanged();
      setSuccessMessage('Mudanças salvas com sucesso');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Erro ao editar entidade:', error);
      setErrorMessage(`${getErrorMessage(error)} Por favor, verifique os dados informados ou tente novamente mais tarde.`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteEntidade = async () => {
    const shouldDelete = window.confirm('Excluir esta entidade? Projetos, membros e conteúdos vinculados também serão removidos.');
    if (!shouldDelete) return;

    setIsSaving(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await api.delete(`/entidade/${entidade.id}`);
      window.alert('Entidade excluida com sucesso');
      onChanged();
      onClose();
    } catch (error) {
      console.error('Erro ao excluir entidade:', error);
      window.alert('Tivemos um problema ao apagar essa entidade, tente de novo mais tarde');
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl">
        <div className="flex items-start justify-between gap-4 p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-[#0d2a54]">{entidade.nome}</h2>
            <p className="text-sm text-gray-500">Gerenciamento de membros</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Fechar">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {errorMessage ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          ) : null}

          {successMessage ? (
            <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {successMessage}
            </div>
          ) : null}

          {canManage ? (
            <form onSubmit={handleUpdateEntidade} className="space-y-4 rounded-md border border-gray-100 p-4">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-sm font-semibold text-[#0d2a54]">Dados da entidade</h3>
                {canDelete ? (
                  <button
                    type="button"
                    onClick={handleDeleteEntidade}
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100 disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                    Excluir
                  </button>
                ) : null}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input
                  type="text"
                  name="nome"
                  required
                  value={editForm.nome}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#195b3d] focus:border-[#195b3d] outline-none text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  name="descricao"
                  value={editForm.descricao}
                  onChange={handleEditInputChange}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#195b3d] focus:border-[#195b3d] outline-none text-black"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Classificação</label>
                  <select
                    name="classificacao"
                    required
                    value={editForm.classificacao}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#195b3d] focus:border-[#195b3d] outline-none bg-white text-black"
                  >
                    {ClassificacaoEntidade.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Campus</label>
                  <select
                    name="campus"
                    required
                    value={editForm.campus}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#195b3d] focus:border-[#195b3d] outline-none bg-white text-black"
                  >
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
                    required
                    value={editForm.departamento}
                    onChange={handleEditInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#195b3d] focus:border-[#195b3d] outline-none bg-white text-black"
                  >
                    {DEPARTAMENTO_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 text-sm font-medium text-white bg-[#195b3d] rounded-md hover:bg-[#13472f] transition-colors disabled:opacity-50"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          ) : null}

          {canManage ? (
            <form onSubmit={handleAddMember} className="grid grid-cols-1 md:grid-cols-[1fr_180px_auto] gap-3 items-end">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail do usuário</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#195b3d] focus:border-[#195b3d] outline-none text-black"
                  placeholder="Ex: usuario@unb.br"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Papel</label>
                <select
                  value={classificacao}
                  onChange={(event) => setClassificacao(event.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#195b3d] focus:border-[#195b3d] outline-none bg-white text-black"
                >
                  {ClassificacaoMembro.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2 text-sm font-medium text-white bg-[#195b3d] rounded-md hover:bg-[#13472f] transition-colors disabled:opacity-50"
              >
                Adicionar
              </button>
            </form>
          ) : null}

          <div>
            <h3 className="text-sm font-semibold text-[#0d2a54] mb-3">Membros atuais</h3>
            {isLoading ? (
              <p className="text-gray-500">Carregando membros...</p>
            ) : detalhe?.membros?.length ? (
              <div className="divide-y divide-gray-100 border border-gray-100 rounded-md">
                {detalhe.membros.map((membro) => (
                  <div key={membro.id} className="flex items-center justify-between gap-4 p-4">
                    <div className="min-w-0">
                      <p className="font-medium text-[#1D1D1D] truncate">{membro.perfil.name}</p>
                      <p className="text-sm text-gray-500 truncate">
                        #{membro.idPerfil} - {membro.perfil.email} - {membro.classificacao}
                      </p>
                    </div>
                    {canManage ? (
                      <button
                        type="button"
                        disabled={isSaving}
                        onClick={() => handleRemoveMember(membro.idPerfil)}
                        className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md text-red-600 hover:bg-red-50 disabled:opacity-50"
                        aria-label={`Remover ${membro.perfil.name}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Nenhum membro encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EntidadesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntidade, setSelectedEntidade] = useState<EntidadeResumo | null>(null);
  const [minhasEntidades, setMinhasEntidades] = useState<EntidadeResumo[]>([]);
  const [entidadesCogestao, setEntidadesCogestao] = useState<EntidadeResumo[]>([]);
  const [entidadesMembro, setEntidadesMembro] = useState<EntidadeResumo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEntidades = useCallback(async () => {
      try {
        const response = await api.get('/entidade/minhas');
        const entidades = response.data;
        console.log("Entidades recebidas da API:", entidades);
        
        const minhas = entidades.filter((e: EntidadeResumo) =>
          e.vinculo.classificacao === 'GESTOR'
        );
        const cogestao = entidades.filter((e: EntidadeResumo) =>
          e.vinculo.classificacao === 'CO_GESTOR'
        );
        const membro = entidades.filter((e: EntidadeResumo) =>
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
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchEntidades();
  }, [fetchEntidades]);

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
                <ProjetoCard
                  key={entidade.id}
                  nome={entidade.nome}
                  descricao="Clique para gerenciar membros"
                  imagem={entidade.linkLogo || undefined}
                  onClick={() => setSelectedEntidade(entidade)}
                />
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
                <ProjetoCard
                  key={entidade.id}
                  nome={entidade.nome}
                  descricao="Clique para gerenciar membros"
                  imagem={entidade.linkLogo || undefined}
                  onClick={() => setSelectedEntidade(entidade)}
                />
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
                <ProjetoCard
                  key={entidade.id}
                  nome={entidade.nome}
                  descricao="Clique para ver membros"
                  imagem={entidade.linkLogo || undefined}
                  onClick={() => setSelectedEntidade(entidade)}
                />
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
      <MemberManagerModal
        entidade={selectedEntidade}
        onClose={() => setSelectedEntidade(null)}
        onChanged={fetchEntidades}
      />
    </div>
  );
}
