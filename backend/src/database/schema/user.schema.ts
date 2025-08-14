import { pgTable, uuid, timestamp, varchar } from 'drizzle-orm/pg-core';
import { Role } from 'src/shared/enums/role.enum';
import { enumToPgEnum } from './utils';
import { AccountStatus } from 'src/shared/enums/account-status.enum';

export const users = pgTable('users', {
  id: uuid().defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role', { length: 255, enum: enumToPgEnum(Role) }).notNull(),
  account_status: varchar('account_status', {
    enum: enumToPgEnum(AccountStatus),
    length: 255,
  }).notNull(),
  first_name: varchar('first_name', { length: 255 }).notNull(),
  last_name: varchar('last_name', { length: 255 }).notNull(),
  created_at: timestamp('created_at', { withTimezone: false })
    .defaultNow()
    .notNull(),
});
