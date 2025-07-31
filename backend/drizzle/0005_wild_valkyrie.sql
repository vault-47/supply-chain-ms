CREATE TABLE "workspace_members" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspace_uid" uuid,
	"profile_uid" uuid,
	"invited_by" uuid,
	"joined_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "workspace_members" ADD CONSTRAINT "workspace_members_workspace_uid_workspace_uid_fk" FOREIGN KEY ("workspace_uid") REFERENCES "public"."workspace"("uid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace_members" ADD CONSTRAINT "workspace_members_profile_uid_profile_info_uid_fk" FOREIGN KEY ("profile_uid") REFERENCES "public"."profile_info"("uid") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace_members" ADD CONSTRAINT "workspace_members_invited_by_profile_info_uid_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."profile_info"("uid") ON DELETE cascade ON UPDATE no action;