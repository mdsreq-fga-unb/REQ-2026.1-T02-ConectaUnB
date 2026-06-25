type ProjetoCardProps = {
  nome: string;
  descricao?: string;
  onClick?: () => void;
};

export function ProjetoCard({ nome, descricao, onClick }: ProjetoCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 p-4 text-left bg-white border border-[#195b3d] rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_8px_rgba(0,0,0,0.15)] transition-shadow cursor-pointer disabled:cursor-default"
    >
      
      {/* Círculo cinza simulando a foto do projeto */}
      <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0" />
      
      {/* Nome do projeto passado por propriedade */}
      <span className="min-w-0">
        <span className="block font-medium text-[#1D1D1D]">{nome}</span>
        {descricao ? (
          <span className="block text-sm text-gray-500 truncate">{descricao}</span>
        ) : null}
      </span>
      
    </button>
  );
}
