FROM oven/bun:1 AS base
WORKDIR /app

# dependencies
FROM base AS deps
COPY package.json bun.lock ./
COPY package.json package.json
RUN bun install --frozen-lockfile

# compile api
FROM deps AS build
COPY . .
RUN bun run build

# runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./package.json
COPY drizzle ./drizzle
COPY drizzle.config.ts ./drizzle.config.ts

EXPOSE 3000

CMD ["bun", "dist/main.js"]