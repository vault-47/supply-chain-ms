import { pgTable, uuid, timestamp, varchar, text } from 'drizzle-orm/pg-core';
import { Role } from 'src/shared/enums/role.enum';
import { enumToPgEnum } from './utils';

export const users = pgTable('users', {
  uid: uuid().defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  role: text({ enum: enumToPgEnum(Role) }).notNull(),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
