import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { AccountStatus } from 'src/shared/enums/account-status.enum';
import { users } from './user.schema';
import { enumToPgEnum } from './utils';

export const profile_info = pgTable('profile_info', {
  id: uuid().defaultRandom().primaryKey(),
  user_id: uuid('user_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  first_name: varchar('first_name', { length: 255 }).notNull(),
  last_name: varchar('last_name', { length: 255 }).notNull(),
  account_status: text({ enum: enumToPgEnum(AccountStatus) }).notNull(),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
