"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { conversations, messages } from "@/lib/db/schema";
import { eq, desc, count } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createConversation(title: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const [conversation] = await db
    .insert(conversations)
    .values({
      userId: session.user.id,
      title,
    })
    .returning();

  revalidatePath("/chat");
  return conversation;
}

export async function getConversations() {
  const session = await auth();
  if (!session?.user?.id) {
    return [];
  }

  const userConversations = await db
    .select()
    .from(conversations)
    .where(eq(conversations.userId, session.user.id))
    .orderBy(desc(conversations.updatedAt));

  return userConversations;
}

export async function getConversationMessages(conversationId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const conversationMessages = await db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, conversationId))
    .orderBy(messages.createdAt);

  return conversationMessages;
}

export async function saveMessage(
  conversationId: string,
  role: "user" | "assistant",
  content: string,
  toolData?: any,
) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const [message] = await db
    .insert(messages)
    .values({
      conversationId,
      role,
      content,
      toolData: toolData ? JSON.stringify(toolData) : null,
    })
    .returning();

  await db
    .update(conversations)
    .set({ updatedAt: new Date() })
    .where(eq(conversations.id, conversationId));

  revalidatePath("/chat");
  return message;
}

export async function deleteConversation(conversationId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await db.delete(conversations).where(eq(conversations.id, conversationId));

  revalidatePath("/chat");
}

export async function getConversationCount() {
  const session = await auth();
  if (!session?.user?.id) {
    return 0;
  }

  const result = await db
    .select({ count: count() })
    .from(conversations)
    .where(eq(conversations.userId, session.user.id));

  return result[0]?.count || 0;
}
