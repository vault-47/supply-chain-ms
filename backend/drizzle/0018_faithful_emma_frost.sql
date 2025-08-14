ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "account_status" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "quotes" ALTER COLUMN "price" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "quotes" ALTER COLUMN "currency" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "quotes" ALTER COLUMN "estimated_delivery_days" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "quotes" ALTER COLUMN "valid_until" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "quotes" ALTER COLUMN "status" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "quotes" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';--> statement-breakpoint
ALTER TABLE "quote_requests" ALTER COLUMN "qr_num" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "quote_requests" ALTER COLUMN "origin_address" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "quote_requests" ALTER COLUMN "destination_address" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "quote_requests" ALTER COLUMN "goods_type" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "quote_requests" ALTER COLUMN "additional_note" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "quote_requests" ALTER COLUMN "urgency" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "quote_requests" ALTER COLUMN "status" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "quote_requests" ALTER COLUMN "status" SET DEFAULT 'PENDING';