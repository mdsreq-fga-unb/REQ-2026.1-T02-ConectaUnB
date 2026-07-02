# Conecta UnB

<div align="center">

# 🎓 Conecta UnB

### Plataforma digital para integração do ecossistema acadêmico da Universidade de Brasília

**Disciplina:** Requisitos de Software
**Universidade de Brasília (UnB)**
**Faculdade de Ciências e Tecnologias em Engenharia (FCTE)**

</div>

### Para Correção
- Login: georgemarsicano@unb.br
- Senha: Senha@123

Link aplicação: https://conectaunb.app/conecta/feed

Link gitpages entrega final: https://mdsreq-fga-unb.github.io/REQ-2026.1-T02-ConectaUnB/

---

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Universidade](https://img.shields.io/badge/Universidade-UnB-blue)
![Disciplina](https://img.shields.io/badge/Disciplina-Requisitos%20de%20Software-green)



---

# Sobre o Projeto

O **Conecta UnB** é uma plataforma digital integradora desenvolvida com o objetivo de centralizar a comunicação e as oportunidades existentes dentro do ecossistema acadêmico da **Universidade de Brasília (UnB)**.

A proposta surgiu durante a disciplina de **Requisitos de Software**, ministrada pelo professor **Dr. George Marsicano Correia**, e busca solucionar problemas recorrentes relacionados à divulgação de informações entre estudantes, entidades acadêmicas, projetos de extensão, empresas juniores, centros acadêmicos, atléticas, laboratórios e demais organizações universitárias.

A plataforma visa democratizar o acesso às oportunidades disponíveis na universidade, facilitar a comunicação entre estudantes e organizações, incentivar a participação em projetos práticos e preservar a memória institucional das entidades acadêmicas.

---

# Objetivos

O Conecta UnB possui como principais objetivos:

* Centralizar a divulgação de oportunidades acadêmicas;
* Facilitar a comunicação entre estudantes e entidades;
* Incentivar a participação em projetos de ensino, pesquisa e extensão;
* Reduzir o esforço necessário para divulgação de eventos e processos seletivos;
* Preservar registros e informações das organizações estudantis;
* Promover maior integração entre a comunidade universitária.

---

# Contexto Acadêmico

Este projeto está sendo desenvolvido na disciplina de **Requisitos de Software**, oferecida pela:

* **Universidade de Brasília (UnB)**
* **Faculdade de Ciências e Tecnologias em Engenharia (FCTE)**

Professor responsável:

**Dr. George Marsicano Correia**

Grupo de desenvolvimento:

**Capoeira**

---

# Equipe

<div align="center" markdown="1">

| ![](docs/assets/fotos/integrantes/gabriel.png) | ![](docs/assets/fotos/integrantes/giovanna.png)| ![](docs/assets/fotos/integrantes/ana.png)| ![](docs/assets/fotos/integrantes/joao.png)| ![](docs/assets/fotos/integrantes/matheus.png) | ![](docs/assets/fotos/integrantes/pedro.png) |
| :--------------------------------------------------------: | :---------------------------------------------------------: | :----------------------------------------------------: | :-----------------------------------------------------: | :--------------------------------------------------------: | :------------------------------------------------------: |
|     [Gabriel Diniz](https://github.com/GabrielDiniz12)     |     [Giovanna Brito](https://github.com/giovannabrito19)    |  [Ana Luiza Abrantes](https://github.com/luabrantess)  |          [João Pedro](https://github.com/ojplc)         |     [Matheus Lemes](https://github.com/matheuslemesam)     |      [Pedro Américo](https://github.com/dev-americo)     |

</div>

---

# Documentação

Toda a documentação do projeto será disponibilizada através do **GitHub Pages** utilizando **MkDocs**, contendo:

* Visão do produto
* Elicitação de requisitos
* Personas
* Histórias de usuário
* Casos de uso
* Backlog do produto
* Protótipos
* Modelagem
* Arquitetura
* Planejamento das sprints
* Atas de reunião

---

# Status do Projeto

🚧 **Em desenvolvimento**

O projeto encontra-se na fase de levantamento e especificação de requisitos.

---

# Licença

Este projeto possui fins exclusivamente acadêmicos, sendo desenvolvido para a disciplina de **Requisitos de Software** da Universidade de 

# Instruções - REQ-2026.1-T02-ConectaUnB
Repositório do projeto **Conecta UnB**, equipe **Capoeira** da disciplina de REQ-T2, 2026.1.

O Conecta UnB tem o objetivo de centralizar a comunicação e as oportunidades dentro do ecossistema acadêmico da Universidade de Brasília (UnB).

Informações disponíveis em: https://mdsreq-fga-unb.github.io/REQ-2026.1-T02-ConectaUnB/entrega4/

## Visão geral — Subir o ambiente local

O repositório fornece um comando único para preparar e subir o ambiente de desenvolvimento. O fluxo padrão combina um banco de dados PostgreSQL em Docker com a API (containerizada) e o frontend rodando localmente em modo dev.

### Pré-requisitos

- Node.js 22+ (obrigatório, 24+ recomendado)
- pnpm 11+
- Docker Desktop (Windows/macOS) ou Docker Engine + Compose (Linux)
- Copie `.env.example` para `.env` na raiz
- Defina `JWT_SECRET` no `.env` (necessário para autenticação)

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
- Autenticação:
  - `POST /auth/register` — Cadastro de perfil
  - `POST /auth/login` — Login (retorna JWT)
  - `GET /auth/me` — Dados do perfil logado (requer JWT)
- Perfil (requer JWT):
  - `GET /perfil` — Listar perfis
  - `GET /perfil/:id` — Buscar perfil por ID
  - `PATCH /perfil/:id` — Atualizar perfil
  - `DELETE /perfil/:id` — Excluir perfil

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
- No Linux, se `corepack enable` falhar com `EACCES`, execute `sudo corepack enable` ou instale o pnpm manualmente: `npm install -g pnpm@11.3.0`.
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

### Variáveis de ambiente

| Variável | Obrigatória | Padrão | Descrição |
|---|---|---|---|
| `PORT` | Não | `3000` | Porta do backend |
| `DATABASE_URL` | Sim | — | URL de conexão PostgreSQL |
| `JWT_SECRET` | Sim | — | Chave secreta para assinar tokens JWT |
| `BCRYPT_SALT_ROUNDS` | Não | `10` | Número de rounds do bcrypt para hash de senha |
| `CORS_ORIGIN` | Não | `*` | Origem permitida pelo CORS |
| `SWAGGER_ENABLED` | Não | `false` | Habilita Swagger fora de development |

## Deploy de produção (Akamai / Linode)

O backend e o frontend são publicados juntos numa única VM da Akamai, em containers Docker orquestrados por `infra/docker/docker-compose.prod.yml`, com o Caddy como reverse proxy (HTTPS automático via Let's Encrypt).

- **Deploy automático**: a cada `push` em `main`, o workflow `.github/workflows/ci-cd.yml` builda as imagens (`conectaunb-back` e `conectaunb-front`), publica no GHCR e dispara o restart na VM via SSH.
- **Migrações**: aplicadas automaticamente no start do container `api` (`infra/akamai/back-entrypoint`).
- **Passo a passo completo**: ver [`docs/deploy/akamai.md`](docs/deploy/akamai.md).

Secrets do GitHub Actions necessários: `AKAMAI_HOST`, `AKAMAI_USER`, `AKAMAI_SSH_KEY`, `NEXT_PUBLIC_API_URL` (e `GHCR_PULL_TOKEN` opcional, se as imagens forem privadas).
