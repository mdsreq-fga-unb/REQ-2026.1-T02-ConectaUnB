import { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import { api } from '@/guards/api';
import { ImageUploadBox } from '@/components/ImageUploadBox';
import { toast } from 'sonner';
import { ConfirmModal } from '@/components/ConfirmModal';

export type ProcessoSeletivo = {
  id: number;
  idEntidade: number;
  titulo: string;
  descricao?: string;
  classificacao: string;
  linkFoto?: string;
  linkIncricao?: string;
  linkInscricao?: string;
  inicioInscricao?: string;
  fimInscricao?: string;
};

type ProcessoSeletivoFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  idEntidade: number;
  processo: ProcessoSeletivo | null;
  onSuccess: () => void;
};

export function ProcessoSeletivoFormModal({
  isOpen,
  onClose,
  idEntidade,
  processo,
  onSuccess,
}: ProcessoSeletivoFormModalProps) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [linkInscricao, setLinkInscricao] = useState('');
  const [foto, setFoto] = useState<File | string | null>(null);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false); 

  const isEditing = processo !== null;

  let statusAutomatico = 'ABERTA';
  if (dataFim) {
    const hoje = new Date();
    const dataEncerramento = new Date(`${dataFim}T23:59:00`);
    if (hoje > dataEncerramento) {
      statusAutomatico = 'FECHADA';
    }
  }

  const formatarDataParaInput = (dataIso?: string) => {
    if (!dataIso) return '';
    const data = new Date(dataIso);
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  };

  useEffect(() => {
    if (isOpen) {
      if (processo) {
        setTitulo(processo.titulo);
        setDescricao(processo.descricao || '');
        setLinkInscricao(processo.linkIncricao || processo.linkInscricao || '');
        setDataInicio(formatarDataParaInput(processo.inicioInscricao));
        setDataFim(formatarDataParaInput(processo.fimInscricao));
        setFoto(processo.linkFoto || null);
      } else {
        setTitulo('');
        setDescricao('');
        setLinkInscricao('');
        setDataInicio('');
        setDataFim('');
        setFoto(null);
      }
      setError('');
      setIsModalDeleteOpen(false);
    }
  }, [isOpen, processo]);

  if (!isOpen) return null;

  const uploadParaCloudflare = async (arquivo: File): Promise<string> => {
    console.log("Fazendo upload para a Cloudflare...", arquivo.name);
    return "https://link-ficticio-da-cloudflare.com/imagem.png"; 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let linkDaFotoGerado = typeof foto === 'string' ? foto : '';

      if (foto instanceof File) {
        linkDaFotoGerado = await uploadParaCloudflare(foto);
      }

      if (dataFim && dataInicio && new Date(dataFim) < new Date(dataInicio)) {
        setError('A data de fim das inscrições não pode ser anterior à data de início.');
        setLoading(false);
        return;
      }

      const payload = {
        idEntidade: Number(idEntidade),
        titulo,
        descricao,
        classificacao: statusAutomatico,
        linkInscricao,
        linkFoto: linkDaFotoGerado || undefined,
        inicioInscricao: dataInicio ? new Date(`${dataInicio}T00:00:00`).toISOString() : undefined,
        fimInscricao: dataFim ? new Date(`${dataFim}T23:59:00`).toISOString() : undefined,
      };

      if (isEditing) {
        await api.patch(`/processo-seletivo/${processo.id}`, payload);
        toast.success('Processo Seletivo atualizado com sucesso!');
      } else {
        await api.post('/processo-seletivo', payload);
        toast.success('Processo Seletivo criado com sucesso!');
      }

      onSuccess();
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Erro ao salvar processo seletivo:', err);
      const mensagemErro = Array.isArray(err.response?.data?.message) 
        ? err.response.data.message[0] 
        : err.response?.data?.message;
      setError(mensagemErro || 'Ocorreu um erro ao salvar o processo seletivo.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!processo) return;
    
    setLoading(true);
    try {
      await api.delete(`/processo-seletivo/${processo.id}`);
      toast.success('Processo Seletivo excluído com sucesso!');
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Erro ao excluir processo seletivo:', err);
      toast.error('Ocorreu um erro ao excluir o processo.');
    } finally {
      setLoading(false);
      setIsModalDeleteOpen(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-gray-200 p-4 sticky top-0 bg-white z-10 rounded-t-lg">
            <h2 className="text-xl font-bold text-[#003366]">
              {isEditing ? 'Editar Processo Seletivo' : 'Criar Processo Seletivo'}
            </h2>
            <button onClick={onClose} className="rounded-full p-1 text-gray-500 hover:bg-gray-100 transition-colors">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {error && (
              <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">Título *</label>
                <input
                  type="text"
                  required
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:border-[#195b3d] focus:outline-none focus:ring-1 focus:ring-[#195b3d]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">Descrição</label>
                <textarea
                  rows={3}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:border-[#195b3d] focus:outline-none focus:ring-1 focus:ring-[#195b3d]"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Status (Automático)</label>
                <div className="mt-1">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    statusAutomatico === 'ABERTA' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {statusAutomatico}
                  </span>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Link de Inscrição</label>
                <input
                  type="url"
                  value={linkInscricao}
                  onChange={(e) => setLinkInscricao(e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:border-[#195b3d] focus:outline-none focus:ring-1 focus:ring-[#195b3d]"
                />
              </div>

              <div className="md:col-span-2">
                <ImageUploadBox 
                  id="foto-processo" 
                  label="Capa do Processo Seletivo" 
                  file={foto instanceof File ? foto : null} 
                  onChange={setFoto} 
                  imageClassName="object-cover" 
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Início das Inscrições *</label>
                <input
                  type="date"
                  required
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:border-[#195b3d] focus:outline-none focus:ring-1 focus:ring-[#195b3d]"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Fim das Inscrições *</label>
                <input
                  type="date"
                  required
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 text-gray-900 focus:border-[#195b3d] focus:outline-none focus:ring-1 focus:ring-[#195b3d]"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between border-t border-gray-200 pt-4">
              <div>
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsModalDeleteOpen(true)}
                    disabled={loading}
                    className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    <Trash2 size={18} />
                    Excluir Processo
                  </button>
                )}
              </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  disabled={loading}
                >
                  Cancelar
                </button>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-md bg-[#195b3d] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#12452c] disabled:opacity-50"
                >
                  {loading ? 'Salvando...' : isEditing ? 'Atualizar Processo' : 'Criar Processo'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalDeleteOpen}
        title="Excluir Processo Seletivo"
        description={`Tem certeza que deseja excluir o processo seletivo "${processo?.titulo}"? Esta ação não pode ser desfeita.`}
        confirmText="Confirmar Exclusão"
        variant="danger"
        onClose={() => setIsModalDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}