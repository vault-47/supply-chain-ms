ALTER TABLE "workspace" RENAME COLUMN "owner_user_uid" TO "owner_profile_uid";--> statement-breakpoint
ALTER TABLE "profile_info" DROP CONSTRAINT "profile_info_workspace_id_workspace_uid_fk";
--> statement-breakpoint
ALTER TABLE "workspace" DROP CONSTRAINT "workspace_owner_user_uid_users_uid_fk";
--> statement-breakpoint
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_owner_profile_uid_users_uid_fk" FOREIGN KEY ("owner_profile_uid") REFERENCES "public"."users"("uid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profile_info" DROP COLUMN "workspace_id";