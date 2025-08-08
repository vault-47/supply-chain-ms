import {
  pgTable,
  text,
  integer,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { users } from './user.schema';
import { enumToPgEnum } from './utils';
import { QuoteRequestUrgencyType } from 'src/request-quotes/enums/quote-request-urgency-type.enum';
import { QuoteRequestStatus } from 'src/request-quotes/enums/quote-request-status.enum';

export const quote_requests = pgTable('quote_requests', {
  id: uuid().defaultRandom().primaryKey(),
  qr_num: varchar('qr_num').notNull(),
  user_id: uuid('user_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  vendor_id: uuid('vendor_id').references(() => users.id, {
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
  created_at: timestamp('created_at', { withTimezone: false })
    .defaultNow()
    .notNull(),
});
