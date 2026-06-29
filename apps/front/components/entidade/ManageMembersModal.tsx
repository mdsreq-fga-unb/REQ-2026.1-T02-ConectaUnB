import React, { useEffect, useState } from 'react';
import { Trash2, X, ShieldAlert } from 'lucide-react';
import { api } from '@/guards/api';
import { ClassificacaoMembro } from '@/constants/options';
import { toast } from 'sonner';
import { ConfirmModal } from '@/components/ConfirmModal';

type MembroEntidade = {
  id: number;
  idPerfil: number;
  classificacao: 'GESTOR' | 'CO_GESTOR' | 'MEMBRO';
  perfil: { id: number; name: string; email: string; };
};

type ManageMembersModalProps = {
  isOpen: boolean;
  entidade: any | null;
  onClose: () => void;
  onChanged: () => void;
};

function MemberRoleEditor({ membro, entidadeId, isSaving, refreshDetalhe, allowedRoles }: any) {
  const [selectedRole, setSelectedRole] = useState(membro.classificacao);

  useEffect(() => setSelectedRole(membro.classificacao), [membro.classificacao]);

  const handleUpdateRole = async () => {
    try {
      await api.patch(`/entidade/${entidadeId}/membros/${membro.idPerfil}`, { classificacao: selectedRole });
      await refreshDetalhe();
      toast.success('Cargo atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar cargo do membro.');
      setSelectedRole(membro.classificacao); // Reverte caso dê erro
    }
  };

  return (
    <div className="flex items-center gap-2">
      <select 
        value={selectedRole} 
        onChange={(e) => setSelectedRole(e.target.value)} 
        disabled={isSaving} 
        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-[#195b3d] outline-none bg-white text-black"
      >
        {allowedRoles.map((opt: any) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {selectedRole !== membro.classificacao && (
        <button 
          type="button" 
          disabled={isSaving} 
          onClick={handleUpdateRole} 
          className="h-8 px-3 bg-[#195b3d] text-white rounded-md hover:bg-[#13472f] text-sm transition-colors"
        >
          Salvar
        </button>
      )}
    </div>
  );
}

export function ManageMembersModal({ isOpen, entidade, onClose, onChanged }: ManageMembersModalProps) {
  const [detalhe, setDetalhe] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [classificacao, setClassificacao] = useState('MEMBRO');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [memberToRemove, setMemberToRemove] = useState<number | null>(null);

  const currentUserRole = entidade?.vinculo?.classificacao;
  const isGestor = currentUserRole === 'GESTOR';
  const isCogestor = currentUserRole === 'CO_GESTOR';
  const canManage = isGestor || isCogestor;

  const gestoresCount = detalhe?.membros?.filter((m: MembroEntidade) => m.classificacao === 'GESTOR').length || 0;

  const allowedRoles = isGestor 
    ? ClassificacaoMembro 
    : ClassificacaoMembro.filter((opt) => opt.value !== 'GESTOR');

  const fetchDetalhe = async () => {
    if (!entidade) return;
    setIsLoading(true);
    try {
      const response = await api.get(`/entidade/${entidade.id}`);
      setDetalhe(response.data);
    } catch (error) {
      toast.error('Erro ao carregar os membros da entidade.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchDetalhe();
    else setDetalhe(null);
  }, [isOpen, entidade]);

  if (!isOpen || !entidade) return null;

  const handleAddMember = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      await api.post(`/entidade/${entidade.id}/membros`, { email, classificacao });
      setEmail('');
      setClassificacao('MEMBRO');
      await fetchDetalhe();
      toast.success('Membro adicionado com sucesso!');
      onChanged();
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Erro ao adicionar membro.';
      toast.error(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmRemove = async () => {
    if (!memberToRemove) return;
    setIsSaving(true);
    
    try {
      await api.delete(`/entidade/${entidade.id}/membros/${memberToRemove}`);
      await fetchDetalhe();
      toast.success('Membro removido com sucesso!');
      onChanged();
    } catch (error) {
      toast.error('Erro ao remover o membro.');
    } finally {
      setIsSaving(false);
      setMemberToRemove(null);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl max-h-[95vh] flex flex-col">
          
          {/* HEADER FIXO */}
          <div className="flex items-start justify-between gap-4 p-6 border-b border-gray-100 flex-shrink-0">
            <div>
              <h2 className="text-xl font-bold text-[#0d2a54]">{entidade.nome}</h2>
              <p className="text-sm text-gray-500">Gerenciamento de membros</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* CONTEÚDO ROLÁVEL */}
          <div className="p-6 space-y-6 overflow-y-auto">
            
            {/* SESSÃO: ADICIONAR MEMBRO */}
            {canManage && (
              <form onSubmit={handleAddMember} className="grid grid-cols-1 md:grid-cols-[1fr_180px_auto] gap-3 items-end bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-mail do usuário</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#195b3d] outline-none text-black bg-white" placeholder="Ex: usuario@unb.br" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Papel</label>
                  <select value={classificacao} onChange={(e) => setClassificacao(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#195b3d] outline-none bg-white text-black">
                    {allowedRoles.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </div>
                <button type="submit" disabled={isSaving} className="px-5 py-2 text-sm font-medium text-white bg-[#195b3d] rounded-md hover:bg-[#13472f] disabled:opacity-50 transition-colors">
                  Adicionar
                </button>
              </form>
            )}

            {/* SESSÃO: LISTA DE MEMBROS */}
            <div>
              <h3 className="text-sm font-semibold text-[#0d2a54] mb-3">Membros atuais ({detalhe?.membros?.length || 0})</h3>
              {isLoading ? (
                <p className="text-gray-500">Carregando membros...</p>
              ) : detalhe?.membros?.length ? (
                <div className="divide-y divide-gray-100 border border-gray-100 rounded-md bg-white">
                  
                  {detalhe.membros.map((membro: MembroEntidade) => {
                    
                    const isTargetGestor = membro.classificacao === 'GESTOR';
                    const isLastGestor = isTargetGestor && gestoresCount <= 1;

                    let canEditRow = false;
                    if (isGestor) {
                      canEditRow = !isLastGestor;
                    } else if (isCogestor) {
                      canEditRow = !isTargetGestor;
                    }

                    return (
                      <div key={membro.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 hover:bg-gray-50/50 transition-colors">
                        
                        <div className="min-w-0">
                          <p className="font-medium text-[#1D1D1D] truncate">{membro.perfil.name}</p>
                          <p className="text-sm text-gray-500 truncate">{membro.perfil.email}</p>
                        </div>
                        
                        {canManage ? (
                          canEditRow ? (
                            <div className="flex items-center gap-3">
                              <MemberRoleEditor 
                                membro={membro} 
                                entidadeId={entidade.id} 
                                isSaving={isSaving} 
                                refreshDetalhe={fetchDetalhe} 
                                allowedRoles={allowedRoles} 
                              />
                              <button 
                                type="button" 
                                disabled={isSaving} 
                                onClick={() => setMemberToRemove(membro.idPerfil)} 
                                className="text-red-600 hover:bg-red-50 p-2 rounded-md transition-colors"
                                title="Remover Membro"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 px-3 py-1.5 rounded-md border border-amber-100">
                              <ShieldAlert size={16} />
                              {isLastGestor ? 'Gestor Único' : 'Gestor (Protegido)'}
                            </div>
                          )
                        ) : (
                          <div className="text-sm text-gray-700 bg-gray-100 px-3 py-1.5 rounded-md self-start md:self-auto">
                            {membro.classificacao}
                          </div>
                        )}
                      </div>
                    );
                  })}

                </div>
              ) : (
                <p className="text-gray-500">Nenhum membro encontrado.</p>
              )}
            </div>
            
          </div>
        </div>
      </div>

      {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */}
      <ConfirmModal
        isOpen={memberToRemove !== null}
        title="Remover Membro"
        description="Tem certeza que deseja remover este membro da entidade? Ele perderá acesso imediato às áreas restritas."
        confirmText="Confirmar Remoção"
        variant="danger"
        onClose={() => setMemberToRemove(null)}
        onConfirm={handleConfirmRemove}
      />
    </>
  );
}