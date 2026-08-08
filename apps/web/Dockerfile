FROM oven/bun:1 AS base
WORKDIR /app

# dependencies
FROM base AS deps
COPY package.json bun.lock ./
COPY apps/web/package.json apps/web/package.json
COPY apps/api/package.json apps/api/package.json
RUN bun install --frozen-lockfile

# build app
FROM deps AS build
COPY . .
RUN cd apps/web && bun run build

# build runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/apps/web/build ./apps/web/build
COPY apps/web/package.json ./apps/web/package.json

EXPOSE 3000

CMD ["bun", "run", "--cwd", "apps/web", "start"]