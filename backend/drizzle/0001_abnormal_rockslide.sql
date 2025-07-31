ALTER TABLE "profile_info" DROP CONSTRAINT "profile_info_user_uid_users_uid_fk";
--> statement-breakpoint
ALTER TABLE "quotes" DROP CONSTRAINT "quotes_vendor_uid_users_uid_fk";
--> statement-breakpoint
ALTER TABLE "quote_requests" DROP CONSTRAINT "quote_requests_user_uid_users_uid_fk";
--> statement-breakpoint
ALTER TABLE "quote_requests" DROP CONSTRAINT "quote_requests_vendor_uid_users_uid_fk";
--> statement-breakpoint
ALTER TABLE "team" DROP CONSTRAINT "team_owner_user_uid_users_uid_fk";
--> statement-breakpoint
ALTER TABLE "profile_info" ADD CONSTRAINT "profile_info_user_uid_users_uid_fk" FOREIGN KEY ("user_uid") REFERENCES "public"."users"("uid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_vendor_uid_users_uid_fk" FOREIGN KEY ("vendor_uid") REFERENCES "public"."users"("uid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quote_requests" ADD CONSTRAINT "quote_requests_user_uid_users_uid_fk" FOREIGN KEY ("user_uid") REFERENCES "public"."users"("uid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quote_requests" ADD CONSTRAINT "quote_requests_vendor_uid_users_uid_fk" FOREIGN KEY ("vendor_uid") REFERENCES "public"."users"("uid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team" ADD CONSTRAINT "team_owner_user_uid_users_uid_fk" FOREIGN KEY ("owner_user_uid") REFERENCES "public"."users"("uid") ON DELETE cascade ON UPDATE no action;