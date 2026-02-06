"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Loader2, Sparkles } from "lucide-react";
import { useState, FormEvent, useRef, useEffect } from "react";
import {
  createConversation,
  saveMessage,
  getConversationCount,
} from "@/actions/chat-actions-complete";

import { useRouter } from "next/navigation";
import type { Message as DBMessage } from "@/lib/db/schema";
import { WeatherCard } from "../chat/WeatherCard";
import { StockCard } from "../chat/StockCard";
import { F1RaceCard } from "../chat/F1RaceCard";
import { AchievementBadge } from "../chat/AchievementBadge";
import { useAchievements } from "@/hooks/useAchievements";

interface ToolData {
  type: "weather" | "f1" | "stock";
  data: any;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  toolData?: ToolData;
}

interface ChatInterfaceProps {
  conversationId?: string;
  initialMessages?: DBMessage[];
}

export function ChatInterface({
  conversationId,
  initialMessages = [],
}: ChatInterfaceProps) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>(
    initialMessages.map((m) => ({
      id: m.id,
      role: m.role,
      content: m.content,
      toolData: m.toolData ? JSON.parse(m.toolData) : undefined,
    })),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [currentConversationId, setCurrentConversationId] =
    useState(conversationId);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasNavigatedRef = useRef(false);

  // Achievement tracking
  const {
    pendingAchievement,
    unlockAchievement,
    clearPendingAchievement,
    checkAllToolsUnlocked,
  } = useAchievements();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Update conversation ID and messages when prop changes
  useEffect(() => {
    if (conversationId) {
      setCurrentConversationId(conversationId);
      hasNavigatedRef.current = false;

      setMessages(
        initialMessages.map((m) => ({
          id: m.id,
          role: m.role,
          content: m.content,
          toolData: m.toolData ? JSON.parse(m.toolData) : undefined,
        })),
      );
    }
  }, [conversationId, initialMessages]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();

    if (!trimmedInput || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmedInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      let convId = currentConversationId;
      let needsNavigation = false;
      let isFirstMessage = false;

      if (!convId) {
        const newConv = await createConversation(trimmedInput.substring(0, 50));
        convId = newConv.id;
        setCurrentConversationId(convId);
        needsNavigation = true;
        isFirstMessage = true;
      }

      await saveMessage(convId, "user", trimmedInput);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const decoder = new TextDecoder();
      let assistantMessage = "";
      let toolDataParsed: ToolData | null = null;

      const assistantId = (Date.now() + 1).toString();

      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        if (chunk.includes("__TOOL_DATA__")) {
          const match = chunk.match(/__TOOL_DATA__(.+?)__END_TOOL_DATA__/);
          if (match) {
            try {
              toolDataParsed = JSON.parse(match[1]);
            } catch (e) {
              console.error("Failed to parse tool data:", e);
            }
            const cleanChunk = chunk.replace(
              /__TOOL_DATA__.+?__END_TOOL_DATA__/,
              "",
            );
            assistantMessage += cleanChunk;
          } else {
            assistantMessage += chunk;
          }
        } else {
          assistantMessage += chunk;
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content: assistantMessage,
                  toolData: toolDataParsed || undefined,
                }
              : m,
          ),
        );
      }

      await saveMessage(convId, "assistant", assistantMessage, toolDataParsed);

      // Check for achievements
      if (isFirstMessage) {
        unlockAchievement("first_chat");
      }

      // Check for tool usage achievements
      if (toolDataParsed) {
        if (toolDataParsed.type === "weather") {
          unlockAchievement("weather");
        } else if (toolDataParsed.type === "f1") {
          unlockAchievement("f1");
        } else if (toolDataParsed.type === "stock") {
          unlockAchievement("stock");
        }

        // Check if all tools have been used
        checkAllToolsUnlocked();
      }

      // Check for 10 conversation milestone
      const count = await getConversationCount();
      if (count === 10) {
        unlockAchievement("milestone_10");
      }

      if (needsNavigation && !hasNavigatedRef.current) {
        hasNavigatedRef.current = true;
        router.push(`/chat/${convId}`);
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content:
            "Sorry, there was an error processing your request. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Achievement Badge Animation */}
      {pendingAchievement && (
        <AchievementBadge
          type={pendingAchievement}
          onComplete={clearPendingAchievement}
        />
      )}

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-6 max-w-md">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-foreground/10 blur-2xl rounded-full" />
                <Sparkles className="h-16 w-16 text-foreground relative" />
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-bold">Welcome to Lumina! 🌟</h2>
                <p className="text-muted-foreground text-lg">
                  Your AI assistant is ready to help. Start a conversation!
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 text-sm text-left mt-8">
                <Card className="p-4 border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                  <p className="text-muted-foreground">
                    💬 Ask me anything about weather, F1 races, or stock prices
                  </p>
                </Card>
                <Card className="p-4 border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                  <p className="text-muted-foreground">
                    🌍 Get real-time data from around the world
                  </p>
                </Card>
                <Card className="p-4 border-border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                  <p className="text-muted-foreground">
                    ⚡ Lightning-fast responses powered by AI
                  </p>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                } animate-fade-in`}
              >
                <div className={`max-w-[80%] space-y-3`}>
                  {/* Render tool card if available */}
                  {message.toolData && (
                    <div className="animate-fade-in">
                      {message.toolData.type === "weather" && (
                        <WeatherCard data={message.toolData.data} />
                      )}
                      {message.toolData.type === "f1" && (
                        <F1RaceCard data={message.toolData.data} />
                      )}
                      {message.toolData.type === "stock" && (
                        <StockCard data={message.toolData.data} />
                      )}
                    </div>
                  )}

                  {/* Regular message card */}
                  {message.content && (
                    <Card
                      className={`p-4 transition-all duration-300 ${
                        message.role === "user"
                          ? "bg-foreground text-background border-transparent shadow-lg"
                          : "bg-card border-border backdrop-blur-sm hover:shadow-md"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">
                        {message.content || (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm text-muted-foreground">
                              Thinking...
                            </span>
                          </div>
                        )}
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card/50 backdrop-blur-xl p-4">
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="pr-12 h-12 bg-background/50 backdrop-blur-sm border-border focus:border-foreground/50 transition-colors"
              autoFocus
            />
            {isLoading && (
              <Loader2 className="h-4 w-4 animate-spin absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            )}
          </div>
          <Button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            size="lg"
            className="h-12 px-6 bg-foreground hover:bg-foreground/90 text-background transition-all duration-300"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
