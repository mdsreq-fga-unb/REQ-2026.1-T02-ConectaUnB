"use client";

import { useState } from "react";
import Image from "next/image";
import axios from "axios";

// enums UnB (Campus, Departamentos, cursos)
export const CAMPUS_OPTIONS = [
  { value: "DARCY", label: "Darcy Ribeiro" },
  { value: "CEILANDIA", label: "Ceilândia" },
  { value: "GAMA", label: "Gama" },
  { value: "PLANALTINA", label: "Planaltina" },
];

export const DEPARTAMENTO_OPTIONS = [
  { value: "ADM", label: "ADM" }, { value: "CCA", label: "CCA" }, { value: "CEN", label: "CEN" },
  { value: "CET", label: "CET" }, { value: "CIC", label: "CIC" }, { value: "DAN", label: "DAN" },
  { value: "DIN", label: "DIN" }, { value: "DSC", label: "DSC" }, { value: "ECO", label: "ECO" },
  { value: "EFL", label: "EFL" }, { value: "ELA", label: "ELA" }, { value: "ENC", label: "ENC" },
  { value: "ENE", label: "ENE" }, { value: "ENF", label: "ENF" }, { value: "ENM", label: "ENM" },
  { value: "EPR", label: "EPR" }, { value: "EST", label: "EST" }, { value: "FAC_COM", label: "FAC_COM" },
  { value: "FAC_DAP", label: "FAC_DAP" }, { value: "FAC_JOR", label: "FAC_JOR" }, { value: "FAU", label: "FAU" },
  { value: "FAV", label: "FAV" }, { value: "FCI", label: "FCI" }, { value: "FCS", label: "FCS" },
  { value: "FCTE", label: "FCTE" }, { value: "FCTS", label: "FCTS" }, { value: "FDD", label: "FDD" },
  { value: "FED", label: "FED" }, { value: "FEF", label: "FEF" }, { value: "FIL", label: "FIL" },
  { value: "FMD", label: "FMD" }, { value: "FTD", label: "FTD" }, { value: "FUP", label: "FUP" },
  { value: "GEA", label: "GEA" }, { value: "GPP", label: "GPP" }, { value: "HIS", label: "HIS" },
  { value: "ICB", label: "ICB" }, { value: "ICE", label: "ICE" }, { value: "ICH", label: "ICH" },
  { value: "IDA1", label: "IDA1" }, { value: "IFD", label: "IFD" }, { value: "IGD", label: "IGD" },
  { value: "ILD", label: "ILD" }, { value: "IPD", label: "IPD" }, { value: "IPOL", label: "IPOL" },
  { value: "IQD", label: "IQD" }, { value: "IREL", label: "IREL" }, { value: "LET", label: "LET" },
  { value: "LIP", label: "LIP" }, { value: "MAT", label: "MAT" }, { value: "MUS", label: "MUS" },
  { value: "NUT", label: "NUT" }, { value: "ODT", label: "ODT" }, { value: "SER", label: "SER" },
  { value: "SOL", label: "SOL" }, { value: "VIS", label: "VIS" }
];

