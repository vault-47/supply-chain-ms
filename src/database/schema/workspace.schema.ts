import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './user.schema';

export const workspaces = pgTable('workspace', {
  id: uuid().defaultRandom().primaryKey(),
  name: text('name').notNull(),
  owner_user_id: uuid('owner_user_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
