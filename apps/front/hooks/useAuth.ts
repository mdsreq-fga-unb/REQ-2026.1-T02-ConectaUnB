import { useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface TokenPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

function readToken(): TokenPayload | null {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("conecta_unb_token");
  if (!token) return null;
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("conecta_unb_token");
      return null;
    }
    return decoded;
  } catch {
    localStorage.removeItem("conecta_unb_token");
    return null;
  }
}

export function useAuth() {
  const [user, setUser] = useState<TokenPayload | null>(readToken);
  const [loading, setLoading] = useState(() => typeof window === "undefined");
  const router = useRouter();

  const checkToken = useCallback(() => {
    setUser(readToken());
    setLoading(false);
  }, []);

  useEffect(() => {

    checkToken();

    window.addEventListener("auth_changed", checkToken);
    
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("auth_changed", checkToken);
      window.removeEventListener("storage", checkToken);
    };
  }, [checkToken]);

  const logout = useCallback(() => {
    localStorage.removeItem("conecta_unb_token");
    setUser(null);
    
    window.dispatchEvent(new Event("auth_changed")); 
    
    router.push("/conecta/feed");
  }, [router]);

  return { user, loading, logout };
}
