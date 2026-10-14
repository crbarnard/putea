import {
  pgTable,
  pgEnum,
  uuid,
  text,
  numeric,
  date,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';
import { users } from './users';
import { accounts } from './accounts';

export const transactionTypeEnum = pgEnum('transaction_type', [
  'income',
  'expense',
  'transfer',
]);

export const transactionStatusEnum = pgEnum('transaction_status', [
  'pending',
  'cleared',
  'reconciled',
]);

export const transactions = pgTable(
  'transactions',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    accountId: uuid('account_id')
      .notNull()
      .references(() => accounts.id, { onDelete: 'cascade' }),
    // Only set when type = 'transfer': the account the money moved into.
    transferAccountId: uuid('transfer_account_id').references(
      () => accounts.id,
      { onDelete: 'set null' },
    ),
    type: transactionTypeEnum('type').notNull(),
    status: transactionStatusEnum('status').notNull().default('cleared'),
    amount: numeric('amount', { precision: 14, scale: 2 }).notNull(),
    currency: text('currency').notNull().default('NZD'),
    date: date('date').notNull(),
    payee: text('payee'),
    notes: text('notes'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => [
    index('transactions_user_idx').on(table.userId),
    index('transactions_account_idx').on(table.accountId),
    index('transactions_date_idx').on(table.date),
  ],
);
