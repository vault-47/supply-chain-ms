import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { Role } from 'src/shared/enums/role.enum';
import { AccountStatus } from 'src/shared/enums/account-status.enum';
import { users } from './user.schema';
import { enumToPgEnum } from './utils';
import { createId } from '@paralleldrive/cuid2';

export const profile_info = pgTable('profile_info', {
  uid: text('uid')
    .primaryKey()
    .$defaultFn(() => createId()),
  user_id: text('user_id').references(() => users.uid),
  first_name: varchar('first_name', { length: 255 }).notNull(),
  last_name: varchar('last_name', { length: 255 }).notNull(),
  role: text({ enum: enumToPgEnum(Role) }).notNull(),
  account_status: text({ enum: enumToPgEnum(AccountStatus) }).notNull(),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const profileInfoRelations = relations(profile_info, ({ one }) => ({
  user: one(users, { fields: [profile_info.user_id], references: [users.uid] }),
}));
