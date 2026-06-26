"use client";

import { Sidebar } from '@/components/Sidebar';
import { ProjetoCardLarge } from '@/components/ProjetoCardLarge';
import { Bell } from 'lucide-react';

export default function PerfilEntidadePage() {
  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar />

      <main className="flex-1 bg-white overflow-y-auto">
        {/* Banner */}
        <div className="h-48 w-full bg-[#E0E0E0]"></div>

        <div className="max-w-5xl mx-auto px-8 pb-12">
          {/* Header section with photo, name and follow button */}
          <div className="flex justify-between items-start -mt-16">
            <div>
              {/* Profile Photo */}
              <div className="w-32 h-32 rounded-full bg-[#A3A3A3] border-4 border-white shadow-sm flex-shrink-0"></div>
              
              <div className="mt-4">
                <h1 className="text-2xl font-bold text-black">Nome</h1>
                <p className="text-gray-600 text-sm mt-1">Campus | Departamento</p>
              </div>
            </div>

            {/* Follow Button & Bell */}
            <div className="flex items-center gap-4 mt-20">
              <button className="px-6 py-2 bg-[#195b3d] text-white font-medium rounded-full hover:bg-[#12452c] transition-colors">
                Seguir
              </button>
              <button className="text-[#003366] hover:text-[#001a33] transition-colors">
                <Bell size={24} fill="currentColor" />
              </button>
            </div>
          </div>

          {/* Sobre Section */}
          <div className="mt-10">
            <div className="border border-[#195b3d] rounded-xl p-6 shadow-sm">
              <h2 className="text-black font-bold mb-4">Sobre</h2>
              <div className="space-y-4">
                <div className="w-full h-[2px] bg-gray-300"></div>
                <div className="w-full h-[2px] bg-gray-300"></div>
                <div className="w-full h-[2px] bg-gray-300"></div>
                <div className="w-full h-[2px] bg-gray-300"></div>
              </div>
            </div>
          </div>

          {/* Projetos Section */}
          <div className="mt-12">
            <h2 className="text-[#003366] font-bold text-lg mb-2">
              Projetos
            </h2>
            <hr className="border-[#195b3d] border-t-[1.5px] mb-6" />
            
            {/* Using ProjetoCardLarge as requested */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <ProjetoCardLarge nome="Nome" />
              <ProjetoCardLarge nome="Nome" />
              <ProjetoCardLarge nome="Nome" />
            </div>
          </div>

          {/* Publicações Section */}
          <div className="mt-12">
            <h2 className="text-[#003366] font-bold text-lg mb-2">
              Publicações
            </h2>
            <hr className="border-[#195b3d] border-t-[1.5px] mb-6" />

            <div className="space-y-6">
              <div className="w-full h-48 bg-[#D9D9D9] rounded-sm"></div>
              <div className="w-full h-12 bg-[#D9D9D9] rounded-sm"></div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}