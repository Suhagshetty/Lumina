import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import {
  Cloud,
  TrendingUp,
  Flag,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Globe,
  Clock,
  MessageSquare,
  BarChart3,
  CloudRain,
  Trophy,
  DollarSign,
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
      <div className="fixed top-6 right-6 z-50">
        <ModeToggle />
      </div>

      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-black dark:to-slate-950" />

        <div className="absolute inset-0 bg-grid-pattern opacity-20" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_100%)]" />

        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 dark:bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-[32rem] h-[32rem] bg-purple-500/5 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-indigo-500/5 dark:bg-indigo-500/5 rounded-full blur-3xl animate-pulse-slow" />

      <nav className="relative border-b border-border bg-card/30 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <h2 className="bg-gradient-to-r from-foreground to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent text-2xl font-extrabold">
              Lumina
            </h2>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/chat"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Chat
            </Link>
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative px-8 py-20">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="text-center space-y-6 animate-fade-in">
            <Badge
              variant="outline"
              className="inline-flex items-center gap-2 px-4 py-2 border-border bg-card/50 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Powerful Features</span>
            </Badge>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
              <span className="bg-gradient-to-r from-foreground via-blue-600 to-purple-600 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
                Everything you need
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Lumina combines intelligent conversation with real-time data
              access. Get weather updates, F1 schedules, and stock prices
              through natural language.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-3xl border border-border bg-card/50 backdrop-blur-md p-8 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:scale-[1.02] transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-grid-pattern opacity-5" />
              <div className="relative space-y-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center border border-blue-500/20">
                  <Cloud className="w-10 h-10 text-blue-500" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-bold">Live Weather</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Real-time weather data for any location worldwide
                  </p>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-3">
                    <CloudRain className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Current Conditions</p>
                      <p className="text-sm text-muted-foreground">
                        Temperature, humidity, wind speed
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Forecasts</p>
                      <p className="text-sm text-muted-foreground">
                        Hourly and daily predictions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Global Coverage</p>
                      <p className="text-sm text-muted-foreground">
                        Any city, anywhere in the world
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-border bg-card/50 backdrop-blur-md p-8 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-500/10 hover:scale-[1.02] transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-grid-pattern opacity-5" />
              <div className="relative space-y-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center border border-red-500/20">
                  <Flag className="w-10 h-10 text-red-500" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-bold">F1 Schedules</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Complete Formula 1 race calendar and timing
                  </p>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-3">
                    <Trophy className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Race Calendar</p>
                      <p className="text-sm text-muted-foreground">
                        All grands prix and sprint races
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Session Times</p>
                      <p className="text-sm text-muted-foreground">
                        Practice, qualifying, and race start times
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Circuit Information</p>
                      <p className="text-sm text-muted-foreground">
                        Track details and locations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-border bg-card/50 backdrop-blur-md p-8 hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/10 hover:scale-[1.02] transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-grid-pattern opacity-5" />
              <div className="relative space-y-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center border border-green-500/20">
                  <TrendingUp className="w-10 h-10 text-green-500" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-3xl font-bold">Stock Prices</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Real-time stock market data and insights
                  </p>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Live Prices</p>
                      <p className="text-sm text-muted-foreground">
                        Real-time stock quotes and values
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BarChart3 className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Market Data</p>
                      <p className="text-sm text-muted-foreground">
                        Volume, market cap, and changes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Performance Tracking</p>
                      <p className="text-sm text-muted-foreground">
                        Daily, weekly, and monthly trends
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">
                <span className="bg-gradient-to-r from-foreground to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
                  Built for Speed & Intelligence
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every feature designed to make your experience seamless
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-md p-6 hover:border-blue-500/30 transition-all duration-300">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center border border-blue-500/20">
                    <Zap className="w-6 h-6 text-blue-500" />
                  </div>
                  <h4 className="text-lg font-bold">Instant Responses</h4>
                  <p className="text-sm text-muted-foreground">
                    Lightning-fast AI processing for immediate answers
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-md p-6 hover:border-purple-500/30 transition-all duration-300">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center border border-purple-500/20">
                    <MessageSquare className="w-6 h-6 text-purple-500" />
                  </div>
                  <h4 className="text-lg font-bold">Natural Language</h4>
                  <p className="text-sm text-muted-foreground">
                    Chat naturally without learning complex commands
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-md p-6 hover:border-green-500/30 transition-all duration-300">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center border border-green-500/20">
                    <Shield className="w-6 h-6 text-green-500" />
                  </div>
                  <h4 className="text-lg font-bold">Secure & Private</h4>
                  <p className="text-sm text-muted-foreground">
                    Your conversations and data stay protected
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-md p-6 hover:border-orange-500/30 transition-all duration-300">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center border border-orange-500/20">
                    <Clock className="w-6 h-6 text-orange-500" />
                  </div>
                  <h4 className="text-lg font-bold">24/7 Available</h4>
                  <p className="text-sm text-muted-foreground">
                    Always online, ready whenever you need help
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-md p-12 text-center space-y-6">
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <div className="relative space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-foreground to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
                  Ready to get started?
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience intelligent conversations with real-time data access
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="group relative text-lg px-10 py-7 rounded-full shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
                >
                  <Link href="/chat" className="flex items-center gap-2">
                    Start Chatting
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-lg px-10 py-7 rounded-full border-2 bg-card/50 hover:bg-card backdrop-blur-sm transition-all duration-300"
                >
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative border-t border-border bg-card/30 backdrop-blur-xl mt-20">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start gap-3">
              <h3 className="bg-gradient-to-r from-foreground to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
                Lumina
              </h3>
              <p className="text-muted-foreground text-sm flex items-center gap-2">
                © 2026 • Made with
                <span className="text-red-500 animate-pulse">❤️</span>
                by
                <span className="font-medium">Suhag S Shetty</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link
                href="/#features"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Separator orientation="vertical" className="h-4" />
              <Link
                href="/chat"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Chat
              </Link>
              <Separator orientation="vertical" className="h-4" />
              <Link
                href="/login"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Login
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Button
                asChild
                size="icon"
                variant="ghost"
                className="rounded-full hover:bg-accent hover:text-blue-500 transition-all duration-300 border border-border"
              >
                <Link
                  href="https://github.com/Suhagshetty"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </Link>
              </Button>

              <Button
                asChild
                size="icon"
                variant="ghost"
                className="rounded-full hover:bg-accent hover:text-blue-500 transition-all duration-300 border border-border"
              >
                <Link
                  href="https://www.linkedin.com/in/suhagshetty07/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
              </Button>

              <Button
                asChild
                size="icon"
                variant="ghost"
                className="rounded-full hover:bg-accent hover:text-blue-500 transition-all duration-300 border border-border"
              >
                <Link
                  href="https://x.com/Suhag_tsx"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
              </Button>

              <Button
                asChild
                size="icon"
                variant="ghost"
                className="rounded-full hover:bg-accent hover:text-blue-500 transition-all duration-300 border border-border"
              >
                <Link
                  href="https://mail.google.com/mail/u/0/#inbox"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>

          <Separator className="my-8" />
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
