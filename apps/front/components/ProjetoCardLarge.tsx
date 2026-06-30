import { Pencil, Trash2 } from 'lucide-react';

type ProjetoCardLargeProps = {
  nome: string;
  imagem?: string;
  status: string;
  onClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  vinculo?: 'GESTOR' | 'CO_GESTOR' | 'MEMBRO' | string | null;
};

export function ProjetoCardLarge({ nome, imagem, status, onClick, onEditClick, onDeleteClick, vinculo }: ProjetoCardLargeProps) {
  const podeEditar = vinculo === 'GESTOR' || vinculo === 'CO_GESTOR';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.();
      }}
      className="group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200 bg-white text-left shadow-sm transition-all hover:shadow-md"
    >
      {/* Botões de Ação */}
      {podeEditar && (
        <div className="absolute right-3 top-3 z-10 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEditClick?.();
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm transition-colors hover:bg-white hover:text-[#195b3d]"
            title="Editar Projeto"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick?.();
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm transition-colors hover:bg-white hover:text-red-600"
            title="Excluir Projeto"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}

      {/* Imagem no topo */}
      <div className="relative h-40 w-full overflow-hidden bg-gray-100">
        {imagem ? (
          <img src={imagem} alt={`Capa do projeto ${nome}`} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#E0E0E0] text-sm font-medium text-gray-500">
            Sem imagem
          </div>
        )}
      </div>

      {/* Conteúdo inferior */}
      <div className="flex w-full flex-col items-start gap-2 p-5">
        <h3 className="line-clamp-1 w-full text-lg font-bold text-black" title={nome}>
          {nome}
        </h3>
        <span className="inline-block rounded-md bg-[#195b3d]/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[#195b3d]">
          {status.replaceAll('_', ' ')}
        </span>
      </div>
    </div>
  );
}