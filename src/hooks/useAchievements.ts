"use client";

import { useEffect, useState } from "react";

export type AchievementType =
  | "first_chat"
  | "milestone_10"
  | "all_tools"
  | "weather"
  | "f1"
  | "stock";

interface AchievementState {
  firstChat: boolean;
  milestone10: boolean;
  allTools: boolean;
  weatherUsed: boolean;
  f1Used: boolean;
  stockUsed: boolean;
}

const STORAGE_KEY = "lumina_achievements";

export function useAchievements() {
  const [achievements, setAchievements] = useState<AchievementState>({
    firstChat: false,
    milestone10: false,
    allTools: false,
    weatherUsed: false,
    f1Used: false,
    stockUsed: false,
  });

  const [pendingAchievement, setPendingAchievement] =
    useState<AchievementType | null>(null);

  // Load achievements from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setAchievements(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse achievements:", e);
      }
    }
  }, []);

  // Save achievements to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(achievements));
  }, [achievements]);

  const unlockAchievement = (type: AchievementType) => {
    const achievementMap: Record<AchievementType, keyof AchievementState> = {
      first_chat: "firstChat",
      milestone_10: "milestone10",
      all_tools: "allTools",
      weather: "weatherUsed",
      f1: "f1Used",
      stock: "stockUsed",
    };

    const key = achievementMap[type];

    // Only show animation if achievement is newly unlocked
    if (!achievements[key]) {
      setPendingAchievement(type);
      setAchievements((prev) => ({ ...prev, [key]: true }));
    }
  };

  const clearPendingAchievement = () => {
    setPendingAchievement(null);
  };

  // Check if all tools have been used
  const checkAllToolsUnlocked = () => {
    if (
      achievements.weatherUsed &&
      achievements.f1Used &&
      achievements.stockUsed &&
      !achievements.allTools
    ) {
      unlockAchievement("all_tools");
    }
  };

  return {
    achievements,
    pendingAchievement,
    unlockAchievement,
    clearPendingAchievement,
    checkAllToolsUnlocked,
  };
}
