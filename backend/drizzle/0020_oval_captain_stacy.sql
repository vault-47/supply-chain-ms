ALTER TABLE "quote_requests" ALTER COLUMN "qr_num" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "quote_requests" ALTER COLUMN "qr_num" SET DEFAULT 
    'QR-' || to_char(CURRENT_DATE, 'YYYYMMDD') || '-' ||
    lpad(nextval('quote_request_seq')::text, 4, '0')
  ;--> statement-breakpoint
ALTER TABLE "quote_requests" ALTER COLUMN "qr_num" DROP NOT NULL;