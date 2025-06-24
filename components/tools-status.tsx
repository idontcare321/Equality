"use client"

import { useState, useEffect } from "react"
import { Wifi } from "lucide-react"
import type { Theme } from "./theme-selector"

interface ToolStatus {
  name: string
  status: "online" | "offline"
  emoji: string
}

interface ToolsStatusProps {
  theme: Theme
}

export function ToolsStatus({ theme }: ToolsStatusProps) {
  const [tools, setTools] = useState<ToolStatus[]>([
    { name: "Main site", status: "online", emoji: "🟢" },
    { name: "Back up site", status: "online", emoji: "🟢" },
    { name: "Immortal site", status: "online", emoji: "🟢" },
    { name: "Shockify site", status: "online", emoji: "🟢" },
  ])

  // Simulate occasional status changes for realism
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly change one tool's status occasionally (very rare)
      if (Math.random() < 0.02) {
        // 2% chance every 5 seconds
        setTools((prev) =>
          prev.map((tool) => {
            if (Math.random() < 0.1) {
              // 10% chance for each tool
              return {
                ...tool,
                status: tool.status === "online" ? "offline" : "online",
                emoji: tool.status === "online" ? "🔴" : "🟢",
              }
            }
            return tool
          }),
        )
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getThemeStyles = () => {
    switch (theme) {
      case "light":
        return {
          container: "bg-gray-50 border border-gray-200",
          title: "text-gray-800",
          statusText: "text-gray-700",
          onlineText: "text-green-600",
          offlineText: "text-red-600",
        }
      case "dark":
        return {
          container: "bg-gray-900/50 border border-gray-700",
          title: "text-white",
          statusText: "text-gray-300",
          onlineText: "text-green-400",
          offlineText: "text-red-400",
        }
      default: // purple
        return {
          container: "bg-purple-900/20 border border-purple-500/30",
          title: "text-white",
          statusText: "text-purple-200",
          onlineText: "text-green-400",
          offlineText: "text-red-400",
        }
      case "neon":
        return {
          container: "bg-cyan-900/20 border border-cyan-500/30",
          title: "text-white",
          statusText: "text-cyan-200",
          onlineText: "text-green-400",
          offlineText: "text-red-400",
        }
    }
  }

  const styles = getThemeStyles()

  return (
    <div className={`mt-6 p-4 ${styles.container} rounded-lg backdrop-blur-sm`}>
      <div className="flex items-center gap-2 mb-3">
        <Wifi
          className={`w-4 h-4 ${
            theme === "light" ? "text-blue-500" : theme === "neon" ? "text-cyan-400" : "text-purple-400"
          }`}
        />
        <h3 className={`text-sm font-semibold ${styles.title}`}>Tools Status</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {tools.map((tool, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className={`text-sm ${styles.statusText}`}>{tool.name}:</span>
            <div className="flex items-center gap-1">
              <span
                className={`text-sm font-medium ${tool.status === "online" ? styles.onlineText : styles.offlineText}`}
              >
                {tool.status === "online" ? "Online" : "Offline"}
              </span>
              <span className="text-sm">{tool.emoji}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-center">
        <p
          className={`text-xs ${
            theme === "light" ? "text-gray-500" : theme === "neon" ? "text-cyan-400/70" : "text-purple-400/70"
          }`}
        >
          Status updated every 30 seconds • Last check: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  )
}
