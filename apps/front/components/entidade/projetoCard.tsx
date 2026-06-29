import { Pencil, UserPlus } from 'lucide-react';

type FormProjetoCard = {
  nome: string;
  descricao: string;
  imagem?: string;
  onClick: () => void;
  onEditClick?: () => void; 
  onAddMemberClick?: () => void;
  vinculo: 'GESTOR' | 'CO_GESTOR' | 'MEMBRO';
};

export function ProjetoCard({ nome, descricao, imagem, onClick, onEditClick, onAddMemberClick, vinculo }: FormProjetoCard) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 p-4 text-left bg-white border border-[#195b3d] rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_8px_rgba(0,0,0,0.15)] transition-shadow cursor-pointer disabled:cursor-default"
    >
      {/* Imagem */}
      {imagem ? (
        <img src={imagem} alt={nome} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
      ) : (
        <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center text-gray-500 font-bold">
          {nome.charAt(0).toUpperCase()}
        </div>
      )}
      
      {/* Texto */}
      <span className="min-w-0 flex-1">
        <span className="block font-medium text-[#1D1D1D]">{nome}</span>
        {descricao ? <span className="block text-sm text-gray-500 truncate">{descricao}</span> : null}
      </span>

      {/* Botões de Ação na Lateral Direita */}
      {vinculo !== 'MEMBRO' && (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onEditClick?.(); }}
            className="p-2 text-gray-500 hover:text-[#195b3d] transition-colors"
            title="Editar Entidade"
          >
            <Pencil size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onAddMemberClick?.(); }}
            className="p-2 text-gray-500 hover:text-[#195b3d] transition-colors"
            title="Gerenciar Membros"
          >
            <UserPlus size={20} />
          </button>
        </div>
      )}
    </button>
  );
}