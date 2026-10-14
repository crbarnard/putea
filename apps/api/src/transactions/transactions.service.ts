import { Injectable, NotFoundException } from '@nestjs/common';
import { and, desc, eq } from 'drizzle-orm';
import { DrizzleService } from '../drizzle/drizzle.service';
import * as schema from '../drizzle/schema';
import { CreateTransactionRequest } from './dto/create-transaction.request';
import { UpdateTransactionRequest } from './dto/update-transaction.request';

@Injectable()
export class TransactionsService {
  constructor(private drizzle: DrizzleService) {}

  async findAll(filters: { userId?: string; accountId?: string }) {
    const conditions = [
      filters.userId ? eq(schema.transactions.userId, filters.userId) : undefined,
      filters.accountId
        ? eq(schema.transactions.accountId, filters.accountId)
        : undefined,
    ];
    return this.drizzle.db.query.transactions.findMany({
      where: and(...conditions),
      orderBy: desc(schema.transactions.date),
    });
  }

  async findOne(id: string) {
    const transaction = await this.drizzle.db.query.transactions.findFirst({
      where: eq(schema.transactions.id, id),
    });
    if (!transaction) throw new NotFoundException('Transaction not found');
    return transaction;
  }

  async create(request: CreateTransactionRequest) {
    const [transaction] = await this.drizzle.db
      .insert(schema.transactions)
      .values(request)
      .returning();
    return transaction;
  }

  async update(id: string, request: UpdateTransactionRequest) {
    const [transaction] = await this.drizzle.db
      .update(schema.transactions)
      .set({ ...request, updatedAt: new Date() })
      .where(eq(schema.transactions.id, id))
      .returning();
    if (!transaction) throw new NotFoundException('Transaction not found');
    return transaction;
  }

  async remove(id: string) {
    const [transaction] = await this.drizzle.db
      .delete(schema.transactions)
      .where(eq(schema.transactions.id, id))
      .returning();
    if (!transaction) throw new NotFoundException('Transaction not found');
    return transaction;
  }
}
