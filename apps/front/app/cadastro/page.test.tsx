import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CadastroPage, { CAMPUS_OPTIONS } from './page';

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => <img alt="" {...props} />,
}));

vi.mock('axios', () => ({
  default: {
    post: vi.fn(),
  },
}));

import axios from 'axios';
const mockedAxios = vi.mocked(axios);

describe('CadastroPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the registration heading', () => {
    render(<CadastroPage />);
    expect(screen.getByText('Cadastre-se')).toBeInTheDocument();
  });

  it('should render all campus options', () => {
    render(<CadastroPage />);
    CAMPUS_OPTIONS.forEach((campus) => {
      expect(screen.getByText(campus.label)).toBeInTheDocument();
    });
  });

  it('should render cargo options', () => {
    render(<CadastroPage />);
    expect(screen.getByText('Discente')).toBeInTheDocument();
    expect(screen.getByText('Docente')).toBeInTheDocument();
  });

  it('should render the submit button', () => {
    render(<CadastroPage />);
    expect(screen.getByRole('button', { name: /cadastro/i })).toBeInTheDocument();
  });

  it('should show password validation hints when typing password', () => {
    const { container } = render(<CadastroPage />);
    const senhaInput = container.querySelector('input[name="senha"]')!;

    fireEvent.change(senhaInput, { target: { value: 'a' } });

    expect(screen.getByText(/Pelo menos 8 caracteres/i)).toBeInTheDocument();
    expect(screen.getByText(/Uma letra maiúscula/i)).toBeInTheDocument();
    expect(screen.getByText(/Uma letra minúscula/i)).toBeInTheDocument();
    expect(screen.getByText(/Um número/i)).toBeInTheDocument();
    expect(screen.getByText(/Um caractere especial/i)).toBeInTheDocument();
  });

  it('should show password match indicator', () => {
    const { container } = render(<CadastroPage />);
    const senhaInput = container.querySelector('input[name="senha"]')!;
    const confirmInput = container.querySelector('input[name="confirmacaoSenha"]')!;

    fireEvent.change(senhaInput, { target: { value: 'Senha@123' } });
    fireEvent.change(confirmInput, { target: { value: 'Senha@123' } });

    expect(screen.getByText(/As senhas coincidem/i)).toBeInTheDocument();
  });

  it('should show password mismatch indicator', () => {
    const { container } = render(<CadastroPage />);
    const senhaInput = container.querySelector('input[name="senha"]')!;
    const confirmInput = container.querySelector('input[name="confirmacaoSenha"]')!;

    fireEvent.change(senhaInput, { target: { value: 'Senha@123' } });
    fireEvent.change(confirmInput, { target: { value: 'Different@123' } });

    expect(screen.getByText(/As senhas não coincidem/i)).toBeInTheDocument();
  });

  it('should call API on form submit with valid data', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { id: 1 } });
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    const { container } = render(<CadastroPage />);

    fireEvent.change(container.querySelector('input[name="name"]')!, { target: { value: 'Test User' } });
    fireEvent.change(container.querySelector('input[name="email"]')!, { target: { value: 'test@aluno.unb.br' } });
    fireEvent.change(container.querySelector('input[name="matricula"]')!, { target: { value: '123456789' } });
    fireEvent.change(container.querySelector('select[name="campus"]')!, { target: { value: 'GAMA' } });
    fireEvent.change(container.querySelector('select[name="departamento"]')!, { target: { value: 'FCTE' } });
    fireEvent.change(container.querySelector('select[name="curso"]')!, { target: { value: 'ENGENHARIA_DE_SOFTWARE' } });
    fireEvent.change(container.querySelector('input[name="senha"]')!, { target: { value: 'Senha@123' } });
    fireEvent.change(container.querySelector('input[name="confirmacaoSenha"]')!, { target: { value: 'Senha@123' } });

    const submitButton = screen.getByRole('button', { name: /cadastro/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://localhost:3000/auth/register',
        expect.objectContaining({
          name: 'Test User',
          email: 'test@aluno.unb.br',
        }),
      );
    });

    alertSpy.mockRestore();
  });

  it('should show error alert when submission fails', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: { data: { message: 'Email already exists' } },
    });
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    const { container } = render(<CadastroPage />);

    fireEvent.change(container.querySelector('input[name="name"]')!, { target: { value: 'Test' } });
    fireEvent.change(container.querySelector('input[name="email"]')!, { target: { value: 'test@aluno.unb.br' } });
    fireEvent.change(container.querySelector('select[name="campus"]')!, { target: { value: 'GAMA' } });
    fireEvent.change(container.querySelector('select[name="departamento"]')!, { target: { value: 'FCTE' } });
    fireEvent.change(container.querySelector('select[name="curso"]')!, { target: { value: 'ENGENHARIA_DE_SOFTWARE' } });
    fireEvent.change(container.querySelector('input[name="senha"]')!, { target: { value: 'Senha@123' } });
    fireEvent.change(container.querySelector('input[name="confirmacaoSenha"]')!, { target: { value: 'Senha@123' } });

    const form = container.querySelector('form')!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Email already exists');
    }, { timeout: 3000 });

    alertSpy.mockRestore();
  });
});
