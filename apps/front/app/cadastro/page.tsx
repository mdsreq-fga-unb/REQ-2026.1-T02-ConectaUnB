"use client";

import { useState } from "react";
import Image from "next/image";

export default function CadastroPage() {
  // Dados p/ cadastro
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    matricula: "",
    senha: "",
    curso: "",
    departamento: "",
    campus: "",
    cargo: "DISCENTE", 
  });

  return (
    // divide a tela em duas colunas apenas em monitores/tablets.
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 text-[#1D1D1D]">

      {/* coluna da esquerda - escondemos em celulares e mostramos em telas maiores */}
      <section className="hidden md:flex flex-col items-center justify-center bg-[#003366] relative overflow-hidden">
    
        <div className="absolute inset-0 opacity-30 bg-[url('/fundoGeometrico.svg')] bg-[length:100%] bg-[position:0%_35%] bg-no-repeat" />

        <div className="relative z-10 bg-white p-8 rounded-xl shadow-2xl">
          <Image
            src="/logoConecta.svg" 
            alt="Logo Conecta UnB"
            width={250}
            height={250}
            priority 
          />
        </div>

      </section>

      {/* "Formulário" */}
      <section className="flex flex-col items-center justify-center bg-white p-8 sm:p-12">
        <div className="w-full max-w-md space-y-8">

          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#003366]">Cadastre-se</h1>
          </div>

          <form className="mt-8 space-y-4">
            <div className="p-4 border-2 border-dashed border-gray-300 rounded text-center text-gray-500">
              campos aqui
            </div>
          </form>

        </div>
      </section>

    </main>
  );
}