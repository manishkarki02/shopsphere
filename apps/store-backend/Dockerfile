# Build stage
FROM node:20-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy the entire workspace
# (In Docker Compose, we'll set the context to the root)
COPY . .

# Install dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Build shared package first, then backend
RUN pnpm run build --filter=@shop-sphere/shared
RUN pnpm run build --filter=store-backend

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Install pnpm (needed for production-only install if not using deploy)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy necessary files from builder
COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=builder /app/apps/store-backend/package.json ./apps/store-backend/
COPY --from=builder /app/apps/store-backend/dist ./apps/store-backend/dist
COPY --from=builder /app/packages/shared/package.json ./packages/shared/
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist

# Install production dependencies only
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

EXPOSE 3000

ENV NODE_ENV=production

# Run the app
CMD ["node", "apps/store-backend/dist/src/index.js"]
