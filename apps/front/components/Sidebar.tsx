"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Briefcase, Building2, Home, User } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const navItems = [
    { href: '/', label: 'Feed', icon: Home },
    { href: '/projetos', label: 'Projetos', icon: Briefcase },
    { href: '/entidades', label: 'Entidades', icon: Building2 },
    { href: '#', label: 'Notificações', icon: Bell },
    { href: '#', label: 'Perfil', icon: User },
  ];

  return (
    <aside className="w-64 bg-[#0d2a54] text-white flex flex-col min-h-screen justify-between">
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
