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
} from "@/actions/chat";
import { useRouter } from "next/navigation";
import type { Message as DBMessage } from "@/lib/db/schema";
import { WeatherCard } from "../chat/WeatherCard";
import { StockCard } from "../chat/StockCard";
import { F1RaceCard } from "../chat/F1RaceCard";
import AchievementBadge from "./AchievementBadge";

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

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isUserAtBottomRef = useRef(true);
  const hasNavigatedRef = useRef(false);

  /* -------------------- ACHIEVEMENTS -------------------- */
  const {
    pendingAchievement,
    unlockAchievement,
    clearPendingAchievement,
    checkAllToolsUnlocked,
  } = useAchievements();

  /* -------------------- SCROLL LOGIC (FIXED) -------------------- */
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (isUserAtBottomRef.current) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const threshold = 40;
    isUserAtBottomRef.current =
      el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
  };

  /* -------------------- PROP UPDATE -------------------- */
  useEffect(() => {
    if (!conversationId) return;

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
  }, [conversationId, initialMessages]);

  /* -------------------- SUBMIT -------------------- */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      let convId = currentConversationId;
      let needsNavigation = false;
      let isFirstMessage = false;

      if (!convId) {
        const newConv = await createConversation(
          userMessage.content.substring(0, 50),
        );
        convId = newConv.id;
        setCurrentConversationId(convId);
        needsNavigation = true;
        isFirstMessage = true;
      }

      await saveMessage(convId!, "user", userMessage.content);

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

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();
      const assistantId = `${Date.now()}-ai`;
      let assistantText = "";
      let toolDataParsed: ToolData | null = null;

      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        if (chunk.includes("__TOOL_DATA__")) {
          const match = chunk.match(/__TOOL_DATA__(.+?)__END_TOOL_DATA__/);
          if (match) {
            toolDataParsed = JSON.parse(match[1]);
          }
          assistantText += chunk.replace(
            /__TOOL_DATA__.+?__END_TOOL_DATA__/,
            "",
          );
        } else {
          assistantText += chunk;
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content: assistantText,
                }
              : m,
          ),
        );
      }

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, toolData: toolDataParsed || undefined }
            : m,
        ),
      );

      await saveMessage(convId!, "assistant", assistantText, toolDataParsed);

      if (isFirstMessage) unlockAchievement("first_chat");
      if (toolDataParsed) {
        unlockAchievement(toolDataParsed.type);
        checkAllToolsUnlocked();
      }

      if ((await getConversationCount()) === 10) {
        unlockAchievement("milestone_10");
      }

      if (needsNavigation && !hasNavigatedRef.current) {
        hasNavigatedRef.current = true;
        router.push(`/chat/${convId}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="flex flex-col h-full min-h-0">
      {pendingAchievement && (
        <AchievementBadge
          type={pendingAchievement}
          onComplete={clearPendingAchievement}
        />
      )}

      {/* Messages */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 min-h-0 overflow-y-auto px-4 py-6 space-y-6"
      >
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center space-y-6">
              <Sparkles className="h-16 w-16 mx-auto" />
              <h2 className="text-3xl font-bold">Welcome to Lumina 🌟</h2>
              <p className="text-muted-foreground">
                Start typing to begin a conversation
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="max-w-[80%] space-y-3">
                {message.toolData && (
                  <>
                    {message.toolData.type === "weather" && (
                      <WeatherCard data={message.toolData.data} />
                    )}
                    {message.toolData.type === "f1" && (
                      <F1RaceCard data={message.toolData.data} />
                    )}
                    {message.toolData.type === "stock" && (
                      <StockCard data={message.toolData.data} />
                    )}
                  </>
                )}

                <Card
                  className={`p-4 ${
                    message.role === "user"
                      ? "bg-foreground text-background"
                      : "bg-card"
                  }`}
                >
                  <div className="whitespace-pre-wrap break-words">
                    {message.content || (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                  </div>
                </Card>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="border-t bg-background p-4">
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-4xl mx-auto">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message…"
            disabled={isLoading}
          />
          <Button disabled={isLoading || !inputValue.trim()}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