export const CURSO_OPTIONS = [
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

export default function CadastroPage() {
  // Dados p/ cadastro
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // função de envio para o back
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // impede a página de recarregar (padrão do HTML)

    // garante que as senhas são iguais antes de tentar enviar
    if (formData.senha !== formData.confirmacaoSenha) {
      alert("As senhas não coincidem. Verifique antes de enviar.");
      return;
    }

    // separa o que o backend quer do que ele NÃO quer
    // pega tudo de formData, mas deixa a confirmacaoSenha de fora do pacote final
    const { confirmacaoSenha, ...dadosLimpos } = formData;

    // formatação de tipos
    // se for discente, convertemos a string da matrícula para número. se for docente, apagamos o campo.
    let payloadFinal: any = { ...dadosLimpos };
    if (payloadFinal.cargo === "DISCENTE") {
      payloadFinal.matricula = Number(payloadFinal.matricula);
    } else {
      delete payloadFinal.matricula; // docentes AINDA não enviam matrícula
    }

    // requisição com Axios
    try {

      const response = await axios.post("http://localhost:3000/auth/register", payloadFinal);
      
      console.log("Sucesso!", response.data);
      alert("Cadastro realizado com sucesso!");
      
      // opcional p/ redirecionar para o Login aqui após o sucesso
      // window.location.href = "/login";
      
    } catch (error: any) {
      console.error("Erro ao realizar cadastro:", error);
      // pega erro
      alert(error.response?.data?.message || "Ocorreu um erro ao tentar cadastrar.");
    }
  };

  // testes de senha
  const temMinimoCaracteres = formData.senha.length >= 8;
  const temMaiuscula = /[A-Z]/.test(formData.senha);
  const temMinuscula = /[a-z]/.test(formData.senha);
  const temNumero = /[0-9]/.test(formData.senha);
  const temEspecial = /[^A-Za-z0-9]/.test(formData.senha);

  // A senha só será considerada forte se passar em todos os 5 testes e compara as senhas
  const senhaEStavel = temMinimoCaracteres && temMaiuscula && temMinuscula && temNumero && temEspecial;
  const senhasCoincidem = formData.senha === formData.confirmacaoSenha;

  return (
    // divide a tela em duas colunas apenas em monitores/tablets.
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 text-[#1D1D1D]">

      {/* coluna da esquerda - escondemos em celulares e mostramos em telas maiores */}
      <section className="hidden md:flex flex-col items-center justify-center bg-[#003366] relative overflow-hidden">
    
        <div className="absolute inset-0 opacity-30 bg-[url('/fundoGeometrico.svg')] bg-[length:100%] bg-[position:0%_35%] bg-no-repeat" />

        <div className="relative z-10 bg-white p-8 rounded-xl shadow-2xl">
          <Image
            src="/logoConecta.svg" 
            alt="Logo Conecta UnB"
            width={250}
            height={250}
            priority 
            className="w-auto h-auto"
          />
        </div>

      </section>

      {/* "formulário" */}
      <section className="flex flex-col items-center justify-center bg-white p-8 sm:p-12">
        <div className="w-full max-w-md space-y-8">

          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#003366]">Cadastre-se</h1>
          </div>

         <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-sm">
            
            {/* nome */}
            <div className="flex flex-col">
              <label className="mb-1 ml-4 text-[#003366] font-medium">Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-transparent border border-[#006633] rounded-full focus:outline-none focus:ring-2 focus:ring-[#006633]"
              />
            </div>

            {/* email */}
            <div className="flex flex-col">
              <label className="mb-1 ml-4 text-[#003366] font-medium">Email UnB</label>
              <input
                type="email"
                name="email"
                placeholder="@aluno.unb.br ou @unb.br"
                pattern="^[a-zA-Z0-9._%+\-]+@(aluno\.unb\.br|unb\.br)$"
                title="Use seu e-mail @aluno.unb.br ou @unb.br"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-transparent border border-[#006633] rounded-full focus:outline-none focus:ring-2 focus:ring-[#006633] placeholder:text-gray-400 placeholder:text-xs"
              />
            </div>

            {/* matricula, para alunos */}
            {formData.cargo === "DISCENTE" && (
              <div className="flex flex-col">
                <label className="mb-1 ml-4 text-[#003366] font-medium">Matrícula</label>
                <input
                  type="text"
                  name="matricula"
                  required
                  value={formData.matricula}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-transparent border border-[#006633] rounded-full focus:outline-none focus:ring-2 focus:ring-[#006633]"
                />
              </div>
            )}

            {/* cargo*/}
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

            {/* campus */}
            <div className="flex flex-col">
              <label className="mb-1 ml-4 text-[#003366] font-medium">Campus</label>
              <select
                name="campus"
                required
                value={formData.campus}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-transparent border border-[#006633] rounded-full focus:outline-none focus:ring-2 focus:ring-[#006633]"
              >
                <option value="">Selecione o campus...</option>
                {CAMPUS_OPTIONS.map((campus) => (
                  <option key={campus.value} value={campus.value}>{campus.label}</option>
                ))}
              </select>
            </div>

            {/* departamento */}
            <div className="flex flex-col">
              <label className="mb-1 ml-4 text-[#003366] font-medium">Departamento</label>
              <select
                name="departamento"
                required
                value={formData.departamento}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-transparent border border-[#006633] rounded-full focus:outline-none focus:ring-2 focus:ring-[#006633]"
              >
                <option value="">Selecione o departamento...</option>
                {DEPARTAMENTO_OPTIONS.map((depto) => (
                  <option key={depto.value} value={depto.value}>{depto.label}</option>
                ))}
              </select>
            </div>

            {/* curso*/}
            <div className="flex flex-col">
              <label className="mb-1 ml-4 text-[#003366] font-medium">Curso</label>
              <select
                name="curso"
                required
                value={formData.curso}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-transparent border border-[#006633] rounded-full focus:outline-none focus:ring-2 focus:ring-[#006633]"
              >
                <option value="">Selecione o curso...</option>
                {CURSO_OPTIONS.map((curso) => (
                  <option key={curso.value} value={curso.value}>{curso.label}</option>
                ))}
              </select>
            </div>

            {/* senha */}
            <div className="flex flex-col">
              <label className="mb-1 ml-4 text-[#003366] font-medium">Senha</label>
              <input
                type="password"
                name="senha"
                required
                value={formData.senha}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-transparent border border-[#006633] rounded-full focus:outline-none focus:ring-2 focus:ring-[#006633]"
              />
              
              {/* mostra uma lista de "ajuda" */}
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
            </div>

            {/* confirmação de senha */}
            <div className="flex flex-col">
              <label className="mb-1 ml-4 text-[#003366] font-medium">Confirmação de Senha</label>
              <input
                type="password"
                name="confirmacaoSenha"
                required
                value={formData.confirmacaoSenha}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-transparent border border-[#006633] rounded-full focus:outline-none focus:ring-2 focus:ring-[#006633]"
              />
              
              {/* exibe apenas quando digita */}
              {formData.confirmacaoSenha.length > 0 && (
                <p className={`mt-1 ml-4 text-xs font-medium ${senhasCoincidem ? "text-green-600" : "text-red-500"}`}>
                  {senhasCoincidem ? "✓ As senhas coincidem" : "○ As senhas não coincidem"}
                </p>
              )}
            </div>

            {/* botão de cadastro e login */}
            <div className="pt-4 flex flex-col items-center">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#006633] text-white font-semibold rounded-full hover:bg-[#004d26] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006633]"
              >
                Cadastro
              </button>
              
              <a href="/login" className="text-sm text-[#003366] hover:underline mt-4">
                Login
              </a>
            </div>

          </form>

        </div>
      </section>

    </main>
  );
}