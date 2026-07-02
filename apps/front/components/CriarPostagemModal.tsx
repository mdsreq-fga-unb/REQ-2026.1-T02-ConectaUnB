import { useState } from 'react';
import { X } from 'lucide-react';
import { api } from '@/guards/api';
import { uploadImage } from '@/lib/upload';
import { ImageUploadBox } from '@/components/ImageUploadBox';

type CriarPostagemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  idEntidade: number;
  onSuccess: () => void;
};

export function CriarPostagemModal({ isOpen, onClose, idEntidade, onSuccess }: CriarPostagemModalProps) {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Envia a imagem para o storage do backend e retorna a URL pública real.
  const uploadFoto = async (arquivo: File): Promise<string> => {
    const { url } = await uploadImage(arquivo, 'postagem', Number(idEntidade));
    return url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let linkDaFotoGerado = '';

      if (foto) {
        linkDaFotoGerado = await uploadFoto(foto);
      }

      const payload = {
        idEntidade: Number(idEntidade),
        titulo: titulo,
        conteudo: conteudo,
        linkFoto: linkDaFotoGerado || undefined,
      };

      await api.post('/postagem', payload);

      setTitulo('');
      setConteudo('');
      setFoto(null);

      onSuccess();
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Erro ao criar postagem:', err);
      const mensagemErro = Array.isArray(err.response?.data?.message) 
        ? err.response.data.message[0] 
        : err.response?.data?.message;
        
      setError(mensagemErro || 'Ocorreu um erro ao criar a postagem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4 sticky top-0 bg-white z-10 rounded-t-lg">
          <h2 className="text-xl font-bold text-[#003366]">Criar Nova Publicação</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-5">
            {/* Título */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Título da Publicação *
              </label>
              <input
                type="text"
                required
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 placeholder-gray-400 focus:border-[#195b3d] focus:outline-none focus:ring-1 focus:ring-[#195b3d]"
                placeholder="Ex: Inscrições abertas para o Processo Seletivo!"
              />
            </div>

            {/* Imagem */}
            <div>
              <ImageUploadBox 
                id="foto-postagem" 
                label="Imagem da Publicação (Opcional)" 
                file={foto} 
                onChange={setFoto} 
                imageClassName="object-contain bg-gray-50" 
                aspect={1}
              />
            </div>

            {/* Conteúdo */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Conteúdo da Publicação *
              </label>
              <textarea
                required
                rows={6}
                value={conteudo}
                onChange={(e) => setConteudo(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 placeholder-gray-400 focus:border-[#195b3d] focus:outline-none focus:ring-1 focus:ring-[#195b3d] resize-y"
                placeholder="Escreva os detalhes da sua publicação aqui..."
              />
            </div>
          </div>

          {/* Rodapé com Botões */}
          <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-4">
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
              {loading ? 'Publicando...' : 'Publicar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}