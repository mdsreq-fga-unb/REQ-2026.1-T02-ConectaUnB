"use client";

import { ProjetoCard } from "../components/projetoCard";

// adicionar import para a sidebar caso não esteja no mesmo arquivo

export default function PerfilPage() {
  return (
    <div className="min-h-screen flex bg-white">
      
      {/* sidebar virá aqui */}
      <div className="hidden md:flex w-64 bg-gray-100 border-r border-gray-200 items-center justify-center flex-shrink-0 text-gray-400 font-medium">
        [ Sidebar ]
      </div>

      {/* conteudos do perfil */}
      <main className="flex-1 p-8 sm:p-12 flex justify-center">
        <div className="w-full max-w-4xl space-y-16">
          
          {/* dados de perfil */}
          <div className="p-8 border-2 border-dashed border-gray-300 rounded-xl text-center text-gray-500">
            
          </div>

          {/* projetos seguidos */}
          <div>
            <h2 className="text-[#003366] font-bold text-lg mb-2 tracking-wide uppercase">
              Seguindo
            </h2>
            <hr className="border-[#006633] border-t-2 mb-6" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ProjetoCard nome="Projeto 01" />
              <ProjetoCard nome="Projeto 02" />
              <ProjetoCard nome="Projeto 03" />
              <ProjetoCard nome="Projeto 04" />
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}