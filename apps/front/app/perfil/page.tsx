"use client";

import { ProjetoCard } from "../components/projetoCard";
import { useState } from "react"
// adicionar import para a sidebar caso não esteja no mesmo arquivo

const CAMPUS_OPTIONS = [
  { value: "DARCY", label: "Darcy Ribeiro" },
  { value: "CEILANDIA", label: "Ceilândia" },
  { value: "GAMA", label: "Gama" },
  { value: "PLANALTINA", label: "Planaltina" },
];

const CURSO_OPTIONS = [
  { value: "ADMINISTRACAO", label: "Administração" },
  { value: "AGRONOMIA", label: "Agronomia" },
  { value: "ARQUITETURA_E_URBANISMO", label: "Arquitetura e Urbanismo" },
  { value: "ARQUIVOLOGIA", label: "Arquivologia" },
  { value: "ARTES_CENICAS", label: "Artes Cênicas" },
  { value: "ARTES_CENICAS_INTERPRETACAO_TEATRAL", label: "Artes Cênicas - Interpretação Teatral" },
  { value: "ARTES_VISUAIS", label: "Artes Visuais" },
  { value: "BIBLIOTECONOMIA", label: "Biblioteconomia" },
  { value: "BIOTECNOLOGIA", label: "Biotecnologia" },
  { value: "CIENCIA_DA_COMPUTACAO", label: "Ciência da Computação" },
  { value: "CIENCIA_POLITICA", label: "Ciência Política" },
  { value: "CIENCIAS_AMBIENTAIS", label: "Ciências Ambientais" },
  { value: "CIENCIAS_BIOLOGICAS", label: "Ciências Biológicas" },
  { value: "CIENCIAS_CONTABEIS", label: "Ciências Contábeis" },
  { value: "CIENCIAS_ECONOMICAS", label: "Ciências Econômicas" },
  { value: "CIENCIAS_NATURAIS", label: "Ciências Naturais" },
  { value: "CIENCIAS_SOCIAIS", label: "Ciências Sociais" },
  { value: "CIENCIAS_SOCIAIS_ANTROPOLOGIA", label: "Ciências Sociais - Antropologia" },
  { value: "CIENCIAS_SOCIAIS_LATINO_AMERICANAS", label: "Ciências Sociais Latino-Americanas" },
  { value: "CIENCIAS_SOCIAIS_SOCIOLOGIA", label: "Ciências Sociais - Sociologia" },
  { value: "COMPUTACAO", label: "Computação" },
  { value: "COMUNICACAO_SOCIAL_AUDIOVISUAL", label: "Comunicação Social - Audiovisual" },
  { value: "COMUNICACAO_SOCIAL_COMUNICACAO_ORGANIZACIONAL", label: "Comunicação Social - Comunicação Organizacional" },
  { value: "COMUNICACAO_SOCIAL_PUBLICIDADE_E_PROPAGANDA", label: "Comunicação Social - Publicidade e Propaganda" },
  { value: "DESIGN_PROGRAMACAO_VISUAL", label: "Design - Programação Visual" },
  { value: "DESIGN_PROJETO_DO_PRODUTO", label: "Design - Projeto do Produto" },
  { value: "DIREITO", label: "Direito" },
  { value: "EDUCACAO_DO_CAMPO_CIENCIAS_DA_NATUREZA", label: "Educação do Campo - Ciências da Natureza" },
  { value: "EDUCACAO_DO_CAMPO_CIENCIAS_DA_NATUREZA_E_MATEMATICA", label: "Educação do Campo - Ciências da Natureza e Matemática" },
  { value: "EDUCACAO_DO_CAMPO_LINGUAGENS_ARTES_E_LITERATURA", label: "Educação do Campo - Linguagens, Artes e Literatura" },
  { value: "EDUCACAO_DO_CAMPO_MATEMATICA", label: "Educação do Campo - Matemática" },
  { value: "EDUCACAO_FISICA", label: "Educação Física" },
  { value: "EDUCACAO_FISICA_CICLO_BASICO", label: "Educação Física - Ciclo Básico" },
  { value: "ENFERMAGEM", label: "Enfermagem" },
  { value: "ENGENHARIA", label: "Engenharia" },
  { value: "ENGENHARIA_AEROESPACIAL", label: "Engenharia Aeroespacial" },
  { value: "ENGENHARIA_AMBIENTAL", label: "Engenharia Ambiental" },
  { value: "ENGENHARIA_AMBIENTAL_E_SANITARIA", label: "Engenharia Ambiental e Sanitária" },
  { value: "ENGENHARIA_AUTOMOTIVA", label: "Engenharia Automotiva" },
  { value: "ENGENHARIA_CIVIL", label: "Engenharia Civil" },
  { value: "ENGENHARIA_DE_COMPUTACAO", label: "Engenharia de Computação" },
  { value: "ENGENHARIA_DE_ENERGIA", label: "Engenharia de Energia" },
  { value: "ENGENHARIA_DE_PRODUCAO", label: "Engenharia de Produção" },
  { value: "ENGENHARIA_DE_REDES_DE_COMUNICACAO", label: "Engenharia de Redes de Comunicação" },
  { value: "ENGENHARIA_DE_SOFTWARE", label: "Engenharia de Software" },
  { value: "ENGENHARIA_ELETRICA", label: "Engenharia Elétrica" },
  { value: "ENGENHARIA_ELETRONICA", label: "Engenharia Eletrônica" },
  { value: "ENGENHARIA_FLORESTAL", label: "Engenharia Florestal" },
  { value: "ENGENHARIA_MECANICA", label: "Engenharia Mecânica" },
  { value: "ENGENHARIA_MECATRONICA_CONTROLE_E_AUTOMACAO", label: "Engenharia Mecatrônica - Controle e Automação" },
  { value: "ENGENHARIA_QUIMICA", label: "Engenharia Química" },
  { value: "ESTATISTICA", label: "Estatística" },
  { value: "FARMACIA", label: "Farmácia" },
  { value: "FILOSOFIA", label: "Filosofia" },
  { value: "FISICA", label: "Física" },
  { value: "FISICA_COMPUTACIONAL", label: "Física Computacional" },
  { value: "FISIOTERAPIA", label: "Fisioterapia" },
  { value: "FONOAUDIOLOGIA", label: "Fonoaudiologia" },
  { value: "GEOFISICA", label: "Geofísica" },
  { value: "GEOGRAFIA", label: "Geografia" },
  { value: "GEOLOGIA", label: "Geologia" },
  { value: "GESTAO_AMBIENTAL", label: "Gestão Ambiental" },
  { value: "GESTAO_DE_AGRONEGOCIOS", label: "Gestão de Agronegócios" },
  { value: "GESTAO_DE_POLITICAS_PUBLICAS", label: "Gestão de Políticas Públicas" },
  { value: "GESTAO_DO_AGRONEGOCIO", label: "Gestão do Agronegócio" },
  { value: "HISTORIA", label: "História" },
  { value: "INTELIGENCIA_ARTIFICIAL", label: "Inteligência Artificial" },
  { value: "JORNALISMO", label: "Jornalismo" },
  { value: "LETRAS_LINGUA_E_LITERATURA_JAPONESA", label: "Letras - Língua e Literatura Japonesa" },
  { value: "LETRAS_LINGUA_ESPANHOLA_E_LITERATURA_ESPANHOLA_E_HISPANO_AMERICANA", label: "Letras - Língua Espanhola e Literaturas" },
  { value: "LETRAS_LINGUA_FRANCESA_E_RESPECTIVA_LITERATURA", label: "Letras - Língua Francesa e Literatura" },
  { value: "LETRAS_LINGUA_INGLESA_E_RESPECTIVA_LITERATURA", label: "Letras - Língua Inglesa e Literatura" },
  { value: "LETRAS_LINGUA_PORTUGUESA_E_RESPECTIVA_LITERATURA", label: "Letras - Língua Portuguesa e Literatura" },
  { value: "LETRAS_PORTUGUES_DO_BRASIL_COMO_SEGUNDA_LINGUA", label: "Letras - Português do Brasil como Segunda Língua" },
  { value: "LETRAS_TRADUCAO_ESPANHOL", label: "Letras - Tradução Espanhol" },
  { value: "LETRAS_TRADUCAO_FRANCES", label: "Letras - Tradução Francês" },
  { value: "LETRAS_TRADUCAO_INGLES", label: "Letras - Tradução Inglês" },
  { value: "LINGUA_DE_SINAIS_BRASILEIRA_PORTUGUES_COMO_SEGUNDA_LINGUA", label: "Língua de Sinais Brasileira/Português" },
  { value: "LINGUAS_ESTRANGEIRAS_APLICADAS_MSI", label: "Línguas Estrangeiras Aplicadas (MSI)" },
  { value: "MATEMATICA", label: "Matemática" },
  { value: "MEDICINA", label: "Medicina" },
  { value: "MEDICINA_VETERINARIA", label: "Medicina Veterinária" },
  { value: "MUSEOLOGIA", label: "Museologia" },
  { value: "MUSICA", label: "Música" },
  { value: "MUSICA_CANTO", label: "Música - Canto" },
  { value: "MUSICA_CLARINETA", label: "Música - Clarineta" },
  { value: "MUSICA_COMPOSICAO", label: "Música - Composição" },
  { value: "MUSICA_CONTRABAIXO", label: "Música - Contrabaixo" },
  { value: "MUSICA_FAGOTE", label: "Música - Fagote" },
  { value: "MUSICA_FLAUTA", label: "Música - Flauta" },
  { value: "MUSICA_OBOE", label: "Música - Oboé" },
  { value: "MUSICA_PIANO", label: "Música - Piano" },
  { value: "MUSICA_REGENCIA", label: "Música - Regência" },
  { value: "MUSICA_SAXOFONE", label: "Música - Saxofone" },
  { value: "MUSICA_TROMBONE", label: "Música - Trombone" },
  { value: "MUSICA_TROMPA", label: "Música - Trompa" },
  { value: "MUSICA_TROMPETE", label: "Música - Trompete" },
  { value: "MUSICA_VIOLA", label: "Música - Viola" },
  { value: "MUSICA_VIOLAO", label: "Música - Violão" },
  { value: "MUSICA_VIOLINO", label: "Música - Violino" },
  { value: "MUSICA_VIOLONCELO", label: "Música - Violoncelo" },
  { value: "NUTRICAO", label: "Nutrição" },
  { value: "ODONTOLOGIA", label: "Odontologia" },
  { value: "PSICOLOGIA", label: "Psicologia" },
  { value: "QUIMICA", label: "Química" },
  { value: "QUIMICA_TECNOLOGICA", label: "Química Tecnológica" },
  { value: "RELACOES_INTERNACIONAIS", label: "Relações Internacionais" },
  { value: "SAUDE_COLETIVA", label: "Saúde Coletiva" },
  { value: "SERVICO_SOCIAL", label: "Serviço Social" },
  { value: "TEATRO", label: "Teatro" },
  { value: "TEORIA_CRITICA_E_HISTORIA_DA_ARTE", label: "Teoria, Crítica e História da Arte" },
  { value: "TURISMO", label: "Turismo" }
];

