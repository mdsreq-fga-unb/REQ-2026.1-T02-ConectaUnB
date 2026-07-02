import { User } from 'lucide-react';

type SeguindoCardProps = {
  nome: string;
  imagem?: string | null;
  onClick?: () => void;
};

export function SeguindoCard({ nome, imagem, onClick }: SeguindoCardProps) {
  return (
    <div
      onClick={onClick}
      className={`flex w-full items-center gap-4 px-4 py-3 text-left bg-white border border-[#195b3d] rounded-xl shadow-sm transition-shadow ${
        onClick ? 'cursor-pointer hover:shadow-md' : ''
      }`}
    >
      {/* Imagem */}
      {imagem ? (
        <img
          src={imagem}
          alt={nome}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0 border border-gray-100"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-400">
          <User size={28} fill="currentColor" />
        </div>
      )}

      {/* Nome da Entidade */}
      <span className="font-medium text-[#0d2a54] text-base truncate">
        {nome}
      </span>
    </div>
  );
}