 # REQ-2026.1-T02-ConectaUnB
Repositório do projeto da disciplina REQ-T1 (2026.1).

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

Se quiser, eu reorganizo o README por seções (Instalação, Subir local, Dev avançado, Deploy) e adiciono exemplos rápidos de troubleshooting. Atualmente o arquivo documenta o fluxo principal e as alternativas, mas posso deixá-lo ainda mais enxuto se preferir.
