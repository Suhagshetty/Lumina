"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteConversation } from "@/actions/chat";
import type { Conversation } from "@/lib/db/schema";

interface ChatHistoryProps {
  conversations: Conversation[];
  currentConversationId?: string;
}

export function ChatHistory({
  conversations,
  currentConversationId,
}: ChatHistoryProps) {
  const router = useRouter();

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Delete this conversation?")) {
      await deleteConversation(id);
      if (id === currentConversationId) {
        router.push("/chat");
      }
      router.refresh();
    }
  };

  return (
    <div className="w-64 border-r bg-muted/10 flex flex-col h-full">
      <div className="p-4 border-b">
        <Button
          onClick={() => router.push("/chat")}
          className="w-full"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {conversations.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground py-8">
              No conversations yet
            </div>
          ) : (
            conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                  conversation.id === currentConversationId ? "bg-muted" : ""
                }`}
                onClick={() => router.push(`/chat/${conversation.id}`)}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <MessageSquare className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm truncate">{conversation.title}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => handleDelete(conversation.id, e)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
