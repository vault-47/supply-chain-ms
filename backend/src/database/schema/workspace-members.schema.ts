import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { workspaces } from './workspace.schema';
import { users } from './user.schema';

export const workspace_members = pgTable('workspace_members', {
  id: uuid().defaultRandom().primaryKey(),
  workspace_id: uuid('workspace_id').references(() => workspaces.id, {
    onDelete: 'cascade',
  }),
  user_id: uuid('user_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  invited_by: uuid('invited_by').references(() => users.id, {
    onDelete: 'cascade',
  }),
  joined_at: timestamp('joined_at', { withTimezone: false })
    .defaultNow()
    .notNull(),
});
