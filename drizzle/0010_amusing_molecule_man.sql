ALTER TABLE "profile_info" ALTER COLUMN "uid" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "profile_info" ALTER COLUMN "uid" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "invites" ALTER COLUMN "uid" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "invites" ALTER COLUMN "uid" DROP DEFAULT;