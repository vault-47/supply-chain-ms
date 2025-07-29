ALTER TABLE "users" RENAME COLUMN "uid" TO "id";--> statement-breakpoint
ALTER TABLE "profile_info" RENAME COLUMN "uid" TO "id";--> statement-breakpoint
ALTER TABLE "profile_info" RENAME COLUMN "user_uid" TO "user_id";--> statement-breakpoint
ALTER TABLE "invites" RENAME COLUMN "uid" TO "id";--> statement-breakpoint
ALTER TABLE "quotes" RENAME COLUMN "uid" TO "id";--> statement-breakpoint
ALTER TABLE "quotes" RENAME COLUMN "quote_request_uid" TO "quote_request_id";--> statement-breakpoint
ALTER TABLE "quotes" RENAME COLUMN "vendor_uid" TO "vendor_id";--> statement-breakpoint
ALTER TABLE "quote_requests" RENAME COLUMN "user_uid" TO "id";--> statement-breakpoint
ALTER TABLE "quote_requests" RENAME COLUMN "uid" TO "user_id";--> statement-breakpoint
ALTER TABLE "quote_requests" RENAME COLUMN "vendor_uid" TO "vendor_id";--> statement-breakpoint
ALTER TABLE "workspace" RENAME COLUMN "uid" TO "id";--> statement-breakpoint
ALTER TABLE "workspace" RENAME COLUMN "owner_user_uid" TO "owner_user_id";--> statement-breakpoint
ALTER TABLE "workspace_members" RENAME COLUMN "uid" TO "id";--> statement-breakpoint
ALTER TABLE "workspace_members" RENAME COLUMN "workspace_uid" TO "workspace_id";--> statement-breakpoint
ALTER TABLE "workspace_members" RENAME COLUMN "user_uid" TO "user_id";--> statement-breakpoint
ALTER TABLE "profile_info" DROP CONSTRAINT "profile_info_user_uid_users_uid_fk";
--> statement-breakpoint
ALTER TABLE "quotes" DROP CONSTRAINT "quotes_quote_request_uid_quote_requests_uid_fk";
--> statement-breakpoint
ALTER TABLE "quotes" DROP CONSTRAINT "quotes_vendor_uid_users_uid_fk";
--> statement-breakpoint
ALTER TABLE "quote_requests" DROP CONSTRAINT "quote_requests_user_uid_users_uid_fk";
--> statement-breakpoint
ALTER TABLE "quote_requests" DROP CONSTRAINT "quote_requests_vendor_uid_users_uid_fk";
--> statement-breakpoint
ALTER TABLE "workspace" DROP CONSTRAINT "workspace_owner_user_uid_users_uid_fk";
--> statement-breakpoint
ALTER TABLE "workspace_members" DROP CONSTRAINT "workspace_members_workspace_uid_workspace_uid_fk";
--> statement-breakpoint
ALTER TABLE "workspace_members" DROP CONSTRAINT "workspace_members_user_uid_users_uid_fk";
--> statement-breakpoint
ALTER TABLE "workspace_members" DROP CONSTRAINT "workspace_members_invited_by_users_uid_fk";
--> statement-breakpoint
ALTER TABLE "profile_info" ADD CONSTRAINT "profile_info_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_quote_request_id_quote_requests_id_fk" FOREIGN KEY ("quote_request_id") REFERENCES "public"."quote_requests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_vendor_id_users_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quote_requests" ADD CONSTRAINT "quote_requests_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quote_requests" ADD CONSTRAINT "quote_requests_vendor_id_users_id_fk" FOREIGN KEY ("vendor_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_owner_user_id_users_id_fk" FOREIGN KEY ("owner_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace_members" ADD CONSTRAINT "workspace_members_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace_members" ADD CONSTRAINT "workspace_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace_members" ADD CONSTRAINT "workspace_members_invited_by_users_id_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;