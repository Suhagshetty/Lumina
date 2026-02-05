import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import {
  ArrowRight,
  Sparkles,
  Cloud,
  TrendingUp,
  Flag,
  Github,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default async function Lumina() {
  const session = await auth();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Dark Mode Toggle - Fixed Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <ModeToggle />
      </div>

      {/* Animated Background - Theme Aware */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient - adapts to theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-black dark:to-slate-950" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />

        {/* Radial gradient mask */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_100%)]" />

        {/* Accent gradients - adapts to theme */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 dark:bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-[32rem] h-[32rem] bg-purple-500/5 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-indigo-500/5 dark:bg-indigo-500/5 rounded-full blur-3xl animate-pulse-slow" />

      <div className="relative flex min-h-screen flex-col items-center justify-center p-8 pt-24">
        <div className="w-full max-w-6xl space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-8 animate-fade-in">
            {/* Badge */}
            <Badge
              variant="outline"
              className="inline-flex items-center gap-2 px-4 py-2 border-border bg-card/50 backdrop-blur-md hover:bg-card/80 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">
                AI-Powered Intelligence
              </span>
            </Badge>

            {/* Main Title */}
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter">
              <span className="inline-block bg-gradient-to-r from-foreground via-blue-600 to-purple-600 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent animate-gradient">
                Lumina
              </span>
            </h1>

            {/* Subtitle with glow effect */}
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Smart answers, real data
            </p>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
              Your intelligent AI assistant that goes beyond conversation. Get
              real-time weather updates, F1 race schedules, and live stock
              prices—all through natural chat.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              {session ? (
                <Button
                  asChild
                  size="lg"
                  className="group relative text-lg px-10 py-7 rounded-full shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border border-border"
                >
                  <Link href="/chat" className="flex items-center gap-2">
                    Go to Chat
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button
                    asChild
                    size="lg"
                    className="group relative text-lg px-10 py-7 rounded-full shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border border-border"
                  >
                    <Link href="/login" className="flex items-center gap-2">
                      Get Started
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="text-lg px-10 py-7 rounded-full border-2 bg-card/50 hover:bg-card backdrop-blur-sm transition-all duration-300"
                  >
                    <Link href="#features">Learn More</Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Features Grid */}
          <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Weather Card */}
            <div className="group relative overflow-hidden rounded-3xl border border-border bg-card/50 backdrop-blur-md p-8 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:scale-[1.02] transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-grid-pattern opacity-5" />
              <div className="relative space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-blue-500/20">
                  <Cloud className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold">Live Weather</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get accurate, real-time weather forecasts for any location
                  worldwide
                </p>
              </div>
            </div>

            {/* F1 Card */}
            <div className="group relative overflow-hidden rounded-3xl border border-border bg-card/50 backdrop-blur-md p-8 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-500/10 hover:scale-[1.02] transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-grid-pattern opacity-5" />
              <div className="relative space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-red-500/20">
                  <Flag className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold">F1 Schedules</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Track upcoming Formula 1 races and never miss a grand prix
                </p>
              </div>
            </div>

            {/* Stock Card */}
            <div className="group relative overflow-hidden rounded-3xl border border-border bg-card/50 backdrop-blur-md p-8 hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/10 hover:scale-[1.02] transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-grid-pattern opacity-5" />
              <div className="relative space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-green-500/20">
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold">Stock Prices</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Monitor real-time stock market data and make informed
                  decisions
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto py-12">
            <div className="text-center space-y-3 group">
              <div className="text-5xl font-black bg-gradient-to-br from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                3
              </div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                Live Tools
              </div>
            </div>
            <div className="text-center space-y-3 group">
              <div className="text-5xl font-black bg-gradient-to-br from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                24/7
              </div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                Availability
              </div>
            </div>
            <div className="text-center space-y-3 group">
              <div className="text-5xl font-black bg-gradient-to-br from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                Instant
              </div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                Responses
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-border bg-card/30 backdrop-blur-xl mt-20">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left side - Brand & Copyright */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Lumina
              </h3>
              <p className="text-muted-foreground text-sm flex items-center gap-2">
                © 2026 • Made with
                <span className="text-red-500 animate-pulse">❤️</span>
                by
                <span className="font-medium">Suhag S Shetty</span>
              </p>
            </div>

            {/* Center - Navigation Links */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link
                href="#features"
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

            {/* Right side - Social Links */}
            <div className="flex items-center gap-3">
              <Button
                asChild
                size="icon"
                variant="ghost"
                className="rounded-full hover:bg-accent hover:text-blue-500 transition-all duration-300 border border-border"
              >
                <Link
                  href="https://github.com/suhagshetty"
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
                  href="https://linkedin.com/in/suhagshetty"
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
                  href="https://twitter.com/suhagshetty"
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
                <Link href="mailto:suhag@example.com" aria-label="Email">
                  <Mail className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Bottom text */}
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
