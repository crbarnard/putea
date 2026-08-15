FROM oven/bun:1 AS build
WORKDIR /app

COPY apps/api/package.json ./
RUN bun install

COPY apps/api/ ./
RUN bun run build

FROM oven/bun:1 AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY apps/api/package.json ./
RUN bun install --production

COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["bun", "./dist/src/main.js"]