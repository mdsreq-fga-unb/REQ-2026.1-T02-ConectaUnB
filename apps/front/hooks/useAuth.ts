import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

// Define exatamente o que o seu NestJS mandou no Payload do Token
interface TokenPayload {
  sub: string; // ID do usuário
  email: string; // E-mail do usuário
  iat: number;
  exp: number; // Data de expiração
}

export function useAuth() {
  const [user, setUser] = useState<TokenPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 1. Busca o token no cofre do navegador
    const token = localStorage.getItem("conecta_unb_token");

    if (token) {
      try {
        // 2. Descriptografa o token
        const decoded = jwtDecode<TokenPayload>(token);
        
        // 3. Verifica se o token já passou da validade
        const tempoAtual = Date.now() / 1000;
        if (decoded.exp < tempoAtual) {
          console.warn("Sessão expirada. Deslogando...");
          logout();
        } else {
          // 4. Se estiver tudo certo, salva os dados no estado
          setUser(decoded);
        }
      } catch (error) {
        console.error("Token inválido ou corrompido.");
        logout();
      }
    }
    
    // Avisa que terminou de checar
    setLoading(false);
  }, []);

  // Função centralizada para deslogar o usuário de qualquer lugar do site
  const logout = () => {
    localStorage.removeItem("conecta_unb_token");
    setUser(null);
    router.push("/login");
  };

  // Retorna as informações para a página que chamou o hook
  return { user, loading, logout };
}