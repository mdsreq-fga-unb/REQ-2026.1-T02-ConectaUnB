import { useCallback, useSyncExternalStore } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface TokenPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

type AuthState =
  | { status: "loading" }
  | { status: "unauthenticated" }
  | { status: "authenticated"; user: TokenPayload };

const LOADING_STATE: AuthState = { status: "loading" };
const UNAUTH_STATE: AuthState = { status: "unauthenticated" };

let clientCache: AuthState | null = null;

function computeAuthState(): AuthState {
  const token = localStorage.getItem("conecta_unb_token");
  if (!token) return UNAUTH_STATE;
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("conecta_unb_token");
      return UNAUTH_STATE;
    }
    return { status: "authenticated", user: decoded };
  } catch {
    localStorage.removeItem("conecta_unb_token");
    return UNAUTH_STATE;
  }
}

function getSnapshot(): AuthState {
  if (clientCache === null) {
    clientCache = computeAuthState();
  }
  return clientCache;
}

function getServerSnapshot(): AuthState {
  return LOADING_STATE;
}

function subscribe(callback: () => void): () => void {
  const handler = () => {
    clientCache = null;
    callback();
  };

  window.addEventListener("auth_changed", handler);
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener("auth_changed", handler);
    window.removeEventListener("storage", handler);
  };
}

export function useAuth() {
  const router = useRouter();
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const logout = useCallback(() => {
    localStorage.removeItem("conecta_unb_token");
    clientCache = null;
    window.dispatchEvent(new Event("auth_changed"));
    router.push("/conecta/feed");
  }, [router]);

  const user = state.status === "authenticated" ? state.user : null;
  const loading = state.status === "loading";

  return { user, loading, logout };
}
