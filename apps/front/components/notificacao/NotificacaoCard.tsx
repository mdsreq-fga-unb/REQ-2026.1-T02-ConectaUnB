interface NotificacaoCardProps {
  nome: string;
  texto: string;
}

export function NotificacaoCard({ nome, texto }: NotificacaoCardProps) {
  return (
    <div className="flex items-start gap-4 p-4 border border-[#006633] rounded-xl bg-white w-full shadow-sm">
      
      {/* Círculo cinza simulando a foto/logo da entidade */}
      <div className="w-14 h-14 rounded-full bg-gray-300 shrink-0" />
      
      {/* Textos: Nome do Projeto e o Conteúdo da Notificação */}
      <div className="flex flex-col">
        <span className="font-semibold text-[#1D1D1D]">{nome}</span>
        <p className="text-gray-600 text-sm mt-1">{texto}</p>
      </div>
      
    </div>
  );
}