import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { enumToPgEnum } from './utils';
import { Role } from 'src/shared/enums/role.enum';

export const invites = pgTable('invites', {
  uid: uuid().defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  code: text('code').notNull(),
  role: text({ enum: enumToPgEnum(Role) }).notNull(),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
