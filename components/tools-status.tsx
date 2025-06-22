"use client"

import { useState, useEffect } from "react"
import type { Theme } from "./theme-selector"

interface ToolStatus {
  name: string
  status: "online" | "offline" | "maintenance"
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
        // 2% chance every 10 seconds
        setTools((prev) =>
          prev.map((tool) => {
            if (Math.random() < 0.1) {
              // 10% chance for each tool
              const statuses: ToolStatus["status"][] = ["online", "maintenance"]
              const newStatus = statuses[Math.random() > 0.8 ? 1 : 0] // 80% chance to be online
              return {
                ...tool,
                status: newStatus,
                emoji: newStatus === "online" ? "🟢" : newStatus === "maintenance" ? "🟡" : "🔴",
              }
            }
            return tool
          }),
        )
      }
    }, 10000) // Check every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const getThemeStyles = () => {
    switch (theme) {
      case "light":
        return {
          container: "bg-gray-50 border border-gray-200",
          title: "text-gray-800",
          statusText: "text-gray-700",
          lastUpdated: "text-gray-500",
        }
      case "dark":
        return {
          container: "bg-gray-900/50 border border-gray-700",
          title: "text-white",
          statusText: "text-gray-300",
          lastUpdated: "text-gray-500",
        }
      default: // purple
        return {
          container: "bg-purple-900/20 border border-purple-500/30",
          title: "text-purple-200",
          statusText: "text-purple-100",
          lastUpdated: "text-purple-400/70",
        }
    }
  }

  const styles = getThemeStyles()

  return (
    <div className={`mt-4 p-4 ${styles.container} rounded-lg backdrop-blur-sm`}>
      <div className="text-center mb-3">
        <h4 className={`text-sm font-semibold ${styles.title} mb-2`}>Tools Status</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {tools.map((tool, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className={`text-sm ${styles.statusText}`}>{tool.name}:</span>
            <div className="flex items-center gap-1">
              <span className={`text-sm font-medium ${styles.statusText}`}>
                {tool.status === "online" ? "Online" : tool.status === "maintenance" ? "Maintenance" : "Offline"}
              </span>
              <span className="text-sm">{tool.emoji}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-3">
        <p className={`text-xs ${styles.lastUpdated}`}>
          Last updated: {new Date().toLocaleTimeString()} • Auto-refreshed
        </p>
      </div>
    </div>
  )
}
