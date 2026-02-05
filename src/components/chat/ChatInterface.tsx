"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Loader2 } from "lucide-react";
import { useState, FormEvent, useRef, useEffect } from "react";
import { createConversation, saveMessage } from "@/actions/chat";
import { useRouter } from "next/navigation";
import type { Message as DBMessage } from "@/lib/db/schema";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
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
    })),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [currentConversationId, setCurrentConversationId] =
    useState(conversationId);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasNavigatedRef = useRef(false);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Update conversation ID when prop changes
  useEffect(() => {
    if (conversationId) {
      setCurrentConversationId(conversationId);
      hasNavigatedRef.current = false; // Reset navigation flag
    }
  }, [conversationId]);

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
      // Create conversation if needed
      let convId = currentConversationId;
      let needsNavigation = false;

      if (!convId) {
        console.log("Creating new conversation...");
        const newConv = await createConversation(trimmedInput.substring(0, 50));
        convId = newConv.id;
        setCurrentConversationId(convId);
        needsNavigation = true;
      }

      // Save user message
      console.log("Saving user message...");
      await saveMessage(convId, "user", trimmedInput);

      // Call AI API
      console.log("Calling AI API with messages:", [...messages, userMessage]);
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

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        console.error("No reader available");
        throw new Error("No reader available");
      }

      const decoder = new TextDecoder();
      let assistantMessage = "";

      const assistantId = (Date.now() + 1).toString();
      console.log("Creating assistant message placeholder:", assistantId);

      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      let chunkCount = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log("Stream complete. Total chunks:", chunkCount);
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        chunkCount++;
        console.log(`Chunk ${chunkCount}:`, chunk.substring(0, 50) + "...");

        assistantMessage += chunk;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: assistantMessage } : m,
          ),
        );
      }

      console.log("Final assistant message:", assistantMessage);

      // Save assistant message
      console.log("Saving assistant message...");
      await saveMessage(convId, "assistant", assistantMessage);

      // Navigate to the new conversation URL AFTER everything is complete
      if (needsNavigation && !hasNavigatedRef.current) {
        hasNavigatedRef.current = true;
        console.log("Navigating to new conversation:", convId);
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
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold">Welcome to Lumina! 🌟</h2>
              <p className="text-muted-foreground max-w-md">
                Your AI assistant is ready to help. Start a conversation!
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <Card
                  className={`max-w-[80%] p-4 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <div className="whitespace-pre-wrap">
                    {message.content || (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                  </div>
                </Card>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1"
            autoFocus
          />
          <Button type="submit" disabled={isLoading || !inputValue.trim()}>
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
