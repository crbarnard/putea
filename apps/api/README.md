# Putea API
 
Backend API built with [NestJS](https://nestjs.com/) and [Drizzle ORM](https://orm.drizzle.team/) (PostgreSQL), using Bun as the runtime/package manager.
 
## Stack
 
- **Runtime/package manager:** Bun
- **Framework:** NestJS 11
- **ORM:** Drizzle ORM (`node-postgres` driver)
- **Database:** PostgreSQL
- **Migrations:** `drizzle-kit`
---
 
## Getting Started
 
### 1. Install dependencies
 
```bash
bun install
```
 
### 2. Set up environment variables
 
Create a `.env` file at `/apps/api/.env`
 
```env
DATABASE_URL=postgres://user:password@localhost:5432/putea
```

### 3. Run migrations
 
```bash
cd apps/api
bun run db:migrate
```
 
### 4. Start the dev server
 
```bash
cd apps/api
bun run start:dev
```
 
---
 
## Project Structure
 
```
src/
├── drizzle/
│   ├── drizzle.module.ts       # Provides DrizzleService globally
│   ├── drizzle.service.ts      # Manages the pg Pool + Drizzle client
│   └── schema/
│       ├── index.ts            # index — re-exports every table file
│       ├── users.ts
│       └── <table>.ts          # One file per table
├── users/
│   ├── users.module.ts
│   ├── users.controller.ts
│   └── users.service.ts
├── app.module.ts
└── main.ts
 
drizzle/                        # Generated SQL migrations (do not edit by hand)
├── 0000_xxx.sql
└── meta/
 
drizzle.config.ts               # drizzle-kit config
```
 
---
 
## Common Tasks
 
### Add a new table
 
1. Create a new file in `src/drizzle/schema/`, e.g. `src/drizzle/schema/orders.ts`:
```typescript
   import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';
   import { users } from './users';
 
   export const orders = pgTable('orders', {
     id: serial('id').primaryKey(),
     userId: integer('user_id').references(() => users.id),
     total: text('total').notNull(),
     createdAt: timestamp('created_at').defaultNow().notNull(),
   });
```
 
2. Add it to the index file `src/drizzle/schema/index.ts`:
```typescript
   export * from './users';
   export * from './orders';
```
 
---
 
### Generate a migration
 
After adding or editing a table in `src/drizzle/schema/`:
 
```bash
cd apps/api
bun run db:generate
```
 
This produces a new SQL file in `drizzle/` based on the diff between your schema and the last snapshot. Review the generated SQL before applying it.
 
---
 
### Run migrations
 
Apply all pending migrations to the database:
 
```bash
cd apps/api
bun run db:migrate
```
 
---
 
### Push schema directly (dev only, skips migration files)
 
Useful for fast local iteration when you don't need a migration history:
 
```bash
cd apps/api
bun run db:push
```
 
---
 
### Open Drizzle Studio (visual DB browser)
 
```bash
cd apps/api
bun run db:studio
```
 
Opens a local UI to browse and edit tables directly.
 
---
 
### Generate a new NestJS module
 
Use the Nest CLI to scaffold a module + controller + service together:
 
```bash
cd apps/api
bun nest g resource orders
```
 
This prompts for a transport layer (choose **REST API**) and whether to generate CRUD entry points — choose yes for a full starter set. It creates:
 
```
src/orders/
├── orders.controller.ts
├── orders.controller.spec.ts
├── orders.module.ts
├── orders.service.ts
├── orders.service.spec.ts
├── dto/
│   ├── create-order.dto.ts
│   └── update-order.dto.ts
└── entities/
    └── order.entity.ts
```
  
Or generate pieces individually:
 
```bash
cd apps/api
bun nest g module orders
bun nest g controller orders
bun nest g service orders
```
 
Then register `OrdersModule` in `app.module.ts`:
 
```typescript
@Module({
  imports: [DrizzleModule, UsersModule, OrdersModule],
})
export class AppModule {}
```
 
---
 
### Add a service method (query the DB)
 
Inject `DrizzleService` and import the specific table(s) you need directly from their schema file — not the index:
 
```typescript
// src/orders/orders.service.ts
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DrizzleService } from '../drizzle/drizzle.service';
import { orders } from '../drizzle/schema/orders';
 
@Injectable()
export class OrdersService {
  constructor(private drizzle: DrizzleService) {}
 
  findAll() {
    return this.drizzle.db.select().from(orders);
  }
 
  findOne(id: number) {
    return this.drizzle.db.select().from(orders).where(eq(orders.id, id));
  }
 
  create(data: { userId: number; total: string }) {
    return this.drizzle.db.insert(orders).values(data).returning();
  }
 
  update(id: number, data: Partial<{ total: string }>) {
    return this.drizzle.db
      .update(orders)
      .set(data)
      .where(eq(orders.id, id))
      .returning();
  }
 
  remove(id: number) {
    return this.drizzle.db.delete(orders).where(eq(orders.id, id)).returning();
  }
}
```
 
---
 
### Add a controller + endpoints
 
```typescript
// src/orders/orders.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
 
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
 
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }
 
  @Post()
  create(@Body() body: { userId: number; total: string }) {
    return this.ordersService.create(body);
  }
 
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: { total?: string }) {
    return this.ordersService.update(+id, body);
  }
 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
```
 
---
 
### Add a DTO with validation
 
Install validation packages if not already present:
 
```bash
bun add class-validator class-transformer
```
 
```typescript
// src/orders/dto/create-order.dto.ts
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
 
export class CreateOrderDto {
  @IsInt()
  userId: number;
 
  @IsString()
  @IsNotEmpty()
  total: string;
}
```
 
Enable global validation in `main.ts`:
 
```typescript
import { ValidationPipe } from '@nestjs/common';
 
app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
```
 
Use it in the controller:
 
```typescript
@Post()
create(@Body() dto: CreateOrderDto) {
  return this.ordersService.create(dto);
}
```
 
---
 
### Add a relation between tables
 
```typescript
// src/drizzle/schema/orders.ts
import { relations } from 'drizzle-orm';
import { users } from './users';
import { orders } from './orders';
 
export const ordersRelations = relations(orders, ({ one }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
}));
```
 
Add the relation export to `src/drizzle/schema/index.ts`. Then query with relations:
 
```typescript
this.drizzle.db.query.orders.findMany({
  with: { user: true },
});
```
 
---
 
### Reset the local database (dev only)
 
```bash
cd apps/api
bun run db:push --force
```
 
Or drop and recreate manually via `psql`, then re-run `bun run db:migrate`.
 
---
 
## Environment Variables Reference
 
| Variable       | Description                          | Example                                            |
|----------------|---------------------------------------|-----------------------------------------------------|
| `DATABASE_URL` | Postgres connection string            | `postgres://user:pass@localhost:5432/putea`         |
 
---