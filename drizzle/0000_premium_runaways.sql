CREATE TABLE "recent_projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"image_url" text NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"tools" json NOT NULL,
	"live_link" text NOT NULL,
	"project_link" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
