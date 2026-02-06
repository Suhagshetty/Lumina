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

export type AchievementType =
  | "first_chat"
  | "milestone_10"
  | "all_tools"
  | "weather"
  | "f1"
  | "stock";

interface AchievementBadgeProps {
  type: AchievementType;
  onComplete: () => void;
}

const ACHIEVEMENT_DATA = {
  first_chat: {
    icon: MessageSquare,
    title: "First Conversation",
    description: "You've started your journey!",
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
    description: "You've used all tools!",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/20",
  },
  weather: {
    icon: Cloud,
    title: "Weather Watcher",
    description: "First weather check!",
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
} as const;

export default function AchievementBadge({
  type,
  onComplete,
}: AchievementBadgeProps) {
  const [visible, setVisible] = useState(true);
  const achievement = ACHIEVEMENT_DATA[type];
  const Icon = achievement.icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

      <Card
        className={`relative w-80 h-80 border-2 ${achievement.bgColor} backdrop-blur-xl animate-pop`}
      >
        <div className="relative h-full flex flex-col items-center justify-center p-8 text-center space-y-6">
          <div className="relative">
            <div
              className={`absolute inset-0 bg-gradient-to-r ${achievement.color} blur-3xl opacity-50 rounded-full scale-150`}
            />
            <div
              className={`relative w-28 h-28 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center shadow-2xl`}
            >
              <Icon className="w-14 h-14 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <h3
              className={`text-2xl font-extrabold bg-gradient-to-r ${achievement.color} bg-clip-text text-transparent`}
            >
              {achievement.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {achievement.description}
            </p>
          </div>

          <div className="absolute top-6 left-1/2 -translate-x-1/2">
            <div className="px-4 py-1.5 rounded-full bg-foreground/10 border border-foreground/20">
              <p className="text-xs font-semibold uppercase tracking-wide">
                Achievement Unlocked
              </p>
            </div>
          </div>
        </div>
      </Card>

      <style jsx>{`
        @keyframes pop {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-pop {
          animation: pop 0.35s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
