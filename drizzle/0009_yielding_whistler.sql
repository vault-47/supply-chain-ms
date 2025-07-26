ALTER TABLE "workspace" RENAME COLUMN "owner_profile_uid" TO "owner_user_uid";--> statement-breakpoint
ALTER TABLE "workspace" DROP CONSTRAINT "workspace_owner_profile_uid_profile_info_uid_fk";
--> statement-breakpoint
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_owner_user_uid_users_uid_fk" FOREIGN KEY ("owner_user_uid") REFERENCES "public"."users"("uid") ON DELETE cascade ON UPDATE no action;