import React from 'react';
import { Plus } from 'lucide-react';

export const ButtonGreen: React.FC = () => {
  return (
    <button className="flex items-center gap-2 bg-[#195b3d] hover:bg-[#13472f] text-white px-6 py-3 rounded-md font-medium transition-colors">
      <Plus size={20} />
      Criar Projeto
    </button>
  );
};