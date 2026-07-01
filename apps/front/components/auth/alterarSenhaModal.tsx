"use client";

import { useState, useEffect } from "react";
import { api } from "@/guards/api";

type FieldErrors = Record<string, string>;

interface AlterarSenhaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AlterarSenhaModal({ isOpen, onClose }: AlterarSenhaModalProps) {
  const [senha, setSenha] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
  
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmSenha, setShowConfirmSenha] = useState(false);

  // Limpa o estado sempre que o modal for fechado/aberto
  useEffect(() => {
    if (!isOpen) {
      setSenha("");
      setConfirmacaoSenha("");
      setFieldErrors({});
      setSubmitError("");
      setSubmitSuccess(false);
      setShowSenha(false);
      setShowConfirmSenha(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  function validate(): FieldErrors {
    const errors: FieldErrors = {};

    if (senha.length > 0 && /\s/.test(senha)) {
      errors.senha = "A senha não pode conter espaços.";
    } else if (senha.length > 0 && senha.length < 8) {
      errors.senha = "A senha deve ter pelo menos 8 caracteres.";
    }

    if (senha && confirmacaoSenha && senha !== confirmacaoSenha) {
      errors.confirmacaoSenha = "As senhas não coincidem.";
    }

    return errors;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    if (!senha) {
      setFieldErrors({ senha: "A nova senha é obrigatória." });
      return;
    }

    if (senha !== confirmacaoSenha) {
      setFieldErrors({ confirmacaoSenha: "As senhas não coincidem." });
      return;
    }

    try {
      setLoading(true);
      // TODO: Ajuste a rota abaixo para a rota real de atualização de senha no seu backend
      await api.patch("/perfil/senha", { novaSenha: senha });
      
      setSubmitSuccess(true);
      
      // Fecha o modal após 2 segundos em caso de sucesso
      setTimeout(() => {
        onClose();
      }, 2000);
      
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string | string[] } } };
      const rawMsg = Array.isArray(err.response?.data?.message)
        ? err.response.data.message.join("; ")
        : err.response?.data?.message || "Ocorreu um erro ao tentar alterar a senha.";
      setSubmitError(rawMsg);
    } finally {
      setLoading(false);
    }
  };

  const temMinimoCaracteres = senha.length >= 8;
  const temMaiuscula = /[A-Z]/.test(senha);
  const temMinuscula = /[a-z]/.test(senha);
  const temNumero = /[0-9]/.test(senha);
  const temEspecial = /[^A-Za-z0-9]/.test(senha);
  const senhasCoincidem = senha === confirmacaoSenha && senha.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-2xl p-8 shadow-xl text-[#1D1D1D]">
        
        {/* Botão de Fechar Modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          aria-label="Fechar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#003366]">Alterar Senha</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          {/* Nova Senha */}
          <div className="flex flex-col">
            <label className="mb-1 ml-4 text-[#003366] font-medium">Nova Senha</label>
            <div className="relative">
              <input
                type={showSenha ? "text" : "password"}
                name="senha"
                required
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  setFieldErrors({ ...fieldErrors, senha: "" });
                }}
                className={`w-full px-4 py-2 pr-10 bg-transparent border rounded-full focus:outline-none focus:ring-2 ${
                  fieldErrors.senha ? "border-red-400 focus:ring-red-400" : "border-[#006633] focus:ring-[#006633]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowSenha((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#003366]"
                tabIndex={-1}
              >
                {showSenha ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
            {senha.length > 0 && (
              <div className="mt-2 ml-4 text-xs space-y-1 transition-all">
                <p className={temMinimoCaracteres ? "text-green-600" : "text-gray-400"}>
                  {temMinimoCaracteres ? "✓" : "○"} Pelo menos 8 caracteres
                </p>
                <p className={temMaiuscula ? "text-green-600" : "text-gray-400"}>
                  {temMaiuscula ? "✓" : "○"} Uma letra maiúscula
                </p>
                <p className={temMinuscula ? "text-green-600" : "text-gray-400"}>
                  {temMinuscula ? "✓" : "○"} Uma letra minúscula
                </p>
                <p className={temNumero ? "text-green-600" : "text-gray-400"}>
                  {temNumero ? "✓" : "○"} Um número
                </p>
                <p className={temEspecial ? "text-green-600" : "text-gray-400"}>
                  {temEspecial ? "✓" : "○"} Um caractere especial (!@#$...)
                </p>
              </div>
            )}
            {fieldErrors.senha && (
              <p className="mt-1 ml-4 text-xs text-red-500">{fieldErrors.senha}</p>
            )}
          </div>

          {/* Confirmação de Senha */}
          <div className="flex flex-col">
            <label className="mb-1 ml-4 text-[#003366] font-medium">Confirmação de Senha</label>
            <div className="relative">
              <input
                type={showConfirmSenha ? "text" : "password"}
                name="confirmacaoSenha"
                required
                value={confirmacaoSenha}
                onChange={(e) => {
                  setConfirmacaoSenha(e.target.value);
                  setFieldErrors({ ...fieldErrors, confirmacaoSenha: "" });
                }}
                className={`w-full px-4 py-2 pr-10 bg-transparent border rounded-full focus:outline-none focus:ring-2 ${
                  fieldErrors.confirmacaoSenha ? "border-red-400 focus:ring-red-400" : "border-[#006633] focus:ring-[#006633]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmSenha((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#003366]"
                tabIndex={-1}
              >
                {showConfirmSenha ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
            {confirmacaoSenha.length > 0 && (
              <p className={`mt-1 ml-4 text-xs font-medium ${senhasCoincidem ? "text-green-600" : "text-red-500"}`}>
                {senhasCoincidem ? "✓ As senhas coincidem" : "○ As senhas não coincidem"}
              </p>
            )}
            {fieldErrors.confirmacaoSenha && (
              <p className="mt-1 ml-4 text-xs text-red-500">{fieldErrors.confirmacaoSenha}</p>
            )}
          </div>

          {/* Feedback de Servidor */}
          {submitSuccess && (
            <p className="mt-3 text-sm text-green-600 font-medium text-center bg-green-50 p-2 rounded-lg">
              Senha atualizada com sucesso!
            </p>
          )}

          {submitError && (
            <p className="mt-3 text-sm text-red-500 font-medium text-center bg-red-50 p-2 rounded-lg">
              {submitError}
            </p>
          )}

          {/* Botão de Enviar */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-[#006633] text-white font-semibold rounded-full hover:bg-[#004d26] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006633] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Atualizando..." : "Salvar Nova Senha"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}