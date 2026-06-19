export function ProjetoCard({ nome }: { nome: string }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white border border-[#195b3d] rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_8px_rgba(0,0,0,0.15)] transition-shadow cursor-pointer">
      
      {/* Círculo cinza simulando a foto do projeto */}
      <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0" />
      
      {/* Nome do projeto passado por propriedade */}
      <span className="font-medium text-[#1D1D1D]">{nome}</span>
      
    </div>
  );
}