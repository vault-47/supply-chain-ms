import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { users } from './user.schema';

export const profile_info = pgTable('profile_info', {
  id: uuid().defaultRandom().primaryKey(),
  user_id: uuid('user_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  first_name: varchar('first_name', { length: 255 }).notNull(),
  last_name: varchar('last_name', { length: 255 }).notNull(),
  created_at: timestamp('created_at', { withTimezone: false })
    .defaultNow()
    .notNull(),
});
