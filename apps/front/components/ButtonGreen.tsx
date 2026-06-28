import React from 'react';
import { Plus } from 'lucide-react';

interface ButtonGreenProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

export const ButtonGreen: React.FC<ButtonGreenProps> = ({ text = "Criar Projeto", ...props }) => {
  return (
    <button 
      {...props}
      className={`flex items-center gap-2 bg-[#195b3d] hover:bg-[#13472f] text-white px-6 py-3 rounded-md font-medium transition-colors ${props.className || ''}`}
    >
      <Plus size={20} />
      {text}
    </button>
  );
};