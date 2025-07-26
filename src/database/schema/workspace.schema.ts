import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './user.schema';

export const workspaces = pgTable('workspace', {
  uid: uuid().defaultRandom().primaryKey(),
  name: text('name').notNull(),
  owner_user_uid: uuid('owner_user_uid').references(() => users.uid, {
    onDelete: 'cascade',
  }),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
