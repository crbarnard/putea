import { accounts } from '../../drizzle/schema';

export class CreateAccountRequest {
  userId: string;
  name: string;
  type: (typeof accounts.$inferInsert)['type'];
  currency?: string;
  startingBalance?: string;
}
