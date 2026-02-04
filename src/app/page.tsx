import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

export default async function Lumina() {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-background to-muted">
      <div className="text-center space-y-6 max-w-2xl">
        {/* Logo/Title */}
        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Lumina
        </h1>

        {/* Tagline */}
        <p className="text-2xl font-semibold text-foreground">
          Smart answers, real data
        </p>

        {/* Description */}
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Your intelligent AI assistant that goes beyond conversation. Get
          real-time weather updates, F1 race schedules, and live stock
          prices—all through natural chat.
        </p>

        {/* CTA Button - Changes based on login status */}
        <div className="pt-4">
          {session ? (
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/chat">Go to Chat</Link>
            </Button>
          ) : (
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/login">Get Started</Link>
            </Button>
          )}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <div className="p-4 rounded-lg border bg-card">
            <div className="text-3xl mb-2">🌤️</div>
            <h3 className="font-semibold mb-1">Live Weather</h3>
            <p className="text-sm text-muted-foreground">
              Get current weather for any location
            </p>
          </div>

          <div className="p-4 rounded-lg border bg-card">
            <div className="text-3xl mb-2">🏎️</div>
            <h3 className="font-semibold mb-1">F1 Schedules</h3>
            <p className="text-sm text-muted-foreground">
              Track upcoming Formula 1 races
            </p>
          </div>

          <div className="p-4 rounded-lg border bg-card">
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-semibold mb-1">Stock Prices</h3>
            <p className="text-sm text-muted-foreground">
              Monitor real-time stock market data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
