# Build stage
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY . .

# Acceptance of build arguments for Vite environment variables
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Build dependencies
RUN pnpm run build --filter=@shop-sphere/shared
RUN pnpm run build --filter=store-frontend

# Production stage
FROM nginx:alpine AS runner

# Copy frontend build to nginx
COPY --from=builder /app/apps/store-frontend/dist /usr/share/nginx/html

# Create a simple nginx config for SPA routing
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
