import { useState } from 'react';
import { X } from 'lucide-react';
import { api } from '@/guards/api';
import { StatusProjeto } from '@/constants/options'; 
import { ImageUploadBox } from '@/components//ImageUploadBox';

type CriarProjetoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  idEntidade: number;
  onSuccess: () => void;
};

export function CriarProjetoModal({ isOpen, onClose, idEntidade, onSuccess }: CriarProjetoModalProps) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  const [status, setStatus] = useState('PLANEJAMENTO');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Função simulada para o upload na Cloudflare
  const uploadParaCloudflare = async (arquivo: File): Promise<string> => {
    
    console.log("Fazendo upload para a Cloudflare...", arquivo.name);
    return "https://link-ficticio-da-cloudflare.com/imagem.png"; 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let linkDaFotoGerado = '';

      if (foto) {
        linkDaFotoGerado = await uploadParaCloudflare(foto);
      }

      const inicioIso = dataInicio ? new Date(`${dataInicio}T00:00:00`).toISOString() : undefined;
      const fimIso = dataFim ? new Date(`${dataFim}T00:00:00`).toISOString() : undefined;

      const payload = {
        idEntidade: Number(idEntidade),
        nome: nome,
        descricao: descricao,
        linkFoto: linkDaFotoGerado || undefined,
        status: status,
        dataInicio: inicioIso,
        dataFim: fimIso,
      };

      await api.post('/projeto', payload);

      setNome('');
      setDescricao('');
      setFoto(null);
      setStatus('PLANEJAMENTO');
      setDataInicio('');
      setDataFim('');

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error('Erro ao criar projeto:', err);
      const mensagemErro = Array.isArray(err.response?.data?.message) 
        ? err.response.data.message[0] 
        : err.response?.data?.message;
        
      setError(mensagemErro || 'Ocorreu um erro ao criar o projeto.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4 sticky top-0 bg-white z-10 rounded-t-lg">
          <h2 className="text-xl font-bold text-[#003366]">Criar Novo Projeto</h2>
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

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Nome do Projeto *
              </label>
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 placeholder-gray-400 focus:border-[#195b3d] focus:outline-none focus:ring-1 focus:ring-[#195b3d]"
                placeholder="Ex: Sistema de Gerenciamento"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <textarea
                rows={3}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 placeholder-gray-400 focus:border-[#195b3d] focus:outline-none focus:ring-1 focus:ring-[#195b3d]"
                placeholder="Descreva o projeto..."
              />
            </div>

            <div className="md:col-span-2">
              <ImageUploadBox 
                id="foto-projeto" 
                label="Capa do Projeto" 
                file={foto} 
                onChange={setFoto} 
                imageClassName="object-cover" 
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 focus:border-[#195b3d] focus:outline-none focus:ring-1 focus:ring-[#195b3d]"
              >
                {StatusProjeto.map((opcao) => (
                  <option key={opcao.value} value={opcao.value}>
                    {opcao.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden md:block"></div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Data de Início *
              </label>
              <input
                type="date"
                required
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 focus:border-[#195b3d] focus:outline-none focus:ring-1 focus:ring-[#195b3d]"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Data de Fim
              </label>
              <input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 focus:border-[#195b3d] focus:outline-none focus:ring-1 focus:ring-[#195b3d]"
              />
            </div>
          </div>

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
              {loading ? 'Salvando...' : 'Criar Projeto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}