import { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import { api } from '@/guards/api';
import { ImageUploadBox } from '@/components/ImageUploadBox';

type CreateProjetoModalProps = {
  isOpen: boolean;
  entidades: { id: number; nome: string }[];
  projeto?: {
    id: number;
    idEntidade: number;
    nome: string;
    descricao?: string | null;
    status?: string;
    dataInicio?: string;
    dataFim?: string | null;
    linkFoto?: string | null;
    linkBanner?: string | null;
  } | null;
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
  const [pendingFoto, setPendingFoto] = useState<File | null>(null);
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
    setErrorMessage('');
    setPendingFoto(null);
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

  const handleDelete = async () => {
    if (!projeto) return;
    setIsLoading(true);
    try {
      await api.delete(`/projeto/${projeto.id}`);
      onCreated();
      onClose();
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const payload: Record<string, unknown> = {
        nome: formData.nome,
        descricao: formData.descricao,
        status: formData.status,
        dataInicio: formData.dataInicio ? new Date(`${formData.dataInicio}T00:00:00`).toISOString() : undefined,
        dataFim: formData.dataFim ? new Date(`${formData.dataFim}T00:00:00`).toISOString() : undefined,
      };

      const uploadFile = async (id: number, file: File, slot: string) => {
        const fd = new FormData();
        fd.append('file', file);
        await api.post(`/projeto/${id}/${slot}`, fd, {
          timeout: 30000,
        });
      };

      if (projeto) {
        await api.patch(`/projeto/${projeto.id}`, payload);
        const pid = projeto.id;
        if (pendingFoto) await uploadFile(pid, pendingFoto, 'foto');
      } else {
        const { data: created } = await api.post('/projeto', {
          ...payload,
          idEntidade: Number(formData.idEntidade),
        });
        if (pendingFoto) await uploadFile(created.id, pendingFoto, 'foto');
      }

      setFormData({ idEntidade: '', nome: '', descricao: '', status: 'PLANEJAMENTO', dataInicio: '', dataFim: '' });
      setPendingFoto(null);
      onCreated();
      onClose();
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 placeholder-gray-400 focus:border-[#195b3d] focus:outline-none focus:ring-1 focus:ring-[#195b3d]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-gray-200 p-4 sticky top-0 bg-white z-10 rounded-t-lg">
          <h2 className="text-xl font-bold text-[#003366]">{isEditing ? 'Editar Projeto' : 'Criar Novo Projeto'}</h2>
          <button onClick={onClose} className="rounded-full p-1 text-gray-500 hover:bg-gray-100 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {errorMessage && (
            <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-600 whitespace-pre-line">{errorMessage}</div>
          )}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Nome do Projeto *</label>
              <input
                type="text" required value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className={inputClass} placeholder="Ex: Sistema de Gerenciamento"
              />
            </div>

            {!isEditing && (
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">Entidade *</label>
                <select
                  required value={formData.idEntidade}
                  onChange={(e) => setFormData({ ...formData, idEntidade: e.target.value })}
                  className={inputClass}
                >
                  <option value="">Selecione uma entidade</option>
                  {entidades.map((e) => (
                    <option key={e.id} value={e.id}>{e.nome}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Descrição</label>
              <textarea
                rows={3} value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                className={inputClass} placeholder="Descreva o projeto..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className={inputClass}
              >
                <option value="PLANEJAMENTO">Planejamento</option>
                <option value="EM_ANDAMENTO">Em Andamento</option>
                <option value="CONCLUIDO">Concluído</option>
                <option value="CANCELADO">Cancelado</option>
                <option value="PAUSADO">Pausado</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Data de Início *</label>
              <input
                type="date" required value={formData.dataInicio}
                onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Data de Fim</label>
              <input
                type="date" value={formData.dataFim}
                onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div className="pt-2">
            <ImageUploadBox id="projeto-foto" label="Foto do Projeto" file={pendingFoto} onChange={setPendingFoto} imageClassName="object-cover" aspect={1080/720} />
          </div>

          <div className="flex justify-end gap-3 pt-5 border-t border-gray-100">
            {isEditing ? (
              <button type="button" onClick={handleDelete} disabled={isLoading}
                className="mr-auto inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100 transition-colors disabled:opacity-50"
              >
                <Trash2 size={16} /> Excluir
              </button>
            ) : null}
            <button type="button" onClick={onClose}
              className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors" disabled={isLoading}
            >
              Cancelar
            </button>
            <button type="submit" disabled={isLoading}
              className="rounded-md bg-[#195b3d] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#12452c] disabled:opacity-50"
            >
              {isLoading ? 'Salvando...' : isEditing ? 'Salvar' : 'Criar Projeto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { CreateProjetoModal as CriarProjetoModal };