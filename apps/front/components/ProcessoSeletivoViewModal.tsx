import { X, Calendar, Link as LinkIcon } from 'lucide-react';
import { type ProcessoSeletivo } from './ProcessoSeletivoFormModal';

type ProcessoSeletivoViewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  processo: ProcessoSeletivo | null;
};

export function ProcessoSeletivoViewModal({
  isOpen,
  onClose,
  processo,
}: ProcessoSeletivoViewModalProps) {
  if (!isOpen || !processo) return null;

  const dataFim = processo.fimInscricao ? new Date(processo.fimInscricao).toISOString().split('T')[0] : '';
  const dataInicioFormatada = processo.inicioInscricao ? new Date(processo.inicioInscricao).toLocaleDateString('pt-BR') : '';
  const dataFimFormatada = processo.fimInscricao ? new Date(processo.fimInscricao).toLocaleDateString('pt-BR') : '';
  const status = processo.classificacao || 'FECHADA';
  
  const linkInscricao = processo.linkIncricao || processo.linkInscricao || '';

  const isProcessoFechado = status === 'FECHADA';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl max-h-[90vh] overflow-y-auto">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4 sticky top-0 bg-white z-10 rounded-t-lg">
          <h2 className="text-xl font-bold text-[#003366]">Detalhes do Processo Seletivo</h2>
          <button onClick={onClose} className="rounded-full p-1 text-gray-500 hover:bg-gray-100 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          {/* Imagem/Banner */}
          {processo.linkFoto && (
            <div className="mb-6 w-full h-48 overflow-hidden rounded-lg bg-gray-100">
              <img 
                src={processo.linkFoto} 
                alt={processo.titulo} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Título e Status */}
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-bold text-gray-900">{processo.titulo}</h3>
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 ${
              status === 'ABERTA' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {status}
            </span>
          </div>

          {/* Datas */}
          {(dataInicioFormatada || dataFimFormatada) && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6 bg-gray-50 p-3 rounded-md">
              <Calendar size={18} className="text-[#003366]" />
              <p>
                <span className="font-semibold">Inscrições:</span> {dataInicioFormatada || 'N/A'} até {dataFimFormatada || 'N/A'}
              </p>
            </div>
          )}

          {/* Descrição */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Descrição</h4>
            <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
              {processo.descricao || 'Nenhuma descrição informada.'}
            </p>
          </div>

          {/* Ação Principal: Botão de Inscrição */}
          <div className="mt-8 border-t border-gray-200 pt-6 flex flex-col items-center justify-center">
            {linkInscricao ? (
              isProcessoFechado ? (
                <button
                  disabled
                  className="inline-flex items-center gap-2 rounded-full bg-gray-400 px-8 py-3 font-semibold text-white shadow-sm cursor-not-allowed opacity-80"
                >
                  <LinkIcon size={18} />
                  Inscrições Encerradas
                </button>
              ) : (
                <a
                  href={linkInscricao}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#195b3d] px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-[#12452c] hover:shadow-lg hover:-translate-y-0.5"
                >
                  <LinkIcon size={18} />
                  Acessar Link de Inscrição
                </a>
              )
            ) : (
              <p className="text-sm text-gray-500 italic">Nenhum link de inscrição disponibilizado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}