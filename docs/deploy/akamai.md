# Deploy na Akamai (Linode)

O backend e o frontend do ConectaUnB rodam juntos numa única VM da **Akamai Cloud Computing (Linode)**, em containers orquestrados por Docker Compose. O Caddy atua como reverse proxy e emite certificados HTTPS (Let's Encrypt) automaticamente.

## Arquitetura

```
Internet ─► Caddy (80/443, TLS auto)
                ├─ api.conectaunb.org  ─► api:3000    (NestJS)
                │                            └─► postgres:5432 (volume persistente)
                └─ app.conectaunb.org  ─► front:3001  (Next.js standalone)
```

A VM roda 4 containers via `infra/docker/docker-compose.prod.yml`:

| Serviço | Imagem | Função |
|---|---|---|
| `caddy` | `caddy:2-alpine` | Reverse proxy + HTTPS automático |
| `postgres` | `postgres:15-alpine` | Banco de dados (volume `pgdata`) |
| `api` | `ghcr.io/<owner>/conectaunb-back` | Backend NestJS (roda migrations no start) |
| `front` | `ghcr.io/<owner>/conectaunb-front` | Frontend Next.js (standalone) |

## Pré-requisitos

- Conta na Akamai Cloud Computing com uma VM (recomendado: **Shared CPU, 4GB RAM**, Ubuntu 22.04+).
- Docker Engine + Docker Compose v2 instalados na VM.
- DNS com dois registros tipo **A** apontando para o IP da VM:
  - `api.conectaunb.org`
  - `app.conectaunb.org`
- Secrets do GitHub Actions configurados (ver [CI/CD](#cicd)).

## Passo a passo (provisionamento inicial)

### 1. Criar a VM e instalar o Docker

Crie um Linode (Shared CPU 4GB, Ubuntu 22.04) e acesse via SSH. Instale o Docker:

```bash
ssh root@<IP_DA_VM>
curl -fsSL https://get.docker.com | sh
apt-get install -y git
```

### 2. Clonar o repositório na VM

```bash
mkdir -p /opt && cd /opt
git clone https://github.com/mdsreq-fga-unb/REQ-2026.1-T02-ConectaUnB.git conectaunb
cd conectaunb
```

### 3. Configurar variáveis de ambiente

```bash
cp .env.prod.example .env
nano .env   # preencha JWT_SECRET, POSTGRES_PASSWORD, R2_*, domínios, ACME_EMAIL
```

Variáveis que **devem** ser preenchidas:

| Variável | Descrição |
|---|---|
| `ACME_EMAIL` | E-mail para os certificados Let's Encrypt |
| `API_DOMAIN` / `APP_DOMAIN` | Domínios que apontam para a VM |
| `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB` | Credenciais do banco |
| `JWT_SECRET` | Chave forte (mín. 32 chars) para JWT |
| `R2_*` | Credenciais do Cloudflare R2 |
| `CORS_ORIGIN` / `FRONTEND_URL` | URL do frontend (`https://app.conectaunb.org`) |

### 4. Apontar o DNS

No gerenciador de DNS, crie dois registros **A** apontando para o IP da VM:

```
api  A  <IP_DA_VM>
app  A  <IP_DA_VM>
```

> O Caddy só consegue emitir o certificado depois que o DNS estiver propagado.

### 5. Subir a stack

```bash
docker compose -f infra/docker/docker-compose.prod.yml up -d
```

Na primeira vez:

1. `postgres` sobe e fica healthy.
2. `api` roda `prisma migrate deploy` (cria as tabelas) e inicia o NestJS.
3. `front` sobe o Next.js.
4. `caddy` emite os certificados e passa a servir `api.*` e `app.*` em HTTPS.

## Migrações do Prisma

As migrações são aplicadas **automaticamente** a cada (re)start do container `api`, via `infra/akamai/back-entrypoint`, **antes** de subir o NestJS. O `api` só sobe depois do Postgres saudável (`depends_on` com `condition: service_healthy`).

Para aplicar manualmente:

```bash
docker compose -f infra/docker/docker-compose.prod.yml exec api \
  pnpm --filter back prisma:migrate:deploy
```

## Health check

- O `api` expõe `GET /health`, usado como healthcheck no compose.
- Teste pelo domínio público:

```bash
curl -fsS https://api.conectaunb.org/health
```

## CI/CD

O workflow `.github/workflows/ci-cd.yml` automatiza o deploy a cada `push` em `main`:

1. Jobs `lint`, `test-back`, `test-front`, `build` validam o código.
2. `release-image` (somente em `main`): builda e publica `conectaunb-back` e `conectaunb-front` no GHCR (tags `:<sha>` e `:latest`).
3. `deploy-akamai` (somente em `main`): conecta via SSH na VM e executa `docker compose pull && up -d --remove-orphans` com `IMAGE_TAG=<sha-curta>`.

### Secrets necessários no GitHub

| Secret | Descrição |
|---|---|
| `AKAMAI_HOST` | IP da VM |
| `AKAMAI_USER` | Usuário SSH (ex.: `root` ou usuário criado) |
| `AKAMAI_SSH_KEY` | Chave privada SSH (mesma do `~/.ssh/authorized_keys` da VM) |
| `NEXT_PUBLIC_API_URL` | URL pública da API (build-time do Next.js, ex.: `https://api.conectaunb.org`) |
| `GHCR_PULL_TOKEN` *(opcional)* | PAT para a VM fazer `docker pull` (necessário se as imagens GHCR forem privadas) |

> Se as imagens no GHCR forem **públicas**, o `GHCR_PULL_TOKEN` pode ficar vazio (o `docker login` é ignorado).

## Logs e operação

```bash
# Logs em tempo real de todos os serviços
docker compose -f infra/docker/docker-compose.prod.yml logs -f

# Logs de um serviço específico
docker compose -f infra/docker/docker-compose.prod.yml logs -f api

# Abrir shell no container da API
docker compose -f infra/docker/docker-compose.prod.yml exec api sh

# Reiniciar / parar tudo
docker compose -f infra/docker/docker-compose.prod.yml restart
docker compose -f infra/docker/docker-compose.prod.yml down
```

## Backup do banco

O dado vive no volume `pgdata`. Para um dump:

```bash
docker compose -f infra/docker/docker-compose.prod.yml exec postgres \
  pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > backup-$(date +%F).sql
```

## Custos estimados (referência)

| Recurso | Plano | Preço (USD/mês) |
|---|---|---|
| Linode Shared CPU 4GB | 4 vCPU, 4GB, 80GB SSD | ~$24 |
| Domínio | — | ~$1 |
| **Total** | | **~$25/mês** |

## Troubleshooting

- **Caddy não emite certificado (TLS)**: confira se o DNS já propagou (`dig api.conectaunb.org`) e se as portas 80/443 estão abertas no firewall da VM (`ufw allow 80,443/tcp`). Veja os logs do Caddy: `docker compose logs caddy`.
- **`api` reinicia em loop**: provavelmente o Postgres ainda não está pronto ou as migrations falharam. Rode `docker compose logs api` e confira `DATABASE_URL`.
- **CORS bloqueando o frontend**: defina `CORS_ORIGIN` com a URL exata do frontend (com `https://` e sem barra final).
- **`docker pull` falha com `unauthorized`**: as imagens GHCR estão privadas. Crie um PAT com escopo `read:packages` e defina o secret `GHCR_PULL_TOKEN`.
- **Frontend aponta para URL errada**: `NEXT_PUBLIC_API_URL` é definido em **build time**. Após alterá-la, é preciso rebuildar e publicar a imagem `conectaunb-front` (o CI faz isso no próximo push em `main`).
