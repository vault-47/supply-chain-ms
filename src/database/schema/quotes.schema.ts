import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { enumToPgEnum } from './utils';
import { quote_requests } from './quote_request.schema';
import { QuoteStatus } from 'src/shared/enums/quote-status.enum';
import { users } from './user.schema';

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
