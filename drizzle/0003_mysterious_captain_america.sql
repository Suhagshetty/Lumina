ALTER TABLE "user" RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "toolData" text;