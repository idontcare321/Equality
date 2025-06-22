"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, MousePointer, Users, TrendingUp, Zap, BarChart3, Settings, Menu } from "lucide-react"
import { AdvancedWaveChart } from "@/components/advanced-wave-chart"
import { GeneratorModal } from "@/components/generator-modal"
import { StatsGrid } from "@/components/stats-grid"

export default function Dashboard() {
  const [showGenerator, setShowGenerator] = useState(false)

  const metrics = [
    {
      title: "Total Accounts",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      data: [45, 52, 48, 61, 55, 67, 73, 68, 75, 82, 78, 85],
    },
    {
      title: "Total Visits",
      value: "23,854",
      change: "+8.3%",
      trend: "up",
      icon: Eye,
      data: [28, 35, 42, 38, 45, 52, 48, 55, 62, 58, 65, 72],
    },
    {
      title: "Total URL Clicks",
      value: "8,692",
      change: "+15.7%",
      trend: "up",
      icon: MousePointer,
      data: [15, 22, 18, 25, 32, 28, 35, 42, 38, 45, 52, 48],
    },
  ]

  const summaryData = [
    { label: "Revenue", value: "$47.2K", change: "+2.4K today" },
    { label: "Conversion", value: "3.24%", change: "+0.8% today" },
    { label: "Sessions", value: "12.8K", change: "+1.2K today" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-purple-900/10 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-purple-900/30 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-8 w-8 text-purple-400" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                  SCRP MODE
                </h1>
              </div>
              <Button
                variant="outline"
                className="bg-purple-900/30 border-purple-600 text-purple-300 hover:bg-purple-800/50 hover:text-purple-200"
              >
                PENTAHOOK MODE
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowGenerator(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white border-0"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Generator
              </Button>
              <Button variant="ghost" size="icon" className="text-purple-400 hover:text-purple-300">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-purple-400 hover:text-purple-300">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-purple-900/30 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-300 text-sm font-medium flex items-center">
                    <metric.icon className="h-4 w-4 mr-2 text-purple-400" />
                    {metric.title}
                  </CardTitle>
                  <div className="flex items-center text-xs text-gray-500">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {metric.change}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-3xl font-bold text-white">{metric.value}</div>
                  <div className="h-16">
                    <AdvancedWaveChart data={metric.data} color="rgb(147, 51, 234)" height={60} showFill={false} />
                  </div>
                  <div className="text-xs text-gray-500">+0 today • 0 Daily</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Grid */}
        <StatsGrid />

        {/* Summary Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="bg-gray-900/50 border-purple-900/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-purple-400">Analytics Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <AdvancedWaveChart
                    data={[25, 35, 28, 45, 38, 52, 48, 65, 58, 72, 68, 85, 78, 92, 88, 95, 90, 88, 85, 90]}
                    color="rgb(147, 51, 234)"
                    height={250}
                    showFill={true}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="text-xs text-gray-500 grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">94.2%</div>
                <div className="text-xs text-gray-500">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">2.3s</div>
                <div className="text-xs text-gray-500">Avg Load</div>
              </div>
            </div>

            {summaryData.map((item, index) => (
              <Card key={index} className="bg-gray-900/50 border-purple-900/30 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                  <div className="text-2xl font-bold text-white mb-1">{item.value}</div>
                  <div className="text-xs text-gray-500">{item.change}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Generator Modal */}
      <GeneratorModal open={showGenerator} onOpenChange={setShowGenerator} />
    </div>
  )
}
