import { accounts } from '../../drizzle/schema';

export class UpdateAccountRequest {
  name?: string;
  type?: (typeof accounts.$inferInsert)['type'];
  currency?: string;
  startingBalance?: string;
  isArchived?: boolean;
}
