export function ProjetoCard({ nome }: { nome: string }) {
  return (
    <div className="flex items-center gap-4 p-3 border border-[#006633] rounded-xl bg-white w-full max-w-sm">
      
      {/* Círculo cinza simulando a foto do projeto */}
      <div className="w-12 h-12 rounded-full bg-gray-300 flex-shrink-0" />
      
      {/* Nome do projeto passado por propriedade */}
      <span className="font-medium text-[#1D1D1D]">{nome}</span>
      
    </div>
  );
}