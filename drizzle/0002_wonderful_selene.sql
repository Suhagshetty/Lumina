ALTER TABLE "conversations" DROP CONSTRAINT "conversations_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "messages" DROP CONSTRAINT "messages_conversation_id_conversations_id_fk";
--> statement-breakpoint
ALTER TABLE "conversations" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "conversations" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "conversations" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "conversations" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "conversationId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversationId_conversations_id_fk" FOREIGN KEY ("conversationId") REFERENCES "public"."conversations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversations" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "conversations" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "messages" DROP COLUMN "conversation_id";--> statement-breakpoint
ALTER TABLE "messages" DROP COLUMN "tool_calls";--> statement-breakpoint
ALTER TABLE "messages" DROP COLUMN "created_at";