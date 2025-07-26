import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { enumToPgEnum } from './utils';
import { quote_requests } from './quote_request.schema';
import { users } from './user.schema';
import { QuoteStatus } from 'src/quotes/enums/quote-status.enum';

export const quotes = pgTable('quotes', {
  uid: uuid().defaultRandom().primaryKey(),
  quote_request_uid: uuid('quote_request_uid').references(
    () => quote_requests.uid,
  ),
  vendor_uid: uuid('vendor_uid').references(() => users.uid, {
    onDelete: 'cascade',
  }),
  price: text('price').notNull(),
  currency: text('currency').notNull(),
  estimated_delivery_days: text('estimated_delivery_days').notNull(),
  valid_until: text('valid_until').notNull(),
  status: text({ enum: enumToPgEnum(QuoteStatus) }).default(QuoteStatus.ACTIVE),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
