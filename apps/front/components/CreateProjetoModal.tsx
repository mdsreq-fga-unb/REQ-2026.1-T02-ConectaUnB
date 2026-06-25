import React, { useEffect, useState } from 'react';
import { Trash2, X } from 'lucide-react';
import { StatusProjeto } from '@/constants/options';
import { api } from '@/guards/api';

type EntidadeGerenciavel = {
  id: number;
  nome: string;
};

type ProjetoEditavel = {
  id: number;
  idEntidade?: number;
  nome: string;
  descricao?: string | null;
  status?: string;
  dataInicio?: string;
  dataFim?: string | null;
};

type CreateProjetoModalProps = {
  isOpen: boolean;
  entidades: EntidadeGerenciavel[];
  projeto?: ProjetoEditavel | null;
  onClose: () => void;
  onCreated: () => void;
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

  return 'Não foi possível criar o projeto. Tente novamente.';
}

export function CreateProjetoModal({
  isOpen,
  entidades,
  projeto,
  onClose,
  onCreated,
}: CreateProjetoModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    idEntidade: '',
    nome: '',
    descricao: '',
    status: 'PLANEJAMENTO',
    dataInicio: '',
    dataFim: '',
  });
  const isEditing = Boolean(projeto);

  useEffect(() => {
    if (!isOpen) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setErrorMessage('');
    setFormData({
      idEntidade: projeto?.idEntidade ? String(projeto.idEntidade) : '',
      nome: projeto?.nome ?? '',
      descricao: projeto?.descricao ?? '',
      status: projeto?.status ?? 'PLANEJAMENTO',
      dataInicio: projeto?.dataInicio ? projeto.dataInicio.slice(0, 10) : '',
      dataFim: projeto?.dataFim ? projeto.dataFim.slice(0, 10) : '',
    });
  }, [isOpen, projeto]);

  if (!isOpen) return null;

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const payload = {
        nome: formData.nome,
        descricao: formData.descricao || undefined,
        status: formData.status,
        dataInicio: formData.dataInicio,
        dataFim: formData.dataFim || undefined,
      };

      if (projeto) {
        await api.patch(`/projeto/${projeto.id}`, payload);
      } else {
        await api.post('/projeto', {
          ...payload,
          idEntidade: Number(formData.idEntidade),
        });
      }

      onCreated();
      onClose();
      setFormData({
        idEntidade: '',
        nome: '',
        descricao: '',
        status: 'PLANEJAMENTO',
        dataInicio: '',
        dataFim: '',
      });
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!projeto) return;

    const shouldDelete = window.confirm('Excluir este projeto? Esta ação não pode ser desfeita.');
    if (!shouldDelete) return;

    setIsLoading(true);
    setErrorMessage('');

    try {
      await api.delete(`/projeto/${projeto.id}`);
      onCreated();
      onClose();
    } catch (error) {
      console.error('Erro ao excluir projeto:', error);
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl my-8">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#0d2a54]">
            {isEditing ? 'Editar Projeto' : 'Criar Novo Projeto'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors" aria-label="Fechar">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {errorMessage ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          ) : null}

          {isEditing ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Entidade responsável</label>
              <div className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-700">
                {entidades.find((entidade) => String(entidade.id) === formData.idEntidade)?.nome ?? 'Entidade vinculada'}
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Entidade responsável *</label>
              <select
                name="idEntidade"
                required
                value={formData.idEntidade}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#195b3d] focus:border-[#195b3d] outline-none bg-white text-black"
              >
                <option value="">Selecione...</option>
                {entidades.map((entidade) => (
                  <option key={entidade.id} value={entidade.id}>
                    {entidade.nome}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do projeto *</label>
            <input
              type="text"
              name="nome"
              required
              value={formData.nome}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#195b3d] focus:border-[#195b3d] outline-none text-black"
              placeholder="Ex: Plataforma de divulgação científica"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#195b3d] focus:border-[#195b3d] outline-none text-black"
              placeholder="Descreva o objetivo do projeto..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
              <select
                name="status"
                required
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#195b3d] focus:border-[#195b3d] outline-none bg-white text-black"
              >
                {StatusProjeto.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Início *</label>
              <input
                type="date"
                name="dataInicio"
                required
                value={formData.dataInicio}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#195b3d] focus:border-[#195b3d] outline-none text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fim</label>
              <input
                type="date"
                name="dataFim"
                value={formData.dataFim}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#195b3d] focus:border-[#195b3d] outline-none text-black"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-5 border-t border-gray-100">
            {isEditing ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isLoading}
                className="mr-auto inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100 transition-colors disabled:opacity-50"
              >
                <Trash2 size={16} />
                Excluir
              </button>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading || (!isEditing && entidades.length === 0)}
              className="px-6 py-2 text-sm font-medium text-white bg-[#195b3d] rounded-md hover:bg-[#13472f] transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Salvando...' : isEditing ? 'Salvar Alterações' : 'Criar Projeto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
