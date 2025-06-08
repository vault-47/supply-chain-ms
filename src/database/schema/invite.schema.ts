import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { enumToPgEnum } from './utils';
import { Role } from 'src/shared/enums/role.enum';
import { createId } from '@paralleldrive/cuid2';

export const invites = pgTable('invites', {
  uid: text('uid')
    .primaryKey()
    .$defaultFn(() => createId()),
  email: varchar('email', { length: 255 }).unique().notNull(),
  code: text('code').notNull(),
  role: text({ enum: enumToPgEnum(Role) }).notNull(),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
