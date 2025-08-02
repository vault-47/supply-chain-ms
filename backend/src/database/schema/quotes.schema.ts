import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { enumToPgEnum } from './utils';
import { quote_requests } from './quote_request.schema';
import { users } from './user.schema';
import { QuoteStatus } from 'src/quotes/enums/quote-status.enum';

export const quotes = pgTable('quotes', {
  id: uuid().defaultRandom().primaryKey(),
  quote_request_id: uuid('quote_request_id').references(
    () => quote_requests.id,
  ),
  vendor_id: uuid('vendor_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  price: text('price').notNull(),
  currency: text('currency').notNull(),
  estimated_delivery_days: text('estimated_delivery_days').notNull(),
  valid_until: text('valid_until').notNull(),
  status: text({ enum: enumToPgEnum(QuoteStatus) }).default(QuoteStatus.ACTIVE),
  created_at: timestamp('created_at', { withTimezone: false })
    .defaultNow()
    .notNull(),
});
