import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import {
  ArrowRight,
  Sparkles,
  Github,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-black dark:to-slate-950" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <nav className="relative border-b border-border bg-card/30 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Lumina
            </h2>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/chat"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Chat
            </Link>

            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Login
            </Link>

            <span className="h-5 w-px bg-border" />

            <div className="rounded-full border border-border bg-card/50 p-1 backdrop-blur-md">
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>

      <main className="relative px-8 py-20">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="text-center space-y-6 animate-fade-in">
            <Badge
              variant="outline"
              className="inline-flex items-center gap-2 px-4 py-2 border-border bg-card/50 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-blue-500" />
              Powerful Features
            </Badge>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Everything you need
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Intelligent chat with real-time weather, F1 schedules and stock
              prices.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/chat" className="flex items-center gap-2">
                Start Chatting <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <Link href="/">Back Home</Link>
            </Button>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative border-t border-border bg-card/30 backdrop-blur-xl mt-24">
        <div className="max-w-6xl mx-auto px-8 py-12 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Lumina
            </h3>

            <div className="flex items-center gap-3">
              <Button asChild size="icon" variant="ghost">
                <Link href="https://github.com/Suhagshetty" target="_blank">
                  <Github className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="icon" variant="ghost">
                <Link
                  href="https://www.linkedin.com/in/suhagshetty07/"
                  target="_blank"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="icon" variant="ghost">
                <Link href="https://x.com/Suhag_tsx" target="_blank">
                  <Twitter className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="icon" variant="ghost">
                <Link href="mailto:suhag@example.com">
                  <Mail className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>

          <Separator />

          <p className="text-center text-xs text-muted-foreground">
            © 2026 Lumina • Built with Next.js & shadcn/ui
          </p>
        </div>
      </footer>
    </div>
  );
}
