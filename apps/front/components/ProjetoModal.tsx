import React, { useState, useEffect } from 'react';
import { X, Pencil } from 'lucide-react';
import { api } from '@/guards/api';
import { StatusProjeto } from '@/constants/options';
import { ImageUploadBox } from '@/components/ImageUploadBox';

export type ProjetoDetalhe = {
  id: number;
  idEntidade: number;
  nome: string;
  descricao?: string | null;
  status: string;
  dataInicio: string;
  dataFim?: string | null;
  linkFoto?: string | null;
};

type ProjetoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  projeto: ProjetoDetalhe | null;
  onSuccess?: () => void;
  startEditing?: boolean;
  vinculo?: 'GESTOR' | 'CO_GESTOR' | 'MEMBRO' | string | null;
};

export function ProjetoModal({ isOpen, onClose, projeto, onSuccess, startEditing = false, vinculo }: ProjetoModalProps) {
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('PLANEJAMENTO');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [linkFotoAtual, setLinkFotoAtual] = useState('');
  const [foto, setFoto] = useState<File | null>(null);

  const podeEditar = vinculo === 'GESTOR' || vinculo === 'CO_GESTOR';

  useEffect(() => {
    if (isOpen && projeto) {
      setNome(projeto.nome);
      setDescricao(projeto.descricao || '');
      setStatus(projeto.status);

      setDataInicio(projeto.dataInicio ? projeto.dataInicio.substring(0, 10) : '');
      setDataFim(projeto.dataFim ? projeto.dataFim.substring(0, 10) : '');
      
      setLinkFotoAtual(projeto.linkFoto || '');
      setFoto(null);
      setError('');
      setIsEditing(startEditing && podeEditar);
    }
  }, [isOpen, projeto, startEditing, podeEditar]);

  if (!isOpen || !projeto) return null;

  const formatarDataVisualizacao = (dataString: string) => {
    if (!dataString) return '-';
    const [ano, mes, dia] = dataString.split('-');
    if (!ano || !mes || !dia) return dataString;
    return `${dia}/${mes}/${ano}`;
  };

  const uploadParaCloudflare = async (arquivo: File): Promise<string> => {
    return "https://link-ficticio-da-cloudflare.com/imagem.png"; 
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

      const inicioIso = dataInicio ? new Date(`${dataInicio}T00:00:00`).toISOString() : undefined;
      const fimIso = dataFim ? new Date(`${dataFim}T00:00:00`).toISOString() : undefined;

      const payload = {
        nome,
        descricao,
        linkFoto: linkDaFotoGerado || undefined,
        status,
        dataInicio: inicioIso,
        dataFim: fimIso,
      };

      await api.patch(`/projeto/${projeto.id}`, payload);
      if (onSuccess) onSuccess();
      
      setLinkFotoAtual(linkDaFotoGerado);
      setIsEditing(false);
    } catch (err: any) {
      const mensagemErro = Array.isArray(err.response?.data?.message) 
        ? err.response.data.message[0] 
        : err.response?.data?.message;
      setError(mensagemErro || 'Erro ao salvar alterações.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl max-h-[90vh] overflow-y-auto">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4 sticky top-0 bg-white z-10 rounded-t-lg">
          <h2 className="text-xl font-bold text-[#003366]">
            {isEditing ? 'Editar Projeto' : 'Detalhes do Projeto'}
          </h2>
          <div className="flex items-center gap-2">
            {!isEditing && podeEditar && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-[#195b3d]"
              >
                <Pencil size={20} />
              </button>
            )}
            <button onClick={onClose} className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Corpo */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && <div className="mb-4 rounded bg-red-50 p-3 text-sm text-red-600">{error}</div>}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            
            {/* Imagem */}
            <div className="md:col-span-2">
              {!isEditing ? (
                linkFotoAtual ? (
                  <img src={linkFotoAtual} alt="Capa" className="h-48 w-full object-cover rounded-xl border border-gray-200" />
                ) : (
                  <div className="flex h-48 w-full items-center justify-center rounded-xl bg-gray-50 text-sm text-gray-500">
                    Sem imagem de capa
                  </div>
                )
              ) : (
                <ImageUploadBox id="foto-projeto" label="Capa do Projeto" file={foto} onChange={setFoto} imageClassName="object-cover" />
              )}
            </div>

            {/* Nome */}
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Nome do Projeto</label>
              {!isEditing ? <p className="text-lg font-semibold text-gray-900">{nome}</p> : 
                <input type="text" required value={nome} onChange={(e) => setNome(e.target.value)} className="w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 focus:border-[#195b3d] outline-none" />
              }
            </div>

            {/* Descrição */}
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Descrição</label>
              {!isEditing ? <p className="text-gray-900 whitespace-pre-wrap">{descricao || '-'}</p> : 
                <textarea rows={3} value={descricao} onChange={(e) => setDescricao(e.target.value)} className="w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 focus:border-[#195b3d] outline-none" />
              }
            </div>

            {/* Status */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
              {!isEditing ? <p className="text-gray-900 font-medium">{StatusProjeto.find(s => s.value === status)?.label || status}</p> : 
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 focus:border-[#195b3d] outline-none">
                  {StatusProjeto.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              }
            </div>

            <div className="hidden md:block"></div>

            {/* Datas */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Data de Início</label>
              {!isEditing ? <p className="text-gray-900">{formatarDataVisualizacao(dataInicio)}</p> : 
                <input type="date" required value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} className="w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 focus:border-[#195b3d] outline-none" />
              }
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Data de Fim</label>
              {!isEditing ? <p className="text-gray-900">{formatarDataVisualizacao(dataFim)}</p> : 
                <input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} className="w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 focus:border-[#195b3d] outline-none" />
              }
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-4">
              <button type="button" onClick={() => setIsEditing(false)} className="rounded-md px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200">
                Cancelar
              </button>
              <button type="submit" disabled={loading} className="rounded-md bg-[#195b3d] px-4 py-2 text-sm text-white hover:bg-[#12452c] disabled:opacity-50">
                {loading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}