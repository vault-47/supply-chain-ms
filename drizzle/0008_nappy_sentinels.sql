ALTER TABLE "workspace_members" RENAME COLUMN "profile_uid" TO "user_uid";--> statement-breakpoint
ALTER TABLE "workspace_members" DROP CONSTRAINT "workspace_members_profile_uid_profile_info_uid_fk";
--> statement-breakpoint
ALTER TABLE "workspace_members" DROP CONSTRAINT "workspace_members_invited_by_profile_info_uid_fk";
--> statement-breakpoint
ALTER TABLE "workspace_members" ADD CONSTRAINT "workspace_members_user_uid_users_uid_fk" FOREIGN KEY ("user_uid") REFERENCES "public"."users"("uid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace_members" ADD CONSTRAINT "workspace_members_invited_by_users_uid_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."users"("uid") ON DELETE cascade ON UPDATE no action;