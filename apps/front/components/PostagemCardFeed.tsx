import { Pencil, Trash2 } from 'lucide-react'; 
import { type PostagemDetalhe } from '@/components/PostagemModal';

type PostagemCardFeedProps = {
  postagem: PostagemDetalhe;
  vinculo?: 'GESTOR' | 'CO_GESTOR' | 'MEMBRO' | string | null;
  onClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  tipoLabel?: string;
};

export function PostagemCardFeed({ postagem, vinculo, onClick, onEditClick, onDeleteClick, tipoLabel }: PostagemCardFeedProps) {
  const podeEditar = vinculo === 'GESTOR' || vinculo === 'CO_GESTOR';

  return (
    <div
      onClick={onClick}
      className="group relative flex w-full cursor-pointer gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-all hover:bg-gray-50 hover:shadow-sm"
    >
      {/* Botões de Ação Flutuantes*/}
      {podeEditar && (
        <div className="absolute right-3 top-3 z-10 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEditClick?.();
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-500 shadow-sm transition-colors hover:bg-white hover:text-[#195b3d]"
            title="Editar Publicação"
          >
            <Pencil size={16} />
          </button>
          
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick?.();
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-500 shadow-sm transition-colors hover:bg-white hover:text-red-600"
            title="Excluir Publicação"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}

      {/* Avatar */}
      <div className="shrink-0">
        {postagem.entidadeLogo ? (
          <img
            src={postagem.entidadeLogo}
            alt={postagem.entidadeNome}
            className="h-12 w-12 rounded-full border border-gray-200 object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#195b3d] text-lg font-bold text-white">
            {postagem.entidadeNome.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Conteúdo da Postagem */}
      <div className="flex min-w-0 flex-1 flex-col pr-16">
        {/* Cabeçalho */}
        <div className="mb-1 flex items-center gap-2 text-sm">
          <span className="truncate font-bold text-black transition-colors group-hover:text-[#195b3d]">
            {postagem.entidadeNome}
          </span>
          {tipoLabel && (
            <span className="shrink-0 rounded-full bg-[#195b3d]/10 px-2 py-0.5 text-xs font-semibold text-[#195b3d]">
              {tipoLabel}
            </span>
          )}
          {postagem.dataPublicacao && (
            <span className="shrink-0 text-gray-500">· {postagem.dataPublicacao}</span>
          )}
        </div>

        <h3 className="mb-1 text-base font-bold leading-snug text-black">
          {postagem.titulo}
        </h3>

        <p className="line-clamp-3 text-[15px] leading-relaxed text-gray-800">
          {postagem.conteudo}
        </p>

        {postagem.linkFoto && (
          <div className="mt-3 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
            <img
              src={postagem.linkFoto}
              alt={postagem.titulo}
              className="max-h-80 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        )}
      </div>
    </div>
  );
}