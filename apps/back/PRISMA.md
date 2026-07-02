Prisma quickstart

1. Instale dependências na raiz do monorepo:

```bash
pnpm install
```

2. Gere o client Prisma:

```bash
pnpm --filter back prisma:generate
```

3. Para rodar migração local (aplica no DB apontado por DATABASE_URL):

```bash
pnpm --filter back prisma:migrate:dev --name init
```

4. Abra o Prisma Studio:

```bash
pnpm --filter back prisma:studio
```

Notas:
- O `DATABASE_URL` é lido a partir do `.env` na raiz do repositório.
- Em CI, prefira `pnpm --filter back prisma:migrate:deploy`.

## Gerar migration inicial (local)

Se você já tem o Postgres local (por ex. via `docker compose up postgres`), gere a migration inicial com:

```bash
pnpm --filter back prisma:migrate:dev --name init
```

Se preferir apenas criar os arquivos de migration sem aplicar, rode (quando disponível na sua versão do Prisma):

```bash
pnpm --filter back prisma:migrate dev --create-only --name init
```

## Migrações em CI / Produção

Exemplo mínimo de etapa em GitHub Actions para aplicar migrações em produção (seguindo a prática de aprovar deploys):

```yaml
name: Deploy

on:
	push:
		branches: [ main ]

jobs:
	deploy:
		runs-on: ubuntu-latest
		steps:
			- uses: actions/checkout@v4
			- name: Setup Node
				uses: actions/setup-node@v4
				with:
					node-version: '24'
			- name: Install dependencies
				run: pnpm install
			- name: Generate Prisma Client
				run: pnpm --filter back prisma:generate
			- name: Apply DB migrations
				env:
					DATABASE_URL: ${{ secrets.DATABASE_URL }}
				run: pnpm --filter back prisma:migrate:deploy
			# deploy do backend e frontend seguem aqui
```

Notas:
- Nunca exponha `DATABASE_URL` ou `JWT_SECRET` em arquivos de build; use `secrets` no provedor CI/CD.
- Para ambientes de staging/produção, teste migrações em staging antes de aplicar em produção.
