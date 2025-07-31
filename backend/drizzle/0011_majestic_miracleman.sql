ALTER TABLE "users" ADD COLUMN "account_status" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "account_type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "profile_info" DROP COLUMN "account_status";