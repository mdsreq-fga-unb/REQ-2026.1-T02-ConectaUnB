import React, { useState, useEffect } from 'react';
import { X, Pencil } from 'lucide-react';
import { api } from '@/guards/api';
import { ImageUploadBox } from '@/components/ImageUploadBox';

export type PostagemDetalhe = {
  id: number;
  idEntidade: number;
  titulo: string;
  conteudo: string;
  linkFoto?: string | null;
  dataPublicacao?: string;
  entidadeNome: string;
  entidadeLogo?: string | null;
};

type PostagemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  postagem: PostagemDetalhe | null;
  onSuccess?: () => void;
  startEditing?: boolean;
  vinculo?: 'GESTOR' | 'CO_GESTOR' | 'MEMBRO' | string | null;
};

export function PostagemModal({ 
  isOpen, 
  onClose, 
  postagem, 
  onSuccess, 
  startEditing = false, 
  vinculo 
}: PostagemModalProps) {
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [linkFotoAtual, setLinkFotoAtual] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  const podeEditar = vinculo === 'GESTOR' || vinculo === 'CO_GESTOR';

  useEffect(() => {
    if (isOpen && postagem) {
      setTitulo(postagem.titulo);
      setConteudo(postagem.conteudo);
      setLinkFotoAtual(postagem.linkFoto || '');
      setFoto(null);
      setError('');
      setIsEditing(startEditing && podeEditar);
    }
  }, [isOpen, postagem, startEditing, podeEditar]);

  if (!isOpen || !postagem) return null;

  const uploadParaCloudflare = async (arquivo: File): Promise<string> => {
    console.log("Fazendo upload para a Cloudflare...", arquivo.name);
    return "https://link-ficticio-da-cloudflare.com/imagem-postagem.png"; 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let linkDaFotoGerado = linkFotoAtual;

      if (foto) {
        linkDaFotoGerado = await uploadParaCloudflare(foto);
      }

      const payload = {
        titulo: titulo,
        conteudo: conteudo,
        linkFoto: linkDaFotoGerado || undefined,
      };

      await api.patch(`/postagem/${postagem.id}`, payload);
      
      if (onSuccess) onSuccess();
      
      setLinkFotoAtual(linkDaFotoGerado);
      setIsEditing(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Erro ao editar postagem:', err);
      const mensagemErro = Array.isArray(err.response?.data?.message) 
        ? err.response.data.message[0] 
        : err.response?.data?.message;
        
      setError(mensagemErro || 'Ocorreu um erro ao salvar as alterações.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl max-h-[90vh] overflow-y-auto">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4 sticky top-0 bg-white z-10 rounded-t-lg">
          <div className="flex items-center gap-3">
            {!isEditing && (
              <div className="shrink-0">
                {postagem.entidadeLogo ? (
                  <img src={postagem.entidadeLogo} alt={postagem.entidadeNome} className="h-10 w-10 rounded-full border border-gray-200 object-cover" />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#195b3d] text-sm font-bold text-white">
                    {postagem.entidadeNome.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold text-[#003366]">
                {isEditing ? 'Editar Publicação' : (postagem.entidadeNome)}
              </h2>
              {!isEditing && postagem.dataPublicacao && (
                <span className="text-xs text-gray-500">{postagem.dataPublicacao}</span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {!isEditing && podeEditar && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-[#195b3d] transition-colors"
                title="Habilitar edição"
              >
                <Pencil size={20} />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Corpo */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-600">{error}</div>}

          <div className="grid grid-cols-1 gap-5">
            
            {/* Imagem */}
            <div>
              {!isEditing ? (
                linkFotoAtual ? (
                  <div className="mb-4 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
                    <img src={linkFotoAtual} alt={titulo} className="max-h-96 w-full object-contain" />
                  </div>
                ) : null
              ) : (
                <ImageUploadBox 
                  id="foto-postagem" 
                  label="Imagem da Publicação (Opcional)" 
                  file={foto} 
                  onChange={setFoto} 
                  imageClassName="object-contain bg-gray-50" 
                />
              )}
            </div>

            {/* Título */}
            <div>
              {isEditing && <label className="mb-1 block text-sm font-medium text-gray-700">Título</label>}
              {!isEditing ? (
                <h3 className="text-xl font-bold leading-snug text-black mb-2">{titulo}</h3>
              ) : (
                <input
                  type="text"
                  required
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 focus:border-[#195b3d] outline-none"
                />
              )}
            </div>

            {/* Conteúdo */}
            <div>
              {isEditing && <label className="mb-1 block text-sm font-medium text-gray-700">Conteúdo</label>}
              {!isEditing ? (
                <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-gray-800">{conteudo}</p>
              ) : (
                <textarea
                  required
                  rows={8}
                  value={conteudo}
                  onChange={(e) => setConteudo(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 focus:border-[#195b3d] outline-none resize-y"
                />
              )}
            </div>
          </div>

          {/* Rodapé com botões de Salvar/Cancelar */}
          {isEditing && (
            <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setTitulo(postagem.titulo);
                  setConteudo(postagem.conteudo);
                  setFoto(null);
                }}
                className="rounded-md px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-[#195b3d] px-4 py-2 text-sm text-white hover:bg-[#12452c] disabled:opacity-50"
              >
                {loading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}