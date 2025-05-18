ALTER TABLE "profile_info" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "profile_info" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;