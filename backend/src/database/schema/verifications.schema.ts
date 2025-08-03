import { pgTable, timestamp, uuid, varchar, text } from 'drizzle-orm/pg-core';
import { enumToPgEnum } from './utils';
import { VerificationType } from 'src/shared/enums/verification-type';

export const verifications = pgTable('verifications', {
  id: uuid().defaultRandom().primaryKey(),
  type: text({ enum: enumToPgEnum(VerificationType) }).notNull(),
  target: varchar('target', { length: 255 }).notNull(),
  code: varchar('code', { length: 255 }).notNull(),
  created_at: timestamp('created_at', { withTimezone: false })
    .notNull()
    .defaultNow(),
  expires_at: timestamp('expires_at', { withTimezone: false }),
});
