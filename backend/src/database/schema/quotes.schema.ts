import { pgTable, varchar, timestamp, uuid } from 'drizzle-orm/pg-core';
import { enumToPgEnum } from './utils';
import { quote_requests } from './quote_request.schema';
import { users } from './user.schema';
import { QuoteStatus } from 'src/quotes/enums/quote-status.enum';

export const quotes = pgTable('quotes', {
  id: uuid().defaultRandom().primaryKey(),
  quote_request_id: uuid('quote_request_id')
    .references(() => quote_requests.id)
    .notNull(),
  vendor_id: uuid('vendor_id')
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  price: varchar('price', { length: 255 }).notNull(),
  currency: varchar('currency', { length: 255 }).notNull(),
  estimated_delivery_days: varchar('estimated_delivery_days', {
    length: 255,
  }).notNull(),
  valid_until: varchar('valid_until', { length: 255 }).notNull(),
  status: varchar('status', {
    length: 255,
    enum: enumToPgEnum(QuoteStatus),
  }).default(QuoteStatus.ACTIVE),
  created_at: timestamp('created_at', { withTimezone: false })
    .defaultNow()
    .notNull(),
});
