import { useState, useEffect } from "react";
import { api } from "@/guards/api";
import { useAuth } from "@/hooks/useAuth";

interface PreferenciasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PreferenciasModal({ isOpen, onClose }: PreferenciasModalProps) {
  const { user } = useAuth(); 
  
  const [preferencias, setPreferencias] = useState({
    processoSeletivo: true,
    atualizacaoProjeto: true,
    atualizacaoPublicacao: true,
  });
  
  const [isSalvando, setIsSalvando] = useState(false);
  const [carregandoDados, setCarregandoDados] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      const buscarPreferenciasAtuais = async () => {
        setCarregandoDados(true);
        try {
          const response = await api.get(`/perfil/${user.sub}`);
          const meuPerfil = response.data;
          
          console.log("DADOS EXATOS DO PERFIL:", meuPerfil);

          const prefsDoBanco = meuPerfil.PreferenciaNotificacao || meuPerfil.preferenciaNotificacao;

          if (prefsDoBanco) {
            setPreferencias({
              processoSeletivo: prefsDoBanco.processoSeletivo ?? true,
              atualizacaoProjeto: prefsDoBanco.atualizacaoProjeto ?? true,
              atualizacaoPublicacao: prefsDoBanco.atualizacaoPublicacao ?? true,
            });
            console.log("Preferências carregadas com sucesso!");
          } else {
             console.log("Primeiro acesso do utilizador às preferências. Usando opções padrão (tudo ativado).");
          }
          
        } catch (error) {
          console.error("Erro ao buscar preferências atuais:", error);
        } finally {
          setCarregandoDados(false);
        }
      };

      buscarPreferenciasAtuais();
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const togglePreferencia = (chave: keyof typeof preferencias) => {
    setPreferencias((prev) => ({ ...prev, [chave]: !prev[chave] }));
  };

  const salvarPreferencias = async () => {
    setIsSalvando(true);
    try {
      await api.patch('/notificacao/preferencias', preferencias);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar preferências:", error);
      alert("Ocorreu um erro ao salvar as suas preferências. Tente novamente.");
    } finally {
      setIsSalvando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#003366]">Preferências</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-600 font-bold text-lg disabled:opacity-50" disabled={isSalvando || carregandoDados}>
            ✕
          </button>
        </div>
        
        <hr className="border-[#006633] border-t-2 mb-6" />

        {carregandoDados ? (
           <div className="flex justify-center py-6">
              <p className="text-gray-500">A procurar definições...</p>
           </div>
        ) : (
          <div className="space-y-6">
            
            <div className="flex items-center justify-between">
              <span className="text-[#1D1D1D] font-medium">Processos Seletivos</span>
              <button
                onClick={() => togglePreferencia("processoSeletivo")}
                disabled={isSalvando}
                className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${preferencias.processoSeletivo ? "bg-[#006633]" : "bg-gray-300"} disabled:opacity-50`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${preferencias.processoSeletivo ? "translate-x-6" : "translate-x-0"}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#1D1D1D] font-medium">Atualizações de Projetos</span>
              <button
                onClick={() => togglePreferencia("atualizacaoProjeto")}
                disabled={isSalvando}
                className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${preferencias.atualizacaoProjeto ? "bg-[#006633]" : "bg-gray-300"} disabled:opacity-50`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${preferencias.atualizacaoProjeto ? "translate-x-6" : "translate-x-0"}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#1D1D1D] font-medium">Novas Publicações</span>
              <button
                onClick={() => togglePreferencia("atualizacaoPublicacao")}
                disabled={isSalvando}
                className={`w-12 h-6 rounded-full flex items-center p-1 transition-colors ${preferencias.atualizacaoPublicacao ? "bg-[#006633]" : "bg-gray-300"} disabled:opacity-50`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${preferencias.atualizacaoPublicacao ? "translate-x-6" : "translate-x-0"}`} />
              </button>
            </div>

          </div>
        )}

        <div className="mt-8 flex justify-end">
          <button 
            onClick={salvarPreferencias} 
            disabled={isSalvando || carregandoDados}
            className="px-6 py-2 bg-[#003366] text-white font-medium rounded-full hover:bg-[#002244] transition-colors disabled:bg-gray-400"
          >
            {isSalvando ? "A salvar..." : "Salvar"}
          </button>
        </div>

      </div>
    </div>
  );
}