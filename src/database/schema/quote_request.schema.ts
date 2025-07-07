import { pgTable, text, integer, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './user.schema';
import { enumToPgEnum } from './utils';
import { QuoteRequestUrgencyType } from 'src/shared/enums/quote-request-urgency-type.enum';
import { QuoteRequestStatus } from 'src/shared/enums/quote-request-status.enum';

export const quote_requests = pgTable('quote_requests', {
  uid: uuid().defaultRandom().primaryKey(),
  user_uid: uuid('user_uid').references(() => users.uid, {
    onDelete: 'cascade',
  }),
  vendor_uid: uuid('vendor_uid').references(() => users.uid, {
    onDelete: 'cascade',
  }),
  origin_address: text('origin_address').notNull(),
  destination_address: text('destination_address').notNull(),
  distance_km: integer('distance_km').notNull(),
  weight_kg: integer('weight_kg').notNull(),
  goods_type: text('goods_type').notNull(),
  additional_note: text('additional_note'),
  urgency: text({ enum: enumToPgEnum(QuoteRequestUrgencyType) }).notNull(),
  status: text({ enum: enumToPgEnum(QuoteRequestStatus) })
    .default(QuoteRequestStatus.PENDING)
    .notNull(),
  created_at: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
