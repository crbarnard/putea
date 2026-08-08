FROM oven/bun:1 AS base
WORKDIR /app

# dependencies
FROM base AS deps
COPY package.json bun.lock ./
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
RUN bun install --frozen-lockfile

# compile api
FROM deps AS build
COPY . .
RUN cd apps/api && bun run build

# runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/apps/api/dist ./apps/api/dist
COPY apps/api/package.json ./apps/api/package.json
COPY apps/api/drizzle ./apps/api/drizzle
COPY apps/api/drizzle.config.ts ./apps/api/drizzle.config.ts

EXPOSE 3000

CMD ["bun", "apps/api/dist/main.js"]