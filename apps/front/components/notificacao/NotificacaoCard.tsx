import Link from "next/link";

interface NotificacaoCardProps {
  nome: string;
  texto: string;
  fotoLogo?: string;
  idReferencia: number;
  tipoNotificacao?: "PROJETO" | "POSTAGEM" | "PROCESSO_SELETIVO";
}

export function NotificacaoCard({ 
  nome, 
  texto, 
  fotoLogo, 
  idReferencia, 
  tipoNotificacao = "PROJETO" 
}: NotificacaoCardProps) {
  
  const definirRota = () => {
    if (tipoNotificacao === "POSTAGEM") return `/postagem/${idReferencia}`;
    if (tipoNotificacao === "PROCESSO_SELETIVO") return `/processo-seletivo/${idReferencia}`;
    return `/projeto/${idReferencia}`; // Padrão
  };

  return (
    <Link 
      href={definirRota()} 
      className="flex items-start gap-4 p-4 border border-[#006633] rounded-xl bg-white w-full shadow-sm hover:bg-gray-50 hover:shadow-md transition-all cursor-pointer"
    >
      
      {/* RENDERIZAÇÃO CONDICIONAL DA FOTO */}
      {fotoLogo ? (
        <img 
          src={fotoLogo} 
          alt={`Logo de ${nome}`} 
          className="w-14 h-14 rounded-full object-cover shrink-0 border border-gray-200" 
        />
      ) : (
        <div className="w-14 h-14 rounded-full bg-gray-300 shrink-0" />
      )}
      
      {/* Textos: Nome do Projeto e o Conteúdo */}
      <div className="flex flex-col">
        <span className="font-semibold text-[#1D1D1D]">{nome}</span>
        <p className="text-gray-600 text-sm mt-1">{texto}</p>
      </div>
      
    </Link>
  );
}