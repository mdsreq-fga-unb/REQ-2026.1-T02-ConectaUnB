interface NotificacaoCardProps {
  nome: string;
  texto: string;
  fotoLogo?: string;
  idReferencia: number;
  tipoNotificacao?: "PROJETO" | "POSTAGEM" | "PROCESSO_SELETIVO";
  onClick: (id: number, tipo: "PROJETO" | "POSTAGEM" | "PROCESSO_SELETIVO") => void; 
}

export function NotificacaoCard({ 
  nome, 
  texto, 
  fotoLogo, 
  idReferencia, 
  tipoNotificacao = "PROJETO",
  onClick 
}: NotificacaoCardProps) {
  
  return (
    <button 
      onClick={() => onClick(idReferencia, tipoNotificacao)}
      className="flex items-start gap-4 p-4 border border-[#006633] rounded-xl bg-white w-full shadow-sm hover:bg-gray-50 hover:shadow-md transition-all cursor-pointer text-left"
    >
      
      {fotoLogo ? (
        <img 
          src={fotoLogo} 
          alt={`Logo de ${nome}`} 
          className="w-14 h-14 rounded-full object-cover shrink-0 border border-gray-200" 
        />
      ) : (
        <div className="w-14 h-14 rounded-full bg-gray-300 shrink-0" />
      )}
      
      <div className="flex flex-col">
        <span className="font-semibold text-[#1D1D1D]">{nome}</span>
        <p className="text-gray-600 text-sm mt-1">{texto}</p>
      </div>
      
    </button>
  );
}