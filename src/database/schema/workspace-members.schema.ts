import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { workspaces } from './workspace.schema';
import { users } from './user.schema';

export const workspace_members = pgTable('workspace_members', {
  uid: uuid().defaultRandom().primaryKey(),
  workspace_uid: uuid('workspace_uid').references(() => workspaces.uid, {
    onDelete: 'cascade',
  }),
  user_uid: uuid('user_uid').references(() => users.uid, {
    onDelete: 'cascade',
  }),
  invited_by: uuid('invited_by').references(() => users.uid, {
    onDelete: 'cascade',
  }),
  joined_at: timestamp('joined_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
