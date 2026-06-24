import { useState, useEffect } from "react";
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

  useEffect(() => {
    const token = localStorage.getItem("conecta_unb_token");

    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        
        const tempoAtual = Date.now() / 1000;
        if (decoded.exp < tempoAtual) {
          console.warn("Sessão expirada. Deslogando...");
          logout();
        } else {
          setUser(decoded);
        }
      } catch (error) {
        console.error("Token inválido ou corrompido.");
        logout();
      }
    }
    
    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("conecta_unb_token");
    setUser(null);
    router.push("/");
  };

  return { user, loading, logout };
}