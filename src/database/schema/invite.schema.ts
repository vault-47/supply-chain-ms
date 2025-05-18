import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const invites = pgTable('invites', {
  uid: uuid().defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  code: text('code').notNull(),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  expires_at: timestamp('expires_at', { withTimezone: true })
    .default(sql`now() + interval '24 hours'`)
    .notNull(),
});
