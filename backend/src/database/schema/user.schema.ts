import { pgTable, uuid, timestamp, varchar, text } from 'drizzle-orm/pg-core';
import { Role } from 'src/shared/enums/role.enum';
import { enumToPgEnum } from './utils';
import { AccountType } from 'src/shared/enums/account-type.enum';
import { AccountStatus } from 'src/shared/enums/account-status.enum';

export const users = pgTable('users', {
  id: uuid().defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  role: text({ enum: enumToPgEnum(Role) }).notNull(),
  account_status: text({ enum: enumToPgEnum(AccountStatus) }).notNull(),
  account_type: text({ enum: enumToPgEnum(AccountType) }).notNull(),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
