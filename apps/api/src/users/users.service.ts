// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import * as schema from '../drizzle/schema';

@Injectable()
export class UsersService {
  constructor(private drizzle: DrizzleService) {}

  async findAll() {
    return this.drizzle.db.query.users.findMany();
  }

  async createUser(user: typeof schema.users.$inferInsert) {
    await this.drizzle.db.insert(schema.users).values(user);
  }
}