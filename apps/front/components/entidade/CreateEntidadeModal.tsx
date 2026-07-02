import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ImageUploadBox } from '../ImageUploadBox';
import { CAMPUS_OPTIONS, ClassificacaoEntidade, DEPARTAMENTO_OPTIONS } from '../../constants/options';
import { api } from '@/guards/api';
import { toast } from 'sonner';

interface CreateEntidadeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreateEntidadeModal({ isOpen, onClose, onSuccess }: CreateEntidadeModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    classificacao: '',
    campus: '',
    departamento: '',
  });

  const [banner, setBanner] = useState<File | null>(null);
  const [logo, setLogo] = useState<File | null>(null);

  if (!isOpen) return null;

  const uploadFile = async (file: File, slot: string, entityId: number) => {
    const fd = new FormData();
    fd.append('file', file);
    await api.post(`/entidade/${entityId}/${slot}`, fd, {
      timeout: 30000,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: entidade } = await api.post('/entidade', formData);

      const falhas: string[] = [];
      if (logo) {
        try { await uploadFile(logo, 'logo', entidade.id); }
        catch { falhas.push('logo'); }
      }
      if (banner) {
        try { await uploadFile(banner, 'banner', entidade.id); }
        catch { falhas.push('banner'); }
      }

      if (falhas.length) {
        toast.warning(`Entidade criada, mas não foi possível enviar: ${falhas.join(', ')}.`);
      } else {
        toast.success('Entidade criada com sucesso!');
      }

      setFormData({
        nome: '',
        descricao: '',
        classificacao: '',
        campus: '',
        departamento: '',
      });
      setBanner(null);
      setLogo(null);

      onClose();

      if (onSuccess) {
        onSuccess();
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error("Erro ao criar entidade:", error);
      toast.error('Ocorreu um erro ao criar a entidade. Verifique os dados e tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl my-8">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#0d2a54]">Criar Nova Entidade</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Entidade *</label>
              <input
                type="text"
                name="nome"
                required
                value={formData.nome}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#195b3d] focus:border-[#195b3d] outline-none transition-colors text-black"
                placeholder="Ex: Empresa Júnior XYZ"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#195b3d] focus:border-[#195b3d] outline-none transition-colors text-black resize-y"
                placeholder="Descreva a entidade..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Classificação *</label>
                <select
                  name="classificacao"
                  required
                  value={formData.classificacao}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#195b3d] focus:border-[#195b3d] outline-none transition-colors bg-white text-black"
                >
                  <option value="">Selecione...</option>
                  {ClassificacaoEntidade.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campus *</label>
                <select
                  name="campus"
                  required
                  value={formData.campus}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#195b3d] focus:border-[#195b3d] outline-none transition-colors bg-white text-black"
                >
                  <option value="">Selecione...</option>
                  {CAMPUS_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Departamento *</label>
                <select
                  name="departamento"
                  required
                  value={formData.departamento}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#195b3d] focus:border-[#195b3d] outline-none transition-colors bg-white text-black"
                >
                  <option value="">Selecione...</option>
                  {DEPARTAMENTO_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <ImageUploadBox 
                id="logo-upload" 
                label="Logo da Entidade" 
                file={logo} 
                onChange={setLogo} 
                imageClassName="object-contain" 
                aspect={1}
              />
              <ImageUploadBox 
                id="banner-upload" 
                label="Banner da Entidade" 
                file={banner} 
                onChange={setBanner} 
                imageClassName="object-cover" 
                aspect={1280/400}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 text-sm font-medium text-white bg-[#195b3d] rounded-md hover:bg-[#13472f] transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Criando...' : 'Criar Entidade'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}