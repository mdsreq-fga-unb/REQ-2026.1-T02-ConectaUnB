import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { api } from '@/guards/api';
import { CAMPUS_OPTIONS, ClassificacaoEntidade, DEPARTAMENTO_OPTIONS } from '@/constants/options';

type EditEntidadeFormProps = {
  entidadeId: number;
  initialData: {
    nome: string;
    descricao: string;
    classificacao: string;
    campus: string;
    departamento: string;
  };
  canDelete: boolean;
  onSuccess: () => void;
  onDeleted: () => void;
};

export function EditEntidadeForm({
  entidadeId,
  initialData,
  canDelete,
  onSuccess,
  onDeleted,
}: EditEntidadeFormProps) {
  const [form, setForm] = useState(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      await api.patch(`/entidade/${entidadeId}`, {
        nome: form.nome,
        descricao: form.descricao || undefined,
        classificacao: form.classificacao,
        campus: form.campus,
        departamento: form.departamento,
      });
      setMessage({ type: 'success', text: 'Mudanças salvas com sucesso' });
      onSuccess(); // Avisa o modal/página para recarregar a lista
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      console.error('Erro ao editar entidade:', error);
      setMessage({ type: 'error', text: 'Erro ao salvar. Verifique os dados e tente novamente.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    const shouldDelete = window.confirm(
      'Excluir esta entidade? Projetos, membros e conteúdos vinculados também serão removidos.'
    );
    if (!shouldDelete) return;

    setIsSaving(true);
    setMessage(null);

    try {
      await api.delete(`/entidade/${entidadeId}`);
      window.alert('Entidade excluída com sucesso');
      onDeleted(); // Avisa o modal para fechar e recarregar a tela inicial
    } catch (error) {
      console.error('Erro ao excluir entidade:', error);
      setMessage({ type: 'error', text: 'Problema ao apagar essa entidade. Tente novamente mais tarde.' });
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4 rounded-md border border-gray-100 p-4">
      {message && (
        <div className={`rounded-md px-4 py-3 text-sm ${message.type === 'error' ? 'border-red-200 bg-red-50 text-red-700' : 'border-green-200 bg-green-50 text-green-700'}`}>
          {message.text}
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm font-semibold text-[#0d2a54]">Dados da entidade</h3>
        {canDelete && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100 disabled:opacity-50"
          >
            <Trash2 size={16} />
            Excluir
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
        <input
          type="text"
          name="nome"
          required
          value={form.nome}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#195b3d] focus:border-[#195b3d] outline-none text-black"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
        <textarea
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          rows={2}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#195b3d] focus:border-[#195b3d] outline-none text-black"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Classificação</label>
          <select name="classificacao" required value={form.classificacao} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none bg-white text-black">
            {ClassificacaoEntidade.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Campus</label>
          <select name="campus" required value={form.campus} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none bg-white text-black">
            {CAMPUS_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
          <select name="departamento" required value={form.departamento} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none bg-white text-black">
            {DEPARTAMENTO_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button type="submit" disabled={isSaving} className="px-5 py-2 text-sm font-medium text-white bg-[#195b3d] rounded-md hover:bg-[#13472f] transition-colors disabled:opacity-50">
          Salvar Alterações
        </button>
      </div>
    </form>
  );
}