import {
  pgTable,
  integer,
  timestamp,
  uuid,
  varchar,
  text,
} from 'drizzle-orm/pg-core';
import { users } from './user.schema';
import { enumToPgEnum } from './utils';
import { QuoteRequestUrgencyType } from 'src/request-quotes/enums/quote-request-urgency-type.enum';
import { QuoteRequestStatus } from 'src/request-quotes/enums/quote-request-status.enum';

export const quote_requests = pgTable('quote_requests', {
  id: uuid().defaultRandom().primaryKey(),
  qr_num: varchar('qr_num', { length: 255 }).notNull(),
  user_id: uuid('user_id')
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  vendor_id: uuid('vendor_id')
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  origin_address: varchar('origin_address', { length: 255 }).notNull(),
  destination_address: varchar('destination_address', {
    length: 255,
  }).notNull(),
  distance_km: integer('distance_km').notNull(),
  weight_kg: integer('weight_kg').notNull(),
  goods_type: varchar('goods_type', { length: 255 }).notNull(),
  additional_note: text('additional_note'),
  urgency: varchar('urgency', {
    length: 255,
    enum: enumToPgEnum(QuoteRequestUrgencyType),
  }).notNull(),
  status: varchar('status', {
    length: 255,
    enum: enumToPgEnum(QuoteRequestStatus),
  })
    .default(QuoteRequestStatus.PENDING)
    .notNull(),
  created_at: timestamp('created_at', { withTimezone: false })
    .defaultNow()
    .notNull(),
});
