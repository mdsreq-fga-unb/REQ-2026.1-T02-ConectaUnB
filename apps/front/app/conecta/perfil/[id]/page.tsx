"use client";

import { api } from "@/guards/api";
import { SeguindoCard } from "@/components/perfil/SeguindoCard";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { CAMPUS_OPTIONS, CURSO_OPTIONS, DEPARTAMENTO_OPTIONS } from "@/constants/options";
import {ConfirmModal} from "@/components/ConfirmModal";
import { AlterarSenhaModal } from "@/components/auth/alterarSenhaModal";

export default function PerfilPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const params = useParams();
  const profileId = params.id;

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalLogoutOpen, setIsModalLogoutOpen] = useState(false);

  const [isModalSenhaOpen, setIsModalSenhaOpen] = useState(false);

  const isOwner = user?.sub === profileId;

  const [projetosSeguidos, setProjetosSeguidos] = useState<
    { id: string; nome?: string; linkFoto?: string }[]
  >([]);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    matricula: "",
    email: "",
    campus: "",
    curso: "",
    departamento: "",
  });

  const fetchDados = async () => {
    try {
      const resPerfil = await api.get(`/perfil/${profileId}`);
      setFormData(resPerfil.data);
      const resSeguindo = await api.get(`/perfil/seguindo/${profileId}`);
      setProjetosSeguidos(resSeguindo.data);
    } catch (error: unknown) {
      console.error("Erro ao carregar perfil:", error);
      toast.error("Ocorreu um erro ao carregar o perfil.");
      router.push("/conecta/feed");
    }
  };

  useEffect(() => {
    if (profileId) {
      void fetchDados();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId, router]);

  const handleCancelEdit = () => {
    setIsEditing(false);
    fetchDados();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const payload = { ...formData };
      await api.patch(`/perfil`, payload);
      toast.success("Edição concluída com sucesso");
      setIsEditing(false);
    } catch (error: unknown) {
      console.error("Erro ao salvar perfil:", error);
      toast.error("Ocorreu um erro ao tentar salvar as alterações.");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/perfil`);
      toast.success("Perfil excluído com sucesso");
      logout();
    } catch (error: unknown) {
      console.error("Erro ao excluir perfil:", error);
      toast.error("Ocorreu um erro ao tentar excluir o perfil.");
    }
  };

  const handleLogout = () => {
    toast("Sessão encerrada", { description: "Até logo!" });
    logout(); 
  };

  return (
    <div className="min-h-screen flex bg-white">
      <main className="flex-1 p-8 sm:p-12 flex justify-center">
        <div className="w-full max-w-4xl space-y-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white">
            
            {/* foto */}
            <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium text-lg border border-gray-300 shrink-0">
              Foto
            </div>

            {/* dados perfil */}
            <div className="flex-1 w-full space-y-4 max-w-md">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Nome"
                className="w-full px-5 py-2.5 bg-transparent border border-[#006633] rounded-full text-[#1D1D1D] font-medium focus:outline-none disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
              />
              
              <input
                type="text"
                name="matricula"
                value={formData.matricula}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Matrícula"
                className="w-full px-5 py-2.5 bg-transparent border border-[#006633] rounded-full text-[#1D1D1D] font-medium focus:outline-none disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
              />

              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Email"
                className="w-full px-5 py-2.5 bg-transparent border border-[#006633] rounded-full text-[#1D1D1D] font-medium focus:outline-none disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
              />

              <div className="relative w-full">
                <select
                  name="campus"
                  value={formData.campus}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-5 py-2.5 pr-12 bg-transparent border border-[#006633] rounded-full text-[#1D1D1D] font-medium focus:outline-none disabled:bg-gray-50 disabled:text-gray-500 transition-colors appearance-none"
                >
                  {CAMPUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {isEditing && (
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#006633]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                )}
              </div>

              <div className="relative w-full">
                <select
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-5 py-2.5 pr-12 bg-transparent border border-[#006633] rounded-full text-[#1D1D1D] font-medium focus:outline-none disabled:bg-gray-50 disabled:text-gray-500 transition-colors appearance-none"
                >
                  {DEPARTAMENTO_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {isEditing && (
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#006633]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                )}
              </div>

              <div className="relative w-full">
                <select
                  name="curso"
                  value={formData.curso}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-5 py-2.5 pr-12 bg-transparent border border-[#006633] rounded-full text-[#1D1D1D] font-medium focus:outline-none disabled:bg-gray-50 disabled:text-gray-500 transition-colors appearance-none"
                >
                  {CURSO_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                {isEditing && (
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#006633]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-start gap-4 w-full md:w-52 shrink-0 min-h-40">
              {isOwner && (
                isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-6 py-2.5 bg-[#006633] text-white font-medium rounded-full hover:bg-[#004d26] transition-colors whitespace-nowrap"
                    >
                      Salvar Alterações
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-6 py-2.5 bg-gray-500 text-white font-medium rounded-full hover:bg-gray-600 transition-colors whitespace-nowrap"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={toggleEditMode}
                      className="px-6 py-2.5 bg-[#006633] text-white font-medium rounded-full hover:bg-[#004d26] transition-colors whitespace-nowrap"
                    >
                      Editar Perfil
                    </button>

                    <button 
                      onClick={() => setIsModalSenhaOpen(true)}
                      className="px-4 py-2 bg-[#003366] text-white rounded-full"
                    >
                      Alterar Senha
                    </button>

                    <button
                      className="px-6 py-2.5 bg-blue-800 text-white font-medium rounded-full hover:bg-blue-950 transition-colors whitespace-nowrap"
                      onClick={() => setIsModalLogoutOpen(true)}
                    >
                      Logout
                    </button>

                    <button
                      className="px-6 py-2.5 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-colors whitespace-nowrap"
                      onClick={() => setIsModalDeleteOpen(true)}
                    >
                      Excluir Perfil
                    </button>
                  </>
                )
              )}
            </div>
            
          </div>

          {/* projetos seguidos */}
          <div>
            <h2 className="text-[#003366] font-bold text-lg mb-2 tracking-wide uppercase">
              Seguindo
            </h2>
            <hr className="border-[#006633] border-t-2 mb-6" />

            {projetosSeguidos.length === 0 ? (
              <p className="text-gray-500">Este usuário ainda não segue nenhum projeto.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {projetosSeguidos.map((entidade) => (
                  <SeguindoCard
                    key={entidade.id}
                    nome={entidade.nome || "Projeto Sem Nome"}
                    imagem={entidade.linkFoto || undefined}
                    onClick={() => router.push(`/conecta/entidades/${entidade.id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* MODAIS */}
        <ConfirmModal
          isOpen={isModalDeleteOpen}
          title="Excluir Perfil"
          description="Tem certeza que deseja excluir seu perfil? Esta ação é irreversível."
          confirmText="Confirmar Exclusão"
          variant="danger"
          onClose={() => setIsModalDeleteOpen(false)}
          onConfirm={handleDelete}
        />

        <ConfirmModal
          isOpen={isModalLogoutOpen}
          title="Sair da Conta"
          description="Tem certeza que deseja sair da sua conta? Você precisará fazer login novamente."
          confirmText="Confirmar Saída"
          variant="primary"
          onClose={() => setIsModalLogoutOpen(false)}
          onConfirm={handleLogout}
        />

        <AlterarSenhaModal
          isOpen={isModalSenhaOpen}
          onClose={() => setIsModalSenhaOpen(false)}
        />
      </main>
    </div>
  );
}