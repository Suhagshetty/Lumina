"use client";

import { useEffect, useState } from "react";
import {
  Cloud,
  Flag,
  TrendingUp,
  MessageSquare,
  Trophy,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";

interface AchievementBadgeProps {
  type:
    | "first_chat"
    | "milestone_10"
    | "all_tools"
    | "weather"
    | "f1"
    | "stock";
  onComplete?: () => void;
}

const ACHIEVEMENT_DATA = {
  first_chat: {
    icon: MessageSquare,
    title: "First Conversation",
    description: "You've started your journey with Lumina!",
    color: "from-blue-500 to-purple-500",
    bgColor: "bg-blue-500/20",
  },
  milestone_10: {
    icon: Trophy,
    title: "Conversation Master",
    description: "10 conversations completed!",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-500/20",
  },
  all_tools: {
    icon: Sparkles,
    title: "Tool Explorer",
    description: "You've used all 3 tools!",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/20",
  },
  weather: {
    icon: Cloud,
    title: "Weather Watcher",
    description: "First weather check unlocked!",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/20",
  },
  f1: {
    icon: Flag,
    title: "Racing Fan",
    description: "First F1 schedule checked!",
    color: "from-red-500 to-orange-500",
    bgColor: "bg-red-500/20",
  },
  stock: {
    icon: TrendingUp,
    title: "Market Tracker",
    description: "First stock price checked!",
    color: "from-green-500 to-teal-500",
    bgColor: "bg-green-500/20",
  },
};

export function AchievementBadge({ type, onComplete }: AchievementBadgeProps) {
  const [isAnimating, setIsAnimating] = useState(true);
  const achievement = ACHIEVEMENT_DATA[type];
  const Icon = achievement.icon;

  useEffect(() => {
    // Animation completes after 2 seconds
    const timer = setTimeout(() => {
      setIsAnimating(false);
      onComplete?.();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Backdrop with fade in/out */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Achievement Card with 3D Flip Animation */}
      <div
        className={`relative transition-all duration-500 ${
          isAnimating ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
        style={{
          perspective: "1000px",
        }}
      >
        <Card
          className={`relative w-80 h-80 border-2 ${achievement.bgColor} backdrop-blur-xl overflow-hidden`}
          style={{
            transformStyle: "preserve-3d",
            animation: isAnimating ? "flip360 2s ease-in-out" : "none",
          }}
        >
          {/* Particle effects background */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center p-8 text-center space-y-6">
            {/* Icon with glow */}
            <div className="relative">
              <div
                className={`absolute inset-0 bg-gradient-to-r ${achievement.color} opacity-50 blur-3xl rounded-full scale-150`}
              />
              <div
                className={`relative w-32 h-32 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center shadow-2xl`}
              >
                <Icon className="w-16 h-16 text-white" strokeWidth={2.5} />
              </div>
            </div>

            {/* Text */}
            <div className="space-y-2">
              <h3
                className={`text-3xl font-black bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent`}
              >
                {achievement.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {achievement.description}
              </p>
            </div>

            {/* Achievement Unlocked Badge */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2">
              <div className="px-4 py-1.5 rounded-full bg-foreground/10 backdrop-blur-sm border border-foreground/20">
                <p className="text-xs font-semibold tracking-wider uppercase">
                  Achievement Unlocked
                </p>
              </div>
            </div>
          </div>

          {/* Shine effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              animation: isAnimating ? "shine 2s ease-in-out" : "none",
            }}
          />
        </Card>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes flip360 {
          0% {
            transform: rotateY(0deg) scale(0.8);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          50% {
            transform: rotateY(180deg) scale(1.1);
          }
          100% {
            transform: rotateY(360deg) scale(1);
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
            opacity: 0;
          }
          50% {
            transform: translateY(-20px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
