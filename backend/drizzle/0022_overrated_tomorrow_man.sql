ALTER TABLE "quote_requests" ALTER COLUMN "qr_num" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "quote_requests" ALTER COLUMN "qr_num" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "quote_requests" ALTER COLUMN "qr_num" SET NOT NULL;