export default function PerfilPage() {
  /// Estado que controla se os campos estão liberados para edição
  const [isEditing, setIsEditing] = useState(false);

  // Estado para armazenar os dados do perfil 
  const [formData, setFormData] = useState({
    nome: "Gabriel",
    matricula: "241022222",
    campus: "GAMA",
    curso: "ENGENHARIA_DE_SOFTWARE",
  });

  // Função padrão para atualizar o estado quando o utilizador digita ou seleciona algo
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Função para alternar o modo de edição
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen flex bg-white">
      
      {/* sidebar virá aqui */}
      <div className="hidden md:flex w-64 bg-gray-100 border-r border-gray-200 items-center justify-center flex-shrink-0 text-gray-400 font-medium">
        [ Sidebar ]
      </div>

      <main className="flex-1 p-8 sm:p-12 flex justify-center">
        <div className="w-full max-w-4xl space-y-16">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white">
            
            {/* foto */}
            <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium text-lg border border-gray-300 flex-shrink-0">
              Foto
            </div>

            {/* dados perfil */}
            <div className="flex-1 w-full space-y-4 max-w-md">
              <input
                type="text"
                name="nome"
                value={formData.nome}
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

              <select
                name="campus"
                value={formData.campus}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-5 py-2.5 bg-transparent border border-[#006633] rounded-full text-[#1D1D1D] font-medium focus:outline-none disabled:bg-gray-50 disabled:text-gray-500 transition-colors appearance-none"
              >
                {CAMPUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>

              <select
                name="curso"
                value={formData.curso}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-5 py-2.5 bg-transparent border border-[#006633] rounded-full text-[#1D1D1D] font-medium focus:outline-none disabled:bg-gray-50 disabled:text-gray-500 transition-colors appearance-none"
              >
                {CURSO_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* botões editar e excluir */}
            <div className="flex flex-col gap-4 w-full md:w-auto">
              {isEditing ? (
                <button 
                  onClick={toggleEditMode} 
                  className="px-6 py-2.5 bg-[#003366] text-white font-medium rounded-full hover:bg-[#002244] transition-colors whitespace-nowrap"
                >
                  Salvar Alterações
                </button>
              ) : (
                <button 
                  onClick={toggleEditMode} 
                  className="px-6 py-2.5 bg-[#006633] text-white font-medium rounded-full hover:bg-[#004d26] transition-colors whitespace-nowrap"
                >
                  Editar Perfil
                </button>
              )}

              <button className="px-6 py-2.5 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-colors whitespace-nowrap">
                Excluir Perfil
              </button>
            </div>

          </div>

          {/* projetos seguidos */}
          <div>
            <h2 className="text-[#003366] font-bold text-lg mb-2 tracking-wide uppercase">
              Seguindo
            </h2>
            <hr className="border-[#006633] border-t-2 mb-6" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ProjetoCard nome="Projeto 01" />
              <ProjetoCard nome="Projeto 02" />
              <ProjetoCard nome="Projeto 03" />
              <ProjetoCard nome="Projeto 04" />
            </div>
          </div>

        </div>
      </main>

    </div>
  );
}