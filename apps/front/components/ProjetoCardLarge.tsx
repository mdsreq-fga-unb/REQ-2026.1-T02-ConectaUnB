import React from 'react';

type ProjetoCardLargeProps = {
  nome: string;
  imagem?: string;
  onClick?: () => void;
};

export function ProjetoCardLarge({ nome, imagem, onClick }: ProjetoCardLargeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col w-full aspect-square text-left bg-[#f2f2f2] border-2 border-[#1c3552] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer disabled:cursor-default"
    >
      {/* Name */}
      <div className="w-full px-5 py-4 border-b border-black bg-transparent flex-shrink-0">
        <span className="block text-2xl font-normal text-black tracking-wide">{nome}</span>
      </div>
      
      {/* Image */}
      <div className="flex-1 w-full bg-transparent flex items-center justify-center">
        {imagem && (
          <img src={imagem} alt={nome} className="w-full h-full object-cover" />
        )}
      </div>
    </button>
  );
}
