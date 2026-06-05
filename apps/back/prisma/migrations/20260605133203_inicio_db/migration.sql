/*
  Warnings:

  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Cargo" AS ENUM ('DOCENTE', 'DISCENTE');

-- CreateEnum
CREATE TYPE "Campus" AS ENUM ('CEILANDIA', 'GAMA', 'DARCY', 'PLANALTINA');

-- CreateEnum
CREATE TYPE "ClassificacaoEntidade" AS ENUM ('EMPRESA_JUNIOR', 'EQUIPE_COMPETICAO', 'PROJETO_EXTENSAO', 'ATLETICA');

-- CreateEnum
CREATE TYPE "StatusProjeto" AS ENUM ('PLANEJAMENTO', 'EM_ANDAMENTO', 'CONCLUIDO', 'CANCELADO', 'PAUSADO');

-- CreateEnum
CREATE TYPE "ClassificacaoMembro" AS ENUM ('GESTOR', 'CO_GESTOR', 'MEMBRO');

-- CreateEnum
CREATE TYPE "ClassificacaoInscricao" AS ENUM ('ABERTA', 'FECHADA');

-- CreateEnum
CREATE TYPE "TipoNotificacao" AS ENUM ('PROCESSO_SELETIVO', 'ATUALIZACAO_PROJETO', 'NOVA_PUBLICACAO');

-- CreateEnum
CREATE TYPE "Departamento" AS ENUM ('ADM', 'CCA', 'CEN', 'CET', 'CIC', 'DAN', 'DIN', 'DSC', 'ECO', 'EFL', 'ELA', 'ENC', 'ENE', 'ENF', 'ENM', 'EPR', 'EST', 'FAC_COM', 'FAC_DAP', 'FAC_JOR', 'FAU', 'FAV', 'FCI', 'FCS', 'FCTE', 'FCTS', 'FDD', 'FED', 'FEF', 'FIL', 'FMD', 'FTD', 'FUP', 'GEA', 'GPP', 'HIS', 'ICB', 'ICE', 'ICH', 'IDA1', 'IFD', 'IGD', 'ILD', 'IPD', 'IPOL', 'IQD', 'IREL', 'LET', 'LIP', 'MAT', 'MUS', 'NUT', 'ODT', 'SER', 'SOL', 'VIS');

-- CreateEnum
CREATE TYPE "Curso" AS ENUM ('ADMINISTRACAO', 'AGRONOMIA', 'ARQUITETURA_E_URBANISMO', 'ARQUIVOLOGIA', 'ARTES_CENICAS', 'ARTES_CENICAS_INTERPRETACAO_TEATRAL', 'ARTES_VISUAIS', 'BIBLIOTECONOMIA', 'BIOTECNOLOGIA', 'CIENCIA_DA_COMPUTACAO', 'CIENCIA_POLITICA', 'CIENCIAS_AMBIENTAIS', 'CIENCIAS_BIOLOGICAS', 'CIENCIAS_CONTABEIS', 'CIENCIAS_ECONOMICAS', 'CIENCIAS_NATURAIS', 'CIENCIAS_SOCIAIS', 'CIENCIAS_SOCIAIS_ANTROPOLOGIA', 'CIENCIAS_SOCIAIS_LATINO_AMERICANAS', 'CIENCIAS_SOCIAIS_SOCIOLOGIA', 'COMPUTACAO', 'COMUNICACAO_SOCIAL_AUDIOVISUAL', 'COMUNICACAO_SOCIAL_COMUNICACAO_ORGANIZACIONAL', 'COMUNICACAO_SOCIAL_PUBLICIDADE_E_PROPAGANDA', 'DESIGN_PROGRAMACAO_VISUAL', 'DESIGN_PROJETO_DO_PRODUTO', 'DIREITO', 'EDUCACAO_DO_CAMPO_CIENCIAS_DA_NATUREZA', 'EDUCACAO_DO_CAMPO_CIENCIAS_DA_NATUREZA_E_MATEMATICA', 'EDUCACAO_DO_CAMPO_LINGUAGENS_ARTES_E_LITERATURA', 'EDUCACAO_DO_CAMPO_MATEMATICA', 'EDUCACAO_FISICA', 'EDUCACAO_FISICA_CICLO_BASICO', 'ENFERMAGEM', 'ENGENHARIA', 'ENGENHARIA_AEROESPACIAL', 'ENGENHARIA_AMBIENTAL', 'ENGENHARIA_AMBIENTAL_E_SANITARIA', 'ENGENHARIA_AUTOMOTIVA', 'ENGENHARIA_CIVIL', 'ENGENHARIA_DE_COMPUTACAO', 'ENGENHARIA_DE_ENERGIA', 'ENGENHARIA_DE_PRODUCAO', 'ENGENHARIA_DE_REDES_DE_COMUNICACAO', 'ENGENHARIA_DE_SOFTWARE', 'ENGENHARIA_ELETRICA', 'ENGENHARIA_ELETRONICA', 'ENGENHARIA_FLORESTAL', 'ENGENHARIA_MECANICA', 'ENGENHARIA_MECATRONICA_CONTROLE_E_AUTOMACAO', 'ENGENHARIA_QUIMICA', 'ESTATISTICA', 'FARMACIA', 'FILOSOFIA', 'FISICA', 'FISICA_COMPUTACIONAL', 'FISIOTERAPIA', 'FONOAUDIOLOGIA', 'GEOFISICA', 'GEOGRAFIA', 'GEOLOGIA', 'GESTAO_AMBIENTAL', 'GESTAO_DE_AGRONEGOCIOS', 'GESTAO_DE_POLITICAS_PUBLICAS', 'GESTAO_DO_AGRONEGOCIO', 'HISTORIA', 'INTELIGENCIA_ARTIFICIAL', 'JORNALISMO', 'LETRAS_LINGUA_E_LITERATURA_JAPONESA', 'LETRAS_ESPANHOL_E_LIT_HISPANO', 'LETRAS_LINGUA_FRANCESA_E_RESPECTIVA_LITERATURA', 'LETRAS_LINGUA_INGLESA_E_RESPECTIVA_LITERATURA', 'LETRAS_LINGUA_PORTUGUESA_E_RESPECTIVA_LITERATURA', 'LETRAS_PORTUGUES_DO_BRASIL_COMO_SEGUNDA_LINGUA', 'LETRAS_TRADUCAO_ESPANHOL', 'LETRAS_TRADUCAO_FRANCES', 'LETRAS_TRADUCAO_INGLES', 'LINGUA_DE_SINAIS_BRASILEIRA_PORTUGUES_COMO_SEGUNDA_LINGUA', 'LINGUAS_ESTRANGEIRAS_APLICADAS_MSI', 'MATEMATICA', 'MEDICINA', 'MEDICINA_VETERINARIA', 'MUSEOLOGIA', 'MUSICA', 'MUSICA_CANTO', 'MUSICA_CLARINETA', 'MUSICA_COMPOSICAO', 'MUSICA_CONTRABAIXO', 'MUSICA_FAGOTE', 'MUSICA_FLAUTA', 'MUSICA_OBOE', 'MUSICA_PIANO', 'MUSICA_REGENCIA', 'MUSICA_SAXOFONE', 'MUSICA_TROMBONE', 'MUSICA_TROMPA', 'MUSICA_TROMPETE', 'MUSICA_VIOLA', 'MUSICA_VIOLAO', 'MUSICA_VIOLINO', 'MUSICA_VIOLONCELO', 'NUTRICAO', 'ODONTOLOGIA', 'PSICOLOGIA', 'QUIMICA', 'QUIMICA_TECNOLOGICA', 'RELACOES_INTERNACIONAIS', 'SAUDE_COLETIVA', 'SERVICO_SOCIAL', 'TEATRO', 'TEORIA_CRITICA_E_HISTORIA_DA_ARTE', 'TURISMO');

-- DropTable
DROP TABLE "File";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Perfil" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "matricula" INTEGER,
    "senha" TEXT NOT NULL,
    "linkFoto" TEXT,
    "curso" "Curso" NOT NULL,
    "departamento" "Departamento" NOT NULL,
    "campus" "Campus" NOT NULL,
    "cargo" "Cargo" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ultimaLeituraNotificacoes" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Perfil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entidade" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "classificacao" "ClassificacaoEntidade" NOT NULL,
    "campus" "Campus" NOT NULL,
    "departamento" "Departamento" NOT NULL,
    "linkBanner" TEXT,
    "linkLogo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Entidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Membro" (
    "id" SERIAL NOT NULL,
    "idPerfil" INTEGER NOT NULL,
    "idEntidade" INTEGER NOT NULL,
    "classificacao" "ClassificacaoMembro" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Membro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seguindo" (
    "idPerfil" INTEGER NOT NULL,
    "idEntidade" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Seguindo_pkey" PRIMARY KEY ("idPerfil","idEntidade")
);

-- CreateTable
CREATE TABLE "Postagem" (
    "id" SERIAL NOT NULL,
    "idEntidade" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "linkFoto" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Postagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curtidas" (
    "idPostagem" INTEGER NOT NULL,
    "idPerfil" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Curtidas_pkey" PRIMARY KEY ("idPostagem","idPerfil")
);

-- CreateTable
CREATE TABLE "Projeto" (
    "id" SERIAL NOT NULL,
    "idEntidade" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "linkFoto" TEXT,
    "status" "StatusProjeto" NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Projeto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gerentesProjetos" (
    "idProjeto" INTEGER NOT NULL,
    "idMembro" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gerentesProjetos_pkey" PRIMARY KEY ("idProjeto","idMembro")
);

-- CreateTable
CREATE TABLE "colaboradoresProjetos" (
    "idProjeto" INTEGER NOT NULL,
    "idMembro" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "colaboradoresProjetos_pkey" PRIMARY KEY ("idProjeto","idMembro")
);

-- CreateTable
CREATE TABLE "ProcessoSeletivo" (
    "id" SERIAL NOT NULL,
    "idEntidade" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "classificacao" "ClassificacaoInscricao" NOT NULL,
    "linkFoto" TEXT,
    "linkIncricao" TEXT,
    "inicioInscricao" TIMESTAMP(3) NOT NULL,
    "fimInscricao" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProcessoSeletivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inscricao" (
    "idProcessoSeletivo" INTEGER NOT NULL,
    "idPerfil" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inscricao_pkey" PRIMARY KEY ("idProcessoSeletivo","idPerfil")
);

-- CreateTable
CREATE TABLE "Notificacao" (
    "id" SERIAL NOT NULL,
    "idEntidade" INTEGER NOT NULL,
    "tipo" "TipoNotificacao" NOT NULL,
    "mensagem" TEXT NOT NULL,
    "referenciaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notificacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreferenciaNotificacao" (
    "idPerfil" INTEGER NOT NULL,
    "processoSeletivo" BOOLEAN NOT NULL DEFAULT true,
    "atualizacaoProjeto" BOOLEAN NOT NULL DEFAULT true,
    "atualizacaoPublicacao" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "PreferenciaNotificacao_pkey" PRIMARY KEY ("idPerfil")
);

-- CreateIndex
CREATE UNIQUE INDEX "Perfil_email_key" ON "Perfil"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Perfil_matricula_key" ON "Perfil"("matricula");

-- AddForeignKey
ALTER TABLE "Membro" ADD CONSTRAINT "Membro_idPerfil_fkey" FOREIGN KEY ("idPerfil") REFERENCES "Perfil"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membro" ADD CONSTRAINT "Membro_idEntidade_fkey" FOREIGN KEY ("idEntidade") REFERENCES "Entidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seguindo" ADD CONSTRAINT "Seguindo_idPerfil_fkey" FOREIGN KEY ("idPerfil") REFERENCES "Perfil"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seguindo" ADD CONSTRAINT "Seguindo_idEntidade_fkey" FOREIGN KEY ("idEntidade") REFERENCES "Entidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Postagem" ADD CONSTRAINT "Postagem_idEntidade_fkey" FOREIGN KEY ("idEntidade") REFERENCES "Entidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curtidas" ADD CONSTRAINT "Curtidas_idPerfil_fkey" FOREIGN KEY ("idPerfil") REFERENCES "Perfil"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curtidas" ADD CONSTRAINT "Curtidas_idPostagem_fkey" FOREIGN KEY ("idPostagem") REFERENCES "Postagem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projeto" ADD CONSTRAINT "Projeto_idEntidade_fkey" FOREIGN KEY ("idEntidade") REFERENCES "Entidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gerentesProjetos" ADD CONSTRAINT "gerentesProjetos_idProjeto_fkey" FOREIGN KEY ("idProjeto") REFERENCES "Projeto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gerentesProjetos" ADD CONSTRAINT "gerentesProjetos_idMembro_fkey" FOREIGN KEY ("idMembro") REFERENCES "Membro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colaboradoresProjetos" ADD CONSTRAINT "colaboradoresProjetos_idProjeto_fkey" FOREIGN KEY ("idProjeto") REFERENCES "Projeto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colaboradoresProjetos" ADD CONSTRAINT "colaboradoresProjetos_idMembro_fkey" FOREIGN KEY ("idMembro") REFERENCES "Membro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcessoSeletivo" ADD CONSTRAINT "ProcessoSeletivo_idEntidade_fkey" FOREIGN KEY ("idEntidade") REFERENCES "Entidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscricao" ADD CONSTRAINT "Inscricao_idPerfil_fkey" FOREIGN KEY ("idPerfil") REFERENCES "Perfil"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscricao" ADD CONSTRAINT "Inscricao_idProcessoSeletivo_fkey" FOREIGN KEY ("idProcessoSeletivo") REFERENCES "ProcessoSeletivo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_idEntidade_fkey" FOREIGN KEY ("idEntidade") REFERENCES "Entidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreferenciaNotificacao" ADD CONSTRAINT "PreferenciaNotificacao_idPerfil_fkey" FOREIGN KEY ("idPerfil") REFERENCES "Perfil"("id") ON DELETE CASCADE ON UPDATE CASCADE;
