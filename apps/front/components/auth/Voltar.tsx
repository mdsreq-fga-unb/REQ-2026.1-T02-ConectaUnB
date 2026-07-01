"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center justify-center p-2 text-black transition-colors rounded-full hover:bg-gray-300 hover:text-shadow-black"
      aria-label="Voltar para a página anterior"
    >
      <ArrowLeft size={48} />
    </button>
  );
};