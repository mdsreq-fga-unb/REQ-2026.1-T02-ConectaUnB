"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Building2, Home, LogOut, User, LogIn, UserPlus, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItemsLogado = [
    { href: '/conecta/feed', label: 'Feed', icon: Home },
    { href: '/conecta/entidades/gestao', label: 'Entidades', icon: Building2 },
    { href: '/conecta/notificacoes', label: 'Notificações', icon: Bell },
    { href: user?.sub ? `/conecta/perfil/${user.sub}` : '/conecta/perfil', label: 'Perfil', icon: User },
  ];

  const navItemsDesLogado = [
    { href: '/conecta/feed', label: 'Feed', icon: Home },
    { href: '/auth/login', label: 'Login', icon: LogIn },
    { href: '/auth/cadastro', label: 'Cadastro', icon: UserPlus },
  ];

  const navItems = user ? navItemsLogado : navItemsDesLogado;

  // Fecha o drawer ao trocar de rota (mobile)
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const syncLogout = (event: StorageEvent) => {
      if (event.key === "conecta_unb_token" && !event.newValue) {
        logout();
      }
    };
    window.addEventListener('storage', syncLogout);

    let timeoutId: NodeJS.Timeout;

    if (user?.exp) {
      const tempoRestanteMs = (user.exp * 1000) - Date.now();

      if (tempoRestanteMs > 0) {
        timeoutId = setTimeout(() => {
          console.warn("Sessão expirada. Atualizando sidebar...");
          logout();
        }, tempoRestanteMs);
      } else {
        logout();
      }
    }

    return () => {
      window.removeEventListener('storage', syncLogout);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [user, logout]);


  return (
    <>
      {/* Topbar mobile (hamburger) */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between bg-[#0d2a54] px-4 text-white">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Abrir menu"
          className="rounded p-1 hover:bg-[#153b75]"
        >
          <Menu size={26} />
        </button>
        <span className="text-base font-bold tracking-wide">Conecta UnB</span>
        <span className="w-[26px]" />
      </header>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 z-50 md:z-auto h-screen w-64 shrink-0 bg-[#0d2a54] text-white flex flex-col justify-between transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="relative flex justify-center p-6 md:p-8">
          <Image
            src="/logo.png"
            alt="Conecta UnB"
            width={450}
            height={450}
          />
          {/* Botão fechar (mobile) */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Fechar menu"
            className="md:hidden absolute right-3 top-3 rounded p-1 text-white/80 hover:bg-[#153b75] hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu de Navegação */}
        <nav className="flex flex-col w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href !== '#' && pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-4 px-8 py-4 transition-colors text-lg ${
                  isActive ? 'bg-[#153b75] font-bold' : 'hover:bg-[#153b75]'
                }`}
              >
                <Icon size={24} /> {item.label}
              </Link>
            );
          })}

          {user ? (
            <button
              onClick={logout}
              className="flex items-center gap-4 px-8 py-4 transition-colors text-lg hover:bg-[#153b75] text-left"
            >
              <LogOut size={24} /> Sair da Conta
            </button>
          ) : null}
        </nav>

        {/* Estampa decorativa no fundo da sidebar */}
        <div className="h-32 relative opacity-50">
          <Image
            src="/texturaHorizontal.png"
            alt="Textura decorativa"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </aside>
    </>
  );
};
