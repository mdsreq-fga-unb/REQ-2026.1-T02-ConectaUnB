# Deploy do backend no Render

Este guia descreve como publicar o backend NestJS do ConectaUnB na [Render](https://render.com) usando o **Blueprint** definido em `render.yaml` (na raiz do repositório).

> O Render foi escolhido em vez da Vercel porque o backend é um servidor NestJS longevo (com Throttler in-memory, uploads via Multer para o R2, Swagger e `helmet`). A Vercel é serverless/efêmera e exigiria reescrever a inicialização. O Render, por sua vez, executa o mesmo `Dockerfile.prod` já usado em produção e suporta o endpoint `/health` nativamente.

## Pré-requisitos

- Conta no Render (pode ser Free, mas recomendamos **Starter** para evitar spin-down do web service e ter Postgres persistente).
- Acesso de escrita no repositório GitHub do projeto.
- Os seguintes secrets já definidos (em variáveis de ambiente do Render, **não** commitados):
  - `JWT_SECRET`
  - `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME`, `R2_ENDPOINT`, `R2_PUBLIC_URL`

## Passo a passo

### 1. Criar o Blueprint no Render

1. No dashboard do Render, clique em **New** → **Blueprint**.
2. Selecione o repositório do ConectaUnB e o branch de deploy (ex.: `main`).
3. O Render vai detectar o arquivo `render.yaml` e listar:
   - **conectaunb-db** (PostgreSQL, plan `starter`)
   - **conectaunb-api** (Web Service Docker, plan `starter`)
4. Clique em **Apply**.

### 2. Preencher os secrets

Em **conectaunb-api → Environment**, preencha os campos marcados como `sync: false` no `render.yaml`:

| Variável | Descrição |
|---|---|
| `JWT_SECRET` | Chave forte para assinar JWTs (mín. 32 chars aleatórios) |
| `CORS_ORIGIN` | URL do frontend (ex.: `https://app.conectaunb.org`) |
| `FRONTEND_URL` | Mesma URL acima (usada como fallback de CORS) |
| `R2_ACCESS_KEY_ID` | Access key da API R2 |
| `R2_SECRET_ACCESS_KEY` | Secret da API R2 |
| `R2_BUCKET_NAME` | Nome do bucket (ex.: `conectaunb-media`) |
| `R2_ENDPOINT` | `https://<account>.r2.cloudflarestorage.com` |
| `R2_PUBLIC_URL` | URL pública do bucket (ex.: `https://media.conectaunb.org`) |

> `DATABASE_URL` é injetada automaticamente a partir do serviço `conectaunb-db` (definido em `fromDatabase` no `render.yaml`).

### 3. Primeiro deploy

- O Render vai:
  1. Provisionar o Postgres.
  2. Buildar a imagem Docker a partir de `infra/docker/Dockerfile.prod`.
  3. Rodar o `preDeployCommand`: `pnpm --filter back prisma:migrate:deploy` (aplica as migrations).
  4. Iniciar o container com `node apps/back/dist/main.js`.
  5. Fazer health checks em `/health` até o serviço ficar "Live".

Quando o status for **Live**, a API estará disponível em:

```
https://conectaunb-api.onrender.com
```

> Os deploys seguintes disparam automaticamente a cada push no branch configurado (`autoDeploy: true`).

## Health check

O endpoint `GET /health` (em `apps/back/src/health.controller.ts`) é usado pelo Render para checar a saúde do serviço. Se 3 checks consecutivos falharem, o serviço é marcado como unhealthy e reiniciado.

## Migrações do Prisma

As migrações são aplicadas **automaticamente** antes de cada deploy via `preDeployCommand`.

Para aplicar manualmente (ex.: migration fora de um PR de código):

```bash
# Na sua máquina, com DATABASE_URL de produção exportada
pnpm --filter back prisma:migrate:deploy
```

## Logs e variáveis

- **Logs**: dashboard do Render → `conectaunb-api` → **Logs** (stream em tempo real).
- **Shell**: é possível abrir um shell dentro do container em **Shell**.
- **Env vars**: edite em **Environment** sem precisar de novo commit (mas recomanda-se versionar alterações estruturais no `render.yaml`).

## Custos estimados (referência)

| Recurso | Plano | Preço (USD/mês) |
|---|---|---|
| Web Service (`conectaunb-api`) | Starter | $7 |
| PostgreSQL (`conectaunb-db`) | Starter | $7 |
| **Total** | | **~$14/mês** |

> Free tier: o web service "sleepa" após 15 min de inatividade (cold start de ~30s na próxima request). Não recomendado para demo com usuários reais.

## Comparação com a Vercel (decisão de arquitetura)

| Critério | Vercel | Render |
|---|---|---|
| Servidor NestJS longevo | Serverless/efêmero | Web Service nativo |
| Throttler/cache em memória | Estado perdido entre invocations | Persiste |
| Uploads via Multer (R2) | Timeout 10–60s | Sem limite rígido |
| `Dockerfile.prod` pronto | Não usa Docker | Deploy direto |
| `/health` | Não se aplica | Healthcheck nativo |

A escolha pelo Render parte da observação de que o `main.ts` (em `apps/back/src/main.ts`) já roda como servidor HTTP tradicional, usando `helmet()`, `ValidationPipe`, `SwaggerModule` e `app.listen()` — não como função serverless.

## Troubleshooting

- **Build falha com `pnpm: command not found`**: o `Dockerfile.prod` já ativa o Corepack. Confirme que o `dockerfilePath` no `render.yaml` aponta para `./infra/docker/Dockerfile.prod`.
- **Deploy falha em `prisma:migrate:deploy`**: verifique se o Postgres está "Available" antes da API iniciar e se `DATABASE_URL` está sendo injetada corretamente.
- **Health check falha**: confirme `GET /health` retorna 200 localmente com `curl http://localhost:3000/health` (deve funcionar via `docker compose up`).
- **CORS bloqueando frontend**: defina `CORS_ORIGIN` com a URL exata do frontend (incluindo protocolo e sem barra final).
