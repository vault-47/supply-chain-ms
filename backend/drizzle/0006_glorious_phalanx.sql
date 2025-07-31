ALTER TABLE "workspace" DROP CONSTRAINT "workspace_owner_profile_uid_users_uid_fk";
--> statement-breakpoint
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_owner_profile_uid_profile_info_uid_fk" FOREIGN KEY ("owner_profile_uid") REFERENCES "public"."profile_info"("uid") ON DELETE cascade ON UPDATE no action;