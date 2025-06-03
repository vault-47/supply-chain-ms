ALTER TABLE "invites" ADD COLUMN "role" text NOT NULL;--> statement-breakpoint
ALTER TABLE "invites" DROP COLUMN "expires_at";