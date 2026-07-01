import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ButtonGreen } from './ButtonGreen'; // Importação nomeada

describe('ButtonGreen', () => {
  it('deve renderizar o botão com o texto correto', () => {
    render(<ButtonGreen text="Criar Projeto" />);
    
    // Busca o botão na tela e verifica se contém o texto passado
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Criar Projeto');
    expect(button).toBeInTheDocument();
  });

  it('deve renderizar corretamente sem a prop text (apenas o ícone)', () => {
    render(<ButtonGreen />);
    
    // Busca o botão na tela e garante que ele renderizou mesmo sem texto
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('deve repassar e disparar eventos nativos como onClick', () => {
    // Cria uma função "espiã" (mock) para monitorar o clique
    const handleClick = vi.fn();
    
    render(<ButtonGreen text="Confirmar" onClick={handleClick} />);
    
    const button = screen.getByRole('button');
    
    // Simula um clique do usuário
    fireEvent.click(button);
    
    // Verifica se a função foi chamada exatamente 1 vez
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});