# ══════════════════════════════════════════════════════════════════════════════
# Dockerfile — Multistage build for ShopSphere monorepo
#
# Stages:
#   base               → node 20 + pnpm
#   deps               → install all workspace node_modules (cached layer)
#   development        → target for docker-compose-dev.yml, NO source copied
#   builder            → full production compile
#   production-server  → lean node image for Express API
#   production-web     → nginx serving compiled Vite app
# ══════════════════════════════════════════════════════════════════════════════


# ─── base ─────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apk add --no-cache python3 make g++
# Pin pnpm version — using "latest" causes unpredictable rebuilds
RUN corepack enable && corepack prepare pnpm@8.15.1 --activate

WORKDIR /app


# ─── deps ─────────────────────────────────────────────────────────────────────
# Only package manifests copied here — zero source code.
# Docker caches this layer. It only re-runs when a package.json or
# pnpm-lock.yaml changes, never on a .ts / .tsx file save.
FROM base AS deps

COPY package.json pnpm-workspace.yaml turbo.json biome.json ./
COPY pnpm-lock.yaml ./

# Every workspace member's manifest
COPY apps/store-backend/package.json   ./apps/store-backend/
COPY apps/store-frontend/package.json  ./apps/store-frontend/
COPY packages/shared/package.json      ./packages/shared/
COPY packages/typescript-config/package.json ./packages/typescript-config/

# --mount=type=cache keeps the pnpm store between builds so repeated
# `docker compose up --build` calls don't re-download packages from the internet
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile


# ─── development ──────────────────────────────────────────────────────────────
# TARGET of docker-compose-dev.yml.
#
# No source code is copied here intentionally.
# docker-compose-dev.yml bind-mounts your repo root onto /app,
# so every file you save is instantly visible inside the container.
#
# The node_modules baked into this image are protected from the bind mount
# by anonymous volumes in docker-compose-dev.yml.
#
# Only rebuild this image when you pnpm add / pnpm remove a package.
FROM base AS development

ENV NODE_ENV=development

# Pull node_modules from deps stage
COPY --from=deps /app/node_modules                             ./node_modules
COPY --from=deps /app/apps/store-backend/node_modules          ./apps/store-backend/node_modules
COPY --from=deps /app/apps/store-frontend/node_modules         ./apps/store-frontend/node_modules
COPY --from=deps /app/packages/shared/node_modules             ./packages/shared/node_modules
COPY --from=deps /app/packages/typescript-config/node_modules  ./packages/typescript-config/node_modules

# Root config files — pnpm and turbo need these at runtime
COPY --from=deps /app/package.json         ./package.json
COPY --from=deps /app/pnpm-workspace.yaml  ./pnpm-workspace.yaml
COPY --from=deps /app/turbo.json           ./turbo.json
COPY --from=deps /app/biome.json           ./biome.json


# ─── builder ──────────────────────────────────────────────────────────────────
FROM deps AS builder

ENV NODE_ENV=production

COPY . .

# Turborepo builds in correct dependency order:
# packages/shared → store-backend (tsc) and store-frontend (vite build)
RUN pnpm turbo build


# ─── production-server ────────────────────────────────────────────────────────
FROM node:20-alpine AS production-server

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@8.15.1 --activate

WORKDIR /app

COPY --from=builder /app/apps/store-backend/dist          ./apps/store-backend/dist
COPY --from=builder /app/apps/store-backend/package.json  ./apps/store-backend/package.json
COPY --from=builder /app/packages/shared/dist             ./packages/shared/dist
COPY --from=builder /app/packages/shared/package.json     ./packages/shared/package.json
COPY --from=builder /app/package.json                     ./package.json
COPY --from=builder /app/pnpm-workspace.yaml              ./pnpm-workspace.yaml
COPY --from=builder /app/node_modules                     ./node_modules
COPY --from=builder /app/apps/store-backend/node_modules  ./apps/store-backend/node_modules
COPY --from=builder /app/packages/shared/node_modules     ./packages/shared/node_modules

EXPOSE 3000

CMD ["node", "apps/store-backend/dist/index.js"]


# ─── production-web ───────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS production-web

RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/store-frontend/dist /usr/share/nginx/html
COPY nginx/web.conf                                /etc/nginx/conf.d/default.conf

EXPOSE 80