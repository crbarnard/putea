# Putea

Full-stack app with a NestJS API and a React Router web app.

## Stack

- **API:** NestJS, Drizzle ORM, PostgreSQL
- **Web:** React Router (framework mode)
- **Runtime/package manager:** Bun
- **Database:** PostgreSQL (via Docker Compose locally)

## Features

## Quick Setup

1. [Install Docker](https://docs.docker.com/install/)
2. Create a docker-compose.yml file similar to this:

```yml
services:
  api:
    image: 'ghcr.io/crbarnard/putea-api:latest'
    restart: unless-stopped
    ports:
      - '3000:3000'
    volumes:
      - putea-data:/data
  web:
    image: 'ghcr.io/crbarnard/putea-web:latest'
    restart: unless-stopped
    ports:
      - '8000:8000'
    volumes:
      - putea-data:/data

volumes:
  putea-data:
```

3. Bring up your stack by running

```bash
docker compose up -d
```

4. Log in to the Dashboard

When your docker container is running, connect to it on port `3000` for the admin interface.
[http://127.0.0.1:3000](http://127.0.0.1:3000)

## Getting Started

Local development needs [Bun](https://bun.sh) and Docker.

1. Install dependencies from the repo root:

```bash
bun install
```

2. Set `DATABASE_URL` in `apps/api/.env`. For the Postgres container this is
   `postgres://postgres:postgres@localhost:5432/putea`.

3. Start Postgres, the API and the web app:

```bash
bun run dev
```

The API runs on port `3000` and the web app on port `8000`.

### Database

The database scripts live in the api package, so run them from `apps/api`
(or from the root with `bun run --cwd apps/api <script>`):

```bash
cd apps/api
bun run db:generate   # generate SQL migrations from the Drizzle schema
bun run db:migrate    # apply migrations to the database
bun run db:push       # push the schema directly (skips migration files)
bun run db:studio     # browse the database in Drizzle Studio
```

The schema lives in `apps/api/src/drizzle/schema`. After changing it, run
`db:generate` then `db:migrate`.

## Getting Support

1. [Found a bug?](https://github.com/crbarnard/putea/issues)

## Contributing

This is a personal project and not currently open to outside contributions.
