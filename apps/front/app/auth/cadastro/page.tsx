"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "@/guards/api";
import {useRouter} from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import AuthBanner from "@/components/auth/AuthBanner";
import { CAMPUS_OPTIONS, CURSO_OPTIONS, DEPARTAMENTO_OPTIONS } from "@/constants/options";
import { BackButton } from "@/components/auth/Voltar";

type FieldErrors = Record<string, string>;

export default function CadastroPage() {

  const router = useRouter();

  const { user, login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    matricula: "",
    senha: "",
    confirmacaoSenha: "",
    curso: "",
    departamento: "",
    campus: "",
    cargo: "DISCENTE",
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmSenha, setShowConfirmSenha] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/conecta/feed");
    }
  }, [user, router]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
    setSubmitError("");
    setSubmitSuccess(false);
  };

  function validate(): FieldErrors {
    const errors: FieldErrors = {};

    if (formData.name.trim().length < 3) {
      errors.name = "O nome deve ter pelo menos 3 caracteres.";
    }

    if (formData.cargo === "DISCENTE") {
      if (!formData.email.trim().endsWith("@aluno.unb.br")) {
        errors.email = "O e-mail de discente deve obrigatoriamente terminar com @aluno.unb.br";
      }
    } else if (formData.cargo === "DOCENTE") {
      if (!formData.email.trim().endsWith("@unb.br")) {
        errors.email = "O e-mail de docente deve obrigatoriamente terminar com @unb.br";
      }
    }

    if (!formData.email.trim()) {
      errors.email = "O e-mail é obrigatório.";
    }

    if (formData.cargo === "DISCENTE") {
      if (!formData.matricula.trim()) {
        errors.matricula = "A matrícula é obrigatória para discentes.";
      } else if (!/^\d{9}$/.test(formData.matricula.trim())) {
        errors.matricula = "A matrícula deve conter exatamente 9 dígitos numéricos.";
      }
    }

    if (!formData.campus) {
      errors.campus = "Selecione um campus.";
    }

    if (!formData.departamento) {
      errors.departamento = "Selecione um departamento.";
    }

    if (!formData.curso) {
      errors.curso = "Selecione um curso.";
    }

    if (formData.senha.length > 0 && /\s/.test(formData.senha)) {
      errors.senha = "A senha não pode conter espaços.";
    } else if (formData.senha.length > 0 && formData.senha.length < 8) {
      errors.senha = "A senha deve ter pelo menos 8 caracteres.";
    }

    if (formData.senha && formData.confirmacaoSenha && formData.senha !== formData.confirmacaoSenha) {
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

    if (formData.senha !== formData.confirmacaoSenha) {
      setFieldErrors({ confirmacaoSenha: "As senhas não coincidem." });
      return;
    }

    const { confirmacaoSenha, ...dadosLimpos } = formData;

    const payloadFinal: Record<string, unknown> = { ...dadosLimpos };

    try {
      const response = await api.post("/auth/register", payloadFinal);
      console.log("Sucesso!", response.data);
      setSubmitSuccess(true);

      const responseLogin = await api.post("/auth/login", {
        email: formData.email.trim(),
        senha: formData.senha,
      });

      const token = responseLogin.data?.access_token;

      if (token) {
        login(token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }

      router.refresh();
      router.push("/conecta/feed");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string | string[] }; status?: number } };
      const rawMsg = Array.isArray(err.response?.data?.message)
        ? err.response.data.message.join("; ")
        : err.response?.data?.message || "Ocorreu um erro ao tentar cadastrar.";
      if (rawMsg.includes("already exists") || rawMsg.includes("duplicat") || err.response?.status === 409) {
        setSubmitError("Este e-mail já está cadastrado.");
        setFieldErrors({ email: "Este e-mail já está cadastrado." });
      } else {
        setSubmitError(rawMsg);
      }
    }
  };

  const temMinimoCaracteres = formData.senha.length >= 8;
  const temMaiuscula = /[A-Z]/.test(formData.senha);
  const temMinuscula = /[a-z]/.test(formData.senha);
  const temNumero = /[0-9]/.test(formData.senha);
  const temEspecial = /[^A-Za-z0-9]/.test(formData.senha);
  const senhasCoincidem = formData.senha === formData.confirmacaoSenha;

  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 text-[#1D1D1D]">

      <AuthBanner/>

      <section className="relative flex flex-col items-center justify-center bg-white p-8 sm:p-12">
              
        <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
          <BackButton />
        </div>
              
        <div className="w-full max-w-md space-y-8">

          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#003366]">Cadastre-se</h1>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-sm">

            <div className="flex flex-col">
              <label className="mb-1 ml-4 text-[#003366] font-medium">Nome</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-transparent border rounded-full focus:outline-none focus:ring-2 ${
                  fieldErrors.name ? "border-red-400 focus:ring-red-400" : "border-[#006633] focus:ring-[#006633]"
                }`}
              />
              {fieldErrors.name && (
                <p className="mt-1 ml-4 text-xs text-red-500">{fieldErrors.name}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 ml-4 text-[#003366] font-medium">Cargo</label>
              <select
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-transparent border border-[#006633] rounded-full focus:outline-none focus:ring-2 focus:ring-[#006633]"
              >
                <option value="DISCENTE">Discente</option>
                <option value="DOCENTE">Docente</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 ml-4 text-[#003366] font-medium">Email UnB</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder={formData.cargo === "DISCENTE" ? "@aluno.unb.br" : "@unb.br"}
                className={`w-full px-4 py-2 bg-transparent border rounded-full focus:outline-none focus:ring-2 placeholder:text-gray-400 placeholder:text-xs ${
                  fieldErrors.email ? "border-red-400 focus:ring-red-400" : "border-[#006633] focus:ring-[#006633]"
                }`}
              />
              {fieldErrors.email && (
                <p className="mt-1 ml-4 text-xs text-red-500">{fieldErrors.email}</p>
              )}
            </div>

              <div className="flex flex-col">
                <label className="mb-1 ml-4 text-[#003366] font-medium">Matrícula</label>
                <input
                  type="text"
                  name="matricula"
                  required
                  value={formData.matricula}
                  onChange={handleChange}
                  placeholder="Ex: 123456789"
                  className={`w-full px-4 py-2 bg-transparent border rounded-full focus:outline-none focus:ring-2 ${
                    fieldErrors.matricula ? "border-red-400 focus:ring-red-400" : "border-[#006633] focus:ring-[#006633]"
                  }`}
                />
                {fieldErrors.matricula && (
                  <p className="mt-1 ml-4 text-xs text-red-500">{fieldErrors.matricula}</p>
                )}
              </div>

            <div className="flex flex-col">
              <label className="mb-1 ml-4 text-[#003366] font-medium">Campus</label>
              <select
                name="campus"
                required
                value={formData.campus}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-transparent border rounded-full focus:outline-none focus:ring-2 ${
                  fieldErrors.campus ? "border-red-400 focus:ring-red-400" : "border-[#006633] focus:ring-[#006633]"
                }`}
              >
                <option value="">Selecione o campus...</option>
                {CAMPUS_OPTIONS.map((campus) => (
                  <option key={campus.value} value={campus.value}>{campus.label}</option>
                ))}
              </select>
              {fieldErrors.campus && (
                <p className="mt-1 ml-4 text-xs text-red-500">{fieldErrors.campus}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 ml-4 text-[#003366] font-medium">Departamento</label>
              <select
                name="departamento"
                required
                value={formData.departamento}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-transparent border rounded-full focus:outline-none focus:ring-2 ${
                  fieldErrors.departamento ? "border-red-400 focus:ring-red-400" : "border-[#006633] focus:ring-[#006633]"
                }`}
              >
                <option value="">Selecione o departamento...</option>
                {DEPARTAMENTO_OPTIONS.map((depto) => (
                  <option key={depto.value} value={depto.value}>{depto.label}</option>
                ))}
              </select>
              {fieldErrors.departamento && (
                <p className="mt-1 ml-4 text-xs text-red-500">{fieldErrors.departamento}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 ml-4 text-[#003366] font-medium">Curso</label>
              <select
                name="curso"
                required
                value={formData.curso}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-transparent border rounded-full focus:outline-none focus:ring-2 ${
                  fieldErrors.curso ? "border-red-400 focus:ring-red-400" : "border-[#006633] focus:ring-[#006633]"
                }`}
              >
                <option value="">Selecione o curso...</option>
                {CURSO_OPTIONS.map((curso) => (
                  <option key={curso.value} value={curso.value}>{curso.label}</option>
                ))}
              </select>
              {fieldErrors.curso && (
                <p className="mt-1 ml-4 text-xs text-red-500">{fieldErrors.curso}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 ml-4 text-[#003366] font-medium">Senha</label>
              <div className="relative">
                <input
                  type={showSenha ? "text" : "password"}
                  name="senha"
                  required
                  value={formData.senha}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 pr-10 bg-transparent border rounded-full focus:outline-none focus:ring-2 ${
                    fieldErrors.senha ? "border-red-400 focus:ring-red-400" : "border-[#006633] focus:ring-[#006633]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowSenha((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#003366]"
                  tabIndex={-1}
                  aria-label={showSenha ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showSenha ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {formData.senha.length > 0 && (
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

            <div className="flex flex-col">
              <label className="mb-1 ml-4 text-[#003366] font-medium">Confirmação de Senha</label>
              <div className="relative">
                <input
                  type={showConfirmSenha ? "text" : "password"}
                  name="confirmacaoSenha"
                  required
                  value={formData.confirmacaoSenha}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 pr-10 bg-transparent border rounded-full focus:outline-none focus:ring-2 ${
                    fieldErrors.confirmacaoSenha ? "border-red-400 focus:ring-red-400" : "border-[#006633] focus:ring-[#006633]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmSenha((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#003366]"
                  tabIndex={-1}
                  aria-label={showConfirmSenha ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showConfirmSenha ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {formData.confirmacaoSenha.length > 0 && (
                <p className={`mt-1 ml-4 text-xs font-medium ${senhasCoincidem ? "text-green-600" : "text-red-500"}`}>
                  {senhasCoincidem ? "✓ As senhas coincidem" : "○ As senhas não coincidem"}
                </p>
              )}
              {fieldErrors.confirmacaoSenha && (
                <p className="mt-1 ml-4 text-xs text-red-500">{fieldErrors.confirmacaoSenha}</p>
              )}
            </div>

            <div className="pt-4 flex flex-col items-center">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#006633] text-white font-semibold rounded-full hover:bg-[#004d26] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006633]"
              >
                Cadastro
              </button>

              <a href="/auth/login" className="text-sm text-[#003366] hover:underline mt-4">
                Login
              </a>

              {submitSuccess && (
                <p className="mt-3 text-xs text-green-600 font-medium text-center">
                  Cadastro realizado com sucesso!
                </p>
              )}

              {submitError && (
                <p className="mt-3 text-xs text-red-500 font-medium text-center">
                  {submitError}
                </p>
              )}
            </div>

          </form>

        </div>
      </section>

    </main>
  );
}