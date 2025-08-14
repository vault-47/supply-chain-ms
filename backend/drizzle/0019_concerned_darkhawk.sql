ALTER TABLE "quotes" ALTER COLUMN "quote_request_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "quotes" ALTER COLUMN "vendor_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "quote_requests" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "quote_requests" ALTER COLUMN "vendor_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "quote_requests" ALTER COLUMN "additional_note" SET DATA TYPE text;