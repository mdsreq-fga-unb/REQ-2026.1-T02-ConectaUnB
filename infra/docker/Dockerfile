FROM node:24-alpine

WORKDIR /workspace

ENV CI=true

RUN apk add --no-cache curl && corepack enable && corepack prepare pnpm@11.3.0 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/back/package.json apps/back/package.json
COPY apps/front/package.json apps/front/package.json
COPY prisma prisma

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["pnpm", "--filter", "back", "dev"]