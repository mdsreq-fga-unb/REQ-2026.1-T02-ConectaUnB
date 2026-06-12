import React from 'react';
import Image from 'next/image';
import { Home, Briefcase, Bell, User } from 'lucide-react';

export const Sidebar: React.FC = () => {
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
        <a href="#" className="flex items-center gap-4 px-8 py-4 hover:bg-[#153b75] transition-colors text-lg">
          <Home size={24} /> Feed
        </a>
        {/* Item ativo tem um peso na fonte maior, você pode ajustar o background também se desejar */}
        <a href="#" className="flex items-center gap-4 px-8 py-4 bg-[#153b75] font-bold text-lg">
          <Briefcase size={24} /> Projetos
        </a>
        <a href="#" className="flex items-center gap-4 px-8 py-4 hover:bg-[#153b75] transition-colors text-lg">
          <Bell size={24} /> Notificações
        </a>
        <a href="#" className="flex items-center gap-4 px-8 py-4 hover:bg-[#153b75] transition-colors text-lg">
          <User size={24} /> Perfil
        </a>
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