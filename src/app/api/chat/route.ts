import { streamText } from "ai";
import { model } from "@/lib/ai/client";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { messages } = await req.json();

  const result = streamText({
    model,
    messages,
    system: "You are Lumina, a helpful AI assistant. Be concise and friendly.",
  });

  return result.toTextStreamResponse();
}
