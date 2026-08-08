// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';

@Injectable()
export class UsersService {
  constructor(private drizzle: DrizzleService) {}

  async findAll() {
    return this.drizzle.db.query.users.findMany();
  }
}