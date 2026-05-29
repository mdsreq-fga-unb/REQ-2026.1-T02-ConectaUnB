-- Criar colunas de cadastro
ALTER TABLE "User"
ADD COLUMN "cargo" TEXT NOT NULL,
ADD COLUMN "matricula" TEXT NOT NULL,
ADD COLUMN "curso" TEXT NOT NULL;

-- Criar índice único para matrícula
CREATE UNIQUE INDEX "User_matricula_key" ON "User"("matricula");