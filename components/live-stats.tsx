"use client"

import { useState, useEffect } from "react"
import { Zap, Link, Shield, Cookie, Eye, Cpu } from "lucide-react"
import type { Theme } from "./theme-selector"

const activities = [
  { user: "User123", action: "generated TikTok cookies", icon: Cookie, emoji: "✅" },
  { user: "Guest456", action: "shortened a link", icon: Link, emoji: "🔗" },
  { user: "Anon678", action: "viewed Immortal Tutorial", icon: Shield, emoji: "🛡️" },
  { user: "Visitor789", action: "accessed Main Site", icon: Zap, emoji: "⚡" },
  { user: "User321", action: "refreshed cookies", icon: Cookie, emoji: "🔄" },
  { user: "Guest987", action: "watched Backup Tutorial", icon: Eye, emoji: "👁️" },
  { user: "Anon555", action: "used Shockify tools", icon: Cpu, emoji: "💻" },
  { user: "User777", action: "joined Discord", icon: Zap, emoji: "💬" },
  { user: "Guest111", action: "generated Chrome cookies", icon: Cookie, emoji: "🌐" },
  { user: "Visitor222", action: "viewed Main Tutorial", icon: Eye, emoji: "📺" },
]

interface LiveStatsProps {
  theme: Theme
}

export function LiveStats({ theme }: LiveStatsProps) {
  const [currentActivity, setCurrentActivity] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentActivity((prev) => (prev + 1) % activities.length)
        setIsVisible(true)
      }, 300)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const activity = activities[currentActivity]

  const getThemeStyles = () => {
    switch (theme) {
      case "light":
        return {
          container: "bg-gradient-to-r from-gray-100 to-blue-50 border border-gray-200",
          title: "text-gray-800",
          text: "text-gray-600",
          username: "text-blue-600 font-medium",
          subtitle: "text-gray-500",
        }
      case "dark":
        return {
          container: "bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-gray-700",
          title: "text-white",
          text: "text-gray-300",
          username: "text-blue-400 font-medium",
          subtitle: "text-gray-500",
        }
      default: // purple
        return {
          container: "bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30",
          title: "text-purple-300",
          text: "text-gray-300",
          username: "text-purple-200 font-medium",
          subtitle: "text-purple-400/70",
        }
      case "neon":
        return {
          container: "bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30",
          title: "text-cyan-300",
          text: "text-gray-300",
          username: "text-cyan-200 font-medium",
          subtitle: "text-cyan-400/70",
        }
    }
  }

  const styles = getThemeStyles()

  return (
    <div className={`mt-8 p-4 ${styles.container} rounded-lg backdrop-blur-sm`}>
      <div className="flex items-center gap-2 mb-3">
        <Zap
          className={`w-4 h-4 ${
            theme === "light" ? "text-blue-500" : theme === "neon" ? "text-cyan-400" : "text-purple-400"
          }`}
        />
        <h3 className={`text-sm font-semibold ${styles.title}`}>Recent Activity</h3>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
      </div>

      <div
        className={`transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
      >
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className={styles.username}>[{activity.user}]</span>
            <span className={styles.text}>{activity.action}</span>
            <span className="text-lg">{activity.emoji}</span>
          </div>
        </div>
      </div>

      <div className={`mt-2 text-xs ${styles.subtitle}`}>Live updates • {activities.length} recent activities</div>
    </div>
  )
}
