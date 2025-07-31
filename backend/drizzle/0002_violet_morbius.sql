ALTER TABLE "team" RENAME TO "workspace";--> statement-breakpoint
ALTER TABLE "workspace" DROP CONSTRAINT "team_owner_user_uid_users_uid_fk";
--> statement-breakpoint
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_owner_user_uid_users_uid_fk" FOREIGN KEY ("owner_user_uid") REFERENCES "public"."users"("uid") ON DELETE cascade ON UPDATE no action;