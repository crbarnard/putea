FROM oven/bun:1 AS build
WORKDIR /app

COPY apps/web/package.json ./
RUN bun install

COPY apps/web/ ./
RUN bun run build


FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY apps/web/package.json ./
RUN npm install --omit=dev

COPY --from=build /app/build ./build

EXPOSE 3000

CMD ["./node_modules/.bin/react-router-serve", "./build/server/index.js"]