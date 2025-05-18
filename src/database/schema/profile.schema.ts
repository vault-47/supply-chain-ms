import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { Role } from 'src/shared/enums/role.enum';
import { users } from './user.schema';
import { enumToPgEnum } from './utils';

export const profile_info = pgTable('profile_info', {
  uid: uuid().defaultRandom().primaryKey(),
  user_id: uuid('user_id').references(() => users.uid),
  first_name: varchar('first_name', { length: 255 }).notNull(),
  last_name: varchar('last_name', { length: 255 }).notNull(),
  role: text({ enum: enumToPgEnum(Role) }).notNull(),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const profileInfoRelations = relations(profile_info, ({ one }) => ({
  user: one(users, { fields: [profile_info.user_id], references: [users.uid] }),
}));
