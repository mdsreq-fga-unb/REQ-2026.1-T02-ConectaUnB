"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Briefcase, Building2, Home, User, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const { logout } = useAuth();

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
    <aside className="w-64 bg-[#0d2a54] text-white flex flex-col h-screen sticky top-0 justify-between">
      <div className="p-8 flex justify-center">
        <Image
            src="/logo.png"
            alt="Conecta UnB"
            width={450}
            height={450}
        />
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
      </nav>

      {/* Estampa decorativa no fundo da sidebar */}
      <div className="h-32 relative opacity-50">
        <Image
          src="/texturaHorizontal.png"
          alt="Textura decorativa"
          fill
          className="object-cover"
        />
      </div>
    </aside>
  );
};
