# REQ-2026.1-T02-ConectaUnB
Repositório do projeto **Conecta UnB**, equipe **Capoeira** da disciplina de REQ-T2, 2026.1.

O Conecta UnB tem o objetivo de centralizar a comunicação e as oportunidades dentro do ecossistema acadêmico da Universidade de Brasília (UnB).

Informações disponíveis em: https://mdsreq-fga-unb.github.io/REQ-2026.1-T02-ConectaUnB/.

## Visão geral — Subir o ambiente local

O repositório fornece um comando único para preparar e subir o ambiente de desenvolvimento. O fluxo padrão combina um banco de dados PostgreSQL em Docker com a API (containerizada) e o frontend rodando localmente em modo dev.

### Pré-requisitos

- Node.js 24+ (recomendado)
- pnpm 11+
- Docker Desktop (Windows/macOS) ou Docker Engine + Compose (Linux)
- Copie `.env.example` para `.env` na raiz

Se o `pnpm` não estiver disponível, habilite o Corepack:

```bash
corepack enable
corepack prepare pnpm@11.3.0 --activate
```

### Fluxo padrão (recomendado)

1. Instale dependências:

```bash
pnpm install
```

2. Garanta que o Docker esteja em execução e suba o ambiente:

```bash
pnpm dev
```

O que `pnpm dev` faz (fluxo atual):
- Sobe os containers do PostgreSQL e da API Nest via `docker compose` (serviços `postgres` e `api`).
- Inicia o frontend em modo desenvolvimento local na porta `3001`.

Exemplo de portas locais após subir:

- Frontend: http://localhost:3001
- Backend (API): http://localhost:3000
- PostgreSQL: localhost:5432

Rotas úteis da API:

- Health check: http://localhost:3000/health
- Swagger UI (development): http://localhost:3000/api/docs

### Desenvolvimento do backend fora do container (opcional)

Se você quiser rodar o backend localmente (fora do serviço `api` do Docker):

1. Suba apenas o banco:

```bash
docker compose up -d postgres
```

2. Gere o client do Prisma:

```bash
pnpm --filter back prisma:generate
```

3. Rode o backend:

```bash
pnpm --filter back dev
```

### Fluxos alternativos

- Subir apenas os apps (backend e frontend via turborepo, sem o banco em Docker):

```bash
pnpm dev:apps
```

- Subir apenas o banco manualmente:

```bash
docker compose up -d postgres
```

Observação importante: a frase antiga que dizia que `pnpm dev` executava `turbo run dev` para iniciar backend e frontend juntos foi removida porque o fluxo padrão agora levanta a API via Docker Compose e o frontend localmente; o comando `pnpm dev:apps` ainda existe como alternativa para rodar os apps via Turbo.

### Passos rápidos de verificação (Windows / Ubuntu)

Verifique as versões:

```bash
node -v
pnpm -v
docker compose version
```

Se precisar criar o `.env` a partir do exemplo:

```bash
cp .env.example .env   # Linux / macOS
copy .env.example .env # PowerShell
```

### Erros comuns

- No Windows, se `corepack enable` falhar com `EPERM`, execute o PowerShell como Administrador ou instale `pnpm` globalmente: `npm install -g pnpm@11.3.0`.
- Se o Docker não estiver rodando, abra o Docker Desktop e aguarde a inicialização antes de executar `pnpm dev`.

### Swagger e ambientes

- Em `development`, o Swagger fica habilitado por padrão em `/api/docs`.
- Em outros ambientes, o Swagger fica desabilitado por padrão.
- Para habilitar fora de development, defina `SWAGGER_ENABLED=true`.
- O backend ainda não implementa autenticação básica para o Swagger; os endpoints ficam expostos quando `SWAGGER_ENABLED=true`.

Exemplo para staging/producao:

```bash
NODE_ENV=production
SWAGGER_ENABLED=true
```
