import { Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DrizzleService } from '../drizzle/drizzle.service';
import * as schema from '../drizzle/schema';
import { CreateAccountRequest } from './dto/create-account.request';
import { UpdateAccountRequest } from './dto/update-account.request';

@Injectable()
export class AccountsService {
  constructor(private drizzle: DrizzleService) {}

  async findAll(userId?: string) {
    return this.drizzle.db.query.accounts.findMany({
      where: userId ? eq(schema.accounts.userId, userId) : undefined,
    });
  }

  async findOne(id: string) {
    const account = await this.drizzle.db.query.accounts.findFirst({
      where: eq(schema.accounts.id, id),
    });
    if (!account) throw new NotFoundException('Account not found');
    return account;
  }

  async create(request: CreateAccountRequest) {
    const [account] = await this.drizzle.db
      .insert(schema.accounts)
      .values(request)
      .returning();
    return account;
  }

  async update(id: string, request: UpdateAccountRequest) {
    const [account] = await this.drizzle.db
      .update(schema.accounts)
      .set({ ...request, updatedAt: new Date() })
      .where(eq(schema.accounts.id, id))
      .returning();
    if (!account) throw new NotFoundException('Account not found');
    return account;
  }

  async remove(id: string) {
    const [account] = await this.drizzle.db
      .delete(schema.accounts)
      .where(eq(schema.accounts.id, id))
      .returning();
    if (!account) throw new NotFoundException('Account not found');
    return account;
  }
}
