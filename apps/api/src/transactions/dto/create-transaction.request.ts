import { transactions } from '../../drizzle/schema';

export class CreateTransactionRequest {
  userId: string;
  accountId: string;
  transferAccountId?: string;
  type: (typeof transactions.$inferInsert)['type'];
  status?: (typeof transactions.$inferInsert)['status'];
  amount: string;
  currency?: string;
  date: string;
  payee?: string;
  notes?: string;
}
