import { useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface TokenPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

export function useAuth() {
  const [user, setUser] = useState<TokenPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Função centralizada para ler e validar o token
  const checkToken = useCallback(() => {
    const token = localStorage.getItem("conecta_unb_token");

    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        const tempoAtual = Date.now() / 1000;
        
        if (decoded.exp < tempoAtual) {
          console.warn("Sessão expirada. Removendo token...");
          localStorage.removeItem("conecta_unb_token");
          setUser(null);
        } else {
          setUser(decoded);
        }
      } catch (error) {
        console.error("Token inválido ou corrompido.");
        localStorage.removeItem("conecta_unb_token");
        setUser(null);
      }
    } else {
      setUser(null);
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    // 1. Checa o token assim que o hook é montado
    checkToken();

    // 2. Escuta mudanças de auth na MESMA aba
    window.addEventListener("auth_changed", checkToken);
    
    // 3. Escuta mudanças de auth em OUTRAS abas (evento nativo do navegador)
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("auth_changed", checkToken);
      window.removeEventListener("storage", checkToken);
    };
  }, [checkToken]);

  const logout = useCallback(() => {
    localStorage.removeItem("conecta_unb_token");
    setUser(null);
    
    // DISPARA O AVISO PARA A SIDEBAR E OUTROS COMPONENTES ATUALIZAREM IMEDIATAMENTE
    window.dispatchEvent(new Event("auth_changed")); 
    
    router.push("/conecta/feed");
  }, [router]);

  return { user, loading, logout };
}