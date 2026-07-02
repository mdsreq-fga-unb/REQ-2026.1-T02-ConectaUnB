import React, { useEffect, useState } from 'react';
import { Trash2, X } from 'lucide-react';
import { api } from '@/guards/api';
import { CAMPUS_OPTIONS, ClassificacaoEntidade, DEPARTAMENTO_OPTIONS } from '@/constants/options';
import { ConfirmModal } from '@/components/ConfirmModal';
import { ImageUploadBox } from '@/components/ImageUploadBox';
import { toast } from 'sonner';

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

type EntidadeResumo = {
  id: number;
  nome: string;
  vinculo?: { classificacao?: string };
};

type EditEntidadeModalProps = {
  isOpen: boolean;
  entidade: EntidadeResumo | null;
  onClose: () => void;
  onChanged: () => void;
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
  const [pendingLogo, setPendingLogo] = useState<File | null>(null);
  const [pendingBanner, setPendingBanner] = useState<File | null>(null);

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitClick = (event: React.FormEvent) => {
    event.preventDefault();
    setIsModalUpdateOpen(true);
  };

  const handleConfirmUpdate = async () => {
    setIsModalUpdateOpen(false);
    setIsSaving(true);

    try {
      await api.patch(`/entidade/${entidadeId}`, {
        nome: form.nome,
        descricao: form.descricao || undefined,
        classificacao: form.classificacao,
        campus: form.campus,
        departamento: form.departamento,
      });

      const upload = async (file: File, slot: string) => {
        const fd = new FormData();
        fd.append('file', file);
        await api.post(`/entidade/${entidadeId}/${slot}`, fd, {
          timeout: 30000,
        });
      };
      if (pendingLogo) await upload(pendingLogo, 'logo');
      if (pendingBanner) await upload(pendingBanner, 'banner');

      toast.success('Mudanças salvas com sucesso!');
      onSuccess();
    } catch (error: unknown) {
      console.error('Erro ao editar entidade:', error);
      toast.error('Erro ao salvar. Verifique os dados e tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    setIsModalDeleteOpen(false);
    setIsSaving(true);

    try {
      await api.delete(`/entidade/${entidadeId}`);
      toast.success('Entidade excluída com sucesso!');
      onDeleted();
    } catch (error) {
      console.error('Erro ao excluir entidade:', error);
      toast.error('Problema ao apagar essa entidade. Tente novamente mais tarde.');
      setIsSaving(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmitClick} className="space-y-4 rounded-md border border-gray-100 p-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-sm font-semibold text-[#0d2a54]">Dados da entidade</h3>
          {canDelete && (
            <button
              type="button"
              onClick={() => setIsModalDeleteOpen(true)}
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
            rows={8}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#195b3d] focus:border-[#195b3d] outline-none text-black resize-y"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <ImageUploadBox
            id="edit-logo"
            label="Logo da Entidade"
            file={pendingLogo}
            onChange={setPendingLogo}
            imageClassName="object-contain"
          />
          <ImageUploadBox
            id="edit-banner"
            label="Banner da Entidade"
            file={pendingBanner}
            onChange={setPendingBanner}
            imageClassName="object-cover"
          />
        </div>

        <div className="flex justify-end mt-4">
          <button type="submit" disabled={isSaving} className="px-5 py-2 text-sm font-medium text-white bg-[#195b3d] rounded-md hover:bg-[#13472f] transition-colors disabled:opacity-50">
            Salvar Alterações
          </button>
        </div>
      </form>

      <ConfirmModal
        isOpen={isModalUpdateOpen}
        title="Salvar Alterações"
        description="Tem certeza que deseja salvar as alterações realizadas nesta entidade?"
        confirmText="Confirmar Edição"
        variant="primary"
        onClose={() => setIsModalUpdateOpen(false)}
        onConfirm={handleConfirmUpdate}
      />

      <ConfirmModal
        isOpen={isModalDeleteOpen}
        title="Excluir Entidade"
        description="Tem certeza que deseja excluir esta entidade? Projetos, membros e conteúdos vinculados também serão removidos. Esta ação é irreversível."
        confirmText="Confirmar Exclusão"
        variant="danger"
        onClose={() => setIsModalDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

export function EditEntidadeModal({ isOpen, entidade, onClose, onChanged }: EditEntidadeModalProps) {
  const [detalhe, setDetalhe] = useState<{
    nome?: string;
    descricao?: string;
    classificacao?: string;
    campus?: string;
    departamento?: string;
  } | null>(null);

  const papel = entidade?.vinculo?.classificacao;
  const isGestor = papel === 'GESTOR';
  const isCogestor = papel === 'CO_GESTOR';

  const canEdit = isGestor || isCogestor;
  const canDelete = isGestor;

  useEffect(() => {
    if (isOpen && entidade && canEdit) {
      api.get(`/entidade/${entidade.id}`).then((res) => setDetalhe(res.data));
    } else {
      setDetalhe(null);
    }
  }, [isOpen, entidade, canEdit]);

  if (!isOpen || !entidade) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl max-h-[95vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-[#0d2a54]">Editar Entidade</h2>
            <p className="text-sm text-gray-500">Altere os dados de {entidade.nome}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {/*Verificação visual de segurança */}
          {!canEdit ? (
            <div className="py-12 text-center space-y-2">
              <p className="text-base font-medium text-gray-700">
                Você não tem permissão para editar esta entidade.
              </p>
              <p className="text-sm text-gray-500">
                Apenas Gestores e Cogestores possuem acesso a esta área.
              </p>
            </div>
          ) : detalhe ? (
            <EditEntidadeForm
              entidadeId={entidade.id}
              initialData={{
                nome: detalhe.nome || '',
                descricao: detalhe.descricao || '',
                classificacao: detalhe.classificacao || '',
                campus: detalhe.campus || '',
                departamento: detalhe.departamento || '',
              }}
              canDelete={canDelete}
              onSuccess={() => {
                onChanged();
                onClose();
              }}
              onDeleted={() => {
                onChanged();
                onClose();
              }}
            />
          ) : (
            <p className="text-gray-500">Carregando dados da entidade...</p>
          )}
        </div>
      </div>
    </div>
  );
}