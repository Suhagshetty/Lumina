"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Plus, Trash2, Sparkles } from "lucide-react";
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
    <div className="w-64 border-r border-border bg-card/30 backdrop-blur-xl flex flex-col h-full relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-slate-500/5 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-slate-500/5 rounded-full blur-2xl" />
      </div>

      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative">
            <Sparkles className="h-5 w-5 text-foreground" />
            <div className="absolute inset-0 bg-foreground/10 blur-lg rounded-full" />
          </div>
          <h2 className="bg-gradient-to-r from-foreground to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent text-2xl font-extrabold">
            Lumina
          </h2>
        </div>
        <Button
          onClick={() => router.push("/chat")}
          className="w-full bg-foreground text-background hover:bg-foreground/90 transition-all duration-300"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {conversations.length === 0 ? (
            <div className="text-center px-4 py-12">
              <div className="space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">No conversations yet</p>
                  <p className="text-xs text-muted-foreground">
                    Start a new chat to begin
                  </p>
                </div>
              </div>
            </div>
          ) : (
            conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`group relative flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  conversation.id === currentConversationId
                    ? "bg-accent border border-border shadow-sm"
                    : "hover:bg-accent/50 border border-transparent"
                }`}
                onClick={() => router.push(`/chat/${conversation.id}`)}
              >
                {conversation.id === currentConversationId && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-foreground rounded-r-full" />
                )}

                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    conversation.id === currentConversationId
                      ? "bg-foreground/10"
                      : "bg-muted/50"
                  }`}
                >
                  <MessageSquare
                    className={`h-4 w-4 ${
                      conversation.id === currentConversationId
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  />
                </div>

                <div className="flex-1 min-w-0 flex items-center">
                  <span
                    className={`text-sm truncate ${
                      conversation.id === currentConversationId
                        ? "font-medium text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {conversation.title}
                  </span>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
                  onClick={(e) => handleDelete(conversation.id, e)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p className="font-medium">Powered by AI</p>
          <p>Real-time data • 24/7 available</p>
        </div>
      </div>
    </div>
  );
}
