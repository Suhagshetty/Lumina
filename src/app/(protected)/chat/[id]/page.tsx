import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { ChatHistory } from "@/components/chat/ChatHistory";
import { getConversations, getConversationMessages } from "@/actions/chat";

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;
  const conversations = await getConversations();
  const messages = await getConversationMessages(id);

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <header className="flex-shrink-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold">Lumina</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {session.user?.email}
            </span>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <Button type="submit" variant="outline" size="sm">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <ChatHistory conversations={conversations} currentConversationId={id} />
        <main className="flex-1 flex flex-col overflow-hidden">
          <ChatInterface conversationId={id} initialMessages={messages} />
        </main>
      </div>
    </div>
  );
}
