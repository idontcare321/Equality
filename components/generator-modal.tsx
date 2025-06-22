"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, BarChart3, TrendingUp, Settings } from "lucide-react"

interface GeneratorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GeneratorModal({ open, onOpenChange }: GeneratorModalProps) {
  const options = [
    {
      title: "Wave Analytics",
      description: "Generate advanced wave-based analytics charts",
      icon: BarChart3,
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Trend Predictor",
      description: "AI-powered trend prediction and forecasting",
      icon: TrendingUp,
      color: "from-blue-500 to-purple-600",
    },
    {
      title: "Performance Boost",
      description: "Optimize and enhance system performance",
      icon: Zap,
      color: "from-purple-600 to-pink-600",
    },
    {
      title: "Custom Config",
      description: "Create custom dashboard configurations",
      icon: Settings,
      color: "from-indigo-500 to-purple-700",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-purple-900/30 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            SCRP Generator Options
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {options.map((option, index) => (
            <Card
              key={index}
              className="bg-gray-800/50 border-purple-900/30 hover:bg-gray-800/70 transition-all duration-300 cursor-pointer group"
            >
              <CardHeader className="pb-3">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-r ${option.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
                >
                  <option.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg text-white">{option.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm mb-4">{option.description}</p>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white border-0"
                  onClick={() => onOpenChange(false)}
                >
                  Generate
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
