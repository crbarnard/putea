import { transactions } from '../../drizzle/schema';

export class UpdateTransactionRequest {
  accountId?: string;
  transferAccountId?: string | null;
  type?: (typeof transactions.$inferInsert)['type'];
  status?: (typeof transactions.$inferInsert)['status'];
  amount?: string;
  currency?: string;
  date?: string;
  payee?: string | null;
  notes?: string | null;
}
