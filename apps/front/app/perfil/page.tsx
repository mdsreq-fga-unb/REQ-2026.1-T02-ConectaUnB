"use client";

import { ProjetoCard } from "../components/projetoCard";
import { useState } from "react"
// adicionar import para a sidebar caso não esteja no mesmo arquivo

export default function PerfilPage() {
  /// Estado que controla se os campos estão liberados para edição
  const [isEditing, setIsEditing] = useState(false);

  // Função para alternar o modo de edição
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen flex bg-white">
      
      {/* sidebar virá aqui */}
      <div className="hidden md:flex w-64 bg-gray-100 border-r border-gray-200 items-center justify-center flex-shrink-0 text-gray-400 font-medium">
        [ Sidebar ]
      </div>

      <main className="flex-1 p-8 sm:p-12 flex justify-center">
        <div className="w-full max-w-4xl space-y-16">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white">
            
            {/* foto */}
            <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium text-lg border border-gray-300 flex-shrink-0">
              Foto
            </div>

            {/* dados perfil */}
<div className="flex-1 w-full space-y-4 max-w-md">
              <input
                type="text"
                placeholder="Nome"
                disabled={!isEditing} 
                className="w-full px-5 py-2.5 bg-transparent border border-[#006633] rounded-full text-[#1D1D1D] font-medium focus:outline-none disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
              />
              <input
                type="text"
                placeholder="Matrícula"
                disabled={!isEditing}
                className="w-full px-5 py-2.5 bg-transparent border border-[#006633] rounded-full text-[#1D1D1D] font-medium focus:outline-none disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
              />
              <input
                type="text"
                placeholder="Curso"
                disabled={!isEditing}
                className="w-full px-5 py-2.5 bg-transparent border border-[#006633] rounded-full text-[#1D1D1D] font-medium focus:outline-none disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
              />
            </div>

            {/* botões editar e excluir */}
            <div className="flex flex-col gap-4 w-full md:w-auto">
              {isEditing ? (
                <button 
                  onClick={toggleEditMode} 
                  className="px-6 py-2.5 bg-[#003366] text-white font-medium rounded-full hover:bg-[#002244] transition-colors whitespace-nowrap"
                >
                  Salvar Alterações
                </button>
              ) : (
                <button 
                  onClick={toggleEditMode} 
                  className="px-6 py-2.5 bg-[#006633] text-white font-medium rounded-full hover:bg-[#004d26] transition-colors whitespace-nowrap"
                >
                  Editar Perfil
                </button>
              )}

              <button className="px-6 py-2.5 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-colors whitespace-nowrap">
                Excluir Perfil
              </button>
            </div>

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