// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { users } from '../drizzle/schema';

@Injectable()
export class UsersService {
  constructor(private drizzle: DrizzleService) {}

  findAll() {
    return this.drizzle.db.select().from(users);
  }
}