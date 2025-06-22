"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

export function StatsGrid() {
  const additionalStats = [
    { label: "Active Users", value: "3,247", change: "+127", trend: "up" },
    { label: "Bounce Rate", value: "23.4%", change: "-2.1%", trend: "down" },
    { label: "Page Views", value: "45.2K", change: "+5.8K", trend: "up" },
    { label: "Session Duration", value: "4m 32s", change: "+45s", trend: "up" },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {additionalStats.map((stat, index) => (
        <Card key={index} className="bg-gray-900/30 border-purple-900/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-gray-400">{stat.label}</div>
              <div className={`flex items-center text-xs ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {stat.change}
              </div>
            </div>
            <div className="text-xl font-bold text-white">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
