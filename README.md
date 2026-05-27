# REQ-2026.1-T02-ConectaUnB
Repositório de projeto da disciplina de REQ-T1, 2026.1

## Subir local

O projeto já vem com a configuração básica para subir o ambiente local com um único comando.

### Pré-requisitos

- Node.js 24+ ou compatível com o monorepo
- pnpm 11+
- Docker Desktop no Windows ou Docker Engine no Ubuntu com Docker Compose
- Arquivo `.env` na raiz do projeto, baseado em `.env.example`
- Docker precisa estar em execução antes de rodar `pnpm dev`

Se o comando `pnpm` não estiver disponível no seu terminal, habilite o Corepack primeiro:

```bash
corepack enable
corepack prepare pnpm@11.3.0 --activate
```

No Windows, se aparecer `EPERM: operation not permitted` ao rodar `corepack enable`, abra o PowerShell como administrador e execute os mesmos comandos novamente. Se preferir evitar modo administrador, use uma instalação global do pnpm:

```bash
npm install -g pnpm@11.3.0
```

### Windows

1. Instale as dependências no PowerShell ou no terminal de sua preferência:

```bash
pnpm install
```

2. Verifique se o arquivo `.env` foi criado na raiz com base em `.env.example`.

3. Abra o Docker Desktop e aguarde ele ficar em execução.

4. Suba tudo com um único comando:

```bash
pnpm dev
```

Esse comando faz duas coisas:

- sobe o PostgreSQL via Docker Compose
- executa o `turbo run dev` para iniciar backend e frontend ao mesmo tempo

### Ubuntu

1. Instale as dependências:

```bash
pnpm install
```

2. Confirme que o Docker Engine e o Docker Compose estão disponíveis:

```bash
docker compose version
```

Se o seu ambiente usar o Compose legado, este comando também é aceito pelo script:

```bash
docker-compose version
```

3. Inicie o projeto:

```bash
pnpm dev
```

### Portas locais

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`
- PostgreSQL: `localhost:5432`

### Guia passo-a-passo (Windows e Ubuntu)

Este guia mostra como preparar o ambiente e subir o projeto localmente. Use os links oficiais para instalar ferramentas quando necessário.

Pré-requisitos e links de instalação:

- Node.js (recomendado 24+): https://nodejs.org/en/download/
- pnpm (gerenciamento de pacotes): https://pnpm.io/installation
- Corepack (embutido em Node.js recente): https://nodejs.org/api/corepack.html
- Docker Desktop (Windows / macOS): https://www.docker.com/products/docker-desktop/
- Docker Engine + Compose (Ubuntu): https://docs.docker.com/engine/install/ubuntu/ e https://docs.docker.com/compose/install/

Ubuntu — instalação rápida por comandos

Cole e execute os comandos abaixo no terminal do Ubuntu (cada bloco é independente):

1) Instalar Node.js 24 (NodeSource):

```bash
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2) Habilitar Corepack e ativar `pnpm` (recomendado):

```bash
corepack enable
corepack prepare pnpm@11.3.0 --activate
```

Se preferir instalar `pnpm` globalmente:

```bash
sudo npm install -g pnpm@11.3.0
```

3) Instalar Docker Engine + Compose (oficial - requer `sudo`):

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

4) Adicionar seu usuário ao grupo `docker` para evitar `sudo` nos comandos Docker (faça logout/login depois):

```bash
sudo usermod -aG docker $USER
```

Depois desses passos, confirme com:

```bash
node -v
pnpm -v
docker compose version
```

Observação: este repositório usa `pnpm` e `turbo`. O comando principal para subir tudo é `pnpm dev` (na raiz).

1) Preparar `pnpm` (se necessário)

Se o comando `pnpm` não existir, você pode habilitar via Corepack (recomendado) ou instalar globalmente.

PowerShell / Bash (Corepack):

```bash
corepack enable
corepack prepare pnpm@11.3.0 --activate
```

Se ocorrer erro de permissão no Windows (ex.: `EPERM`), abra o PowerShell como Administrador e execute os mesmos comandos. Alternativamente instale globalmente:

```bash
npm install -g pnpm@11.3.0
```

2) Instalar dependências do monorepo

Execute na raiz do repositório:

```bash
pnpm install
```

3) Preparar variáveis de ambiente

Copie o exemplo e edite se necessário:

```bash
cp .env.example .env   # Linux / macOS
copy .env.example .env # PowerShell
```

4) Garantir Docker em execução

- Windows: abra o Docker Desktop e aguarde o indicador "Docker is running".
- Ubuntu: confirme com:

```bash
docker compose version
# ou
docker-compose version
```

Se o Docker/Compose não estiver disponível, instale as ferramentas nos links acima.

5) Subir tudo (um comando)

Na raiz do repositório:

```bash
pnpm dev
```

O que o `pnpm dev` faz:

- sobe o container do PostgreSQL via Docker Compose
- inicia os apps do monorepo (backend Nest + frontend Next) via `turbo run dev`

6) Comandos alternativos úteis

- Subir apenas os apps (sem banco):

```bash
pnpm dev:apps
```

- Subir apenas o banco manualmente:

```bash
docker compose up -d postgres
```

7) Portas locais padrão

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- PostgreSQL: localhost:5432

Se precisar de ajuda com algum passo (erro de instalação, permissão no Windows, ou mensagem do script), cole a saída aqui que eu te oriento.  
