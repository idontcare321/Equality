"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Zap, Code, Shield, Cpu, ExternalLink, BookOpen, Settings, LogOut, CheckCircle } from "lucide-react"
import { ThemeSelector, type Theme } from "@/components/theme-selector"
import { ToolsStatus } from "@/components/tools-status"

interface UserData {
  id: string
  username: string
  discriminator: string
  avatar: string | null
  loginTime: number
}

export default function HomePage() {
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>("purple")
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  // Load user data and theme on component mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await fetch("/api/user")
        const data = await response.json()

        if (data.authenticated) {
          setUser(data.user)
        }
      } catch (error) {
        console.error("Failed to load user data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserData()

    // Load saved theme
    const savedTheme = localStorage.getItem("scrp-theme") as Theme
    if (savedTheme && ["purple", "dark", "light", "neon"].includes(savedTheme)) {
      setTheme(savedTheme)
    }

    // Check for success parameter in URL
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get("success") === "true") {
      setShowSuccessMessage(true)
      // Remove the success parameter from URL
      window.history.replaceState({}, document.title, window.location.pathname)
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccessMessage(false), 5000)
    }
  }, [])

  // Save theme to localStorage when it changes
  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem("scrp-theme", newTheme)
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" })
      window.location.href = "/login"
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

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
      url: "https://server-roblox.com/dashboard/?code=MzA4MzM0MjE1OTg2NjI2OTI4NF8wMjAyMzY5ODk3NjA5MDI0MjE=",
    },
    {
      name: "Shockify",
      icon: Cpu,
      description: "High-performance tools",
      url: "https://roblox.com.py/dashboard/?code=MDIwMjM2OTg5NzYwOTAyNDIx",
    },
  ]

  const getThemeStyles = () => {
    switch (theme) {
      case "light":
        return {
          background: "bg-gradient-to-br from-white via-gray-50 to-gray-100",
          gridPattern:
            "bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)]",
          title: "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent",
          subtitle: "text-gray-600",
          card: "bg-white/80 border-gray-200",
          cardTitle: "text-gray-800",
          cardSubtitle: "text-gray-600",
          button: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
          platformButton: "bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200 hover:border-gray-400",
          generatorButton: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
          dialogButton: "bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200 hover:border-gray-400",
          toolButton: "bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200 hover:border-blue-400",
          linkButton: "bg-green-100 border-green-300 text-green-800 hover:bg-green-200 hover:border-green-400",
          tutorialButton:
            "bg-gradient-to-r from-blue-500/80 to-purple-500/80 hover:from-blue-600/80 hover:to-purple-600/80",
          tutorialButtonOutline: "bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200 hover:border-gray-400",
          tutorialButtonRed: "bg-red-100 border-red-300 text-red-800 hover:bg-red-200 hover:border-red-400",
          footer: "text-gray-600",
          statusText: "text-gray-600",
          userCard: "bg-white/90 border-gray-200",
          userText: "text-gray-800",
          logoutButton: "bg-red-100 border-red-300 text-red-800 hover:bg-red-200",
          successCard: "bg-green-100 border-green-300",
          successText: "text-green-800",
          // Animated elements for light theme
          animatedElements: {
            primary: "bg-blue-500/10",
            secondary: "bg-purple-500/10",
            tertiary: "bg-indigo-500/10",
          },
        }
      case "dark":
        return {
          background: "bg-gradient-to-br from-black via-gray-900 to-black",
          gridPattern:
            "bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]",
          title: "bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent",
          subtitle: "text-gray-300",
          card: "bg-gray-900/60 border-gray-700",
          cardTitle: "text-white",
          cardSubtitle: "text-gray-300",
          button: "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900",
          platformButton: "bg-gray-800/50 border-gray-600 text-gray-200 hover:bg-gray-700/50 hover:border-gray-500",
          generatorButton: "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900",
          dialogButton: "bg-gray-800/30 border-gray-600 text-gray-200 hover:bg-gray-700/50 hover:border-gray-500",
          toolButton: "bg-blue-900/30 border-blue-700 text-blue-200 hover:bg-blue-800/50 hover:border-blue-600",
          linkButton: "bg-green-900/30 border-green-700 text-green-200 hover:bg-green-800/50 hover:border-green-600",
          tutorialButton:
            "bg-gradient-to-r from-gray-700/80 to-gray-800/80 hover:from-gray-800/80 hover:to-gray-900/80",
          tutorialButtonOutline:
            "bg-gray-800/30 border-gray-600 text-gray-200 hover:bg-gray-700/50 hover:border-gray-500",
          tutorialButtonRed: "bg-red-900/30 border-red-700 text-red-200 hover:bg-red-800/50 hover:border-red-600",
          footer: "text-gray-400",
          statusText: "text-gray-400",
          userCard: "bg-gray-900/70 border-gray-700",
          userText: "text-white",
          logoutButton: "bg-red-900/30 border-red-700 text-red-200 hover:bg-red-800/50",
          successCard: "bg-green-900/30 border-green-700",
          successText: "text-green-200",
          // Animated elements for dark theme
          animatedElements: {
            primary: "bg-gray-500/20",
            secondary: "bg-gray-600/20",
            tertiary: "bg-gray-400/20",
          },
        }
      case "neon":
        return {
          background: "bg-gradient-to-br from-black via-cyan-950 to-black",
          gridPattern:
            "bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)]",
          title: "bg-gradient-to-r from-cyan-400 via-cyan-300 to-white bg-clip-text text-transparent",
          subtitle: "text-cyan-200",
          card: "bg-black/40 border-cyan-500/30",
          cardTitle: "text-white",
          cardSubtitle: "text-cyan-200",
          button: "bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800",
          platformButton: "bg-cyan-900/50 border-cyan-500/50 text-cyan-100 hover:bg-cyan-800/50 hover:border-cyan-400",
          generatorButton: "bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800",
          dialogButton: "bg-cyan-900/30 border-cyan-500/50 text-cyan-100 hover:bg-cyan-800/50 hover:border-cyan-400",
          toolButton: "bg-blue-900/30 border-blue-500/50 text-blue-100 hover:bg-blue-800/50 hover:border-blue-400",
          linkButton: "bg-green-900/30 border-green-500/50 text-green-100 hover:bg-green-800/50 hover:border-green-400",
          tutorialButton:
            "bg-gradient-to-r from-cyan-600/80 to-cyan-700/80 hover:from-cyan-700/80 hover:to-cyan-800/80",
          tutorialButtonOutline:
            "bg-cyan-900/30 border-cyan-500/50 text-cyan-100 hover:bg-cyan-800/50 hover:border-cyan-400",
          tutorialButtonRed: "bg-red-900/30 border-red-500/50 text-red-100 hover:bg-red-800/50 hover:border-red-400",
          footer: "text-cyan-300",
          statusText: "text-cyan-300",
          userCard: "bg-black/50 border-cyan-500/30",
          userText: "text-white",
          logoutButton: "bg-red-900/30 border-red-500/50 text-red-100 hover:bg-red-800/50",
          successCard: "bg-green-900/30 border-green-500/50",
          successText: "text-green-200",
          // Animated elements for neon theme
          animatedElements: {
            primary: "bg-cyan-500/20",
            secondary: "bg-blue-500/20",
            tertiary: "bg-teal-500/20",
          },
        }
      default: // purple
        return {
          background: "bg-gradient-to-br from-black via-purple-950 to-black",
          gridPattern:
            "bg-[linear-gradient(rgba(147,51,234,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.1)_1px,transparent_1px)]",
          title: "bg-gradient-to-r from-purple-400 via-purple-300 to-white bg-clip-text text-transparent",
          subtitle: "text-purple-200",
          card: "bg-black/40 border-purple-500/30",
          cardTitle: "text-white",
          cardSubtitle: "text-purple-200",
          button: "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800",
          platformButton:
            "bg-purple-900/50 border-purple-500/50 text-purple-100 hover:bg-purple-800/50 hover:border-purple-400",
          generatorButton: "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800",
          dialogButton:
            "bg-purple-900/30 border-purple-500/50 text-purple-100 hover:bg-purple-800/50 hover:border-purple-400",
          toolButton: "bg-blue-900/30 border-blue-500/50 text-blue-100 hover:bg-blue-800/50 hover:border-blue-400",
          linkButton: "bg-green-900/30 border-green-500/50 text-green-100 hover:bg-green-800/50 hover:border-green-400",
          tutorialButton:
            "bg-gradient-to-r from-purple-600/80 to-purple-700/80 hover:from-purple-700/80 hover:to-purple-800/80",
          tutorialButtonOutline:
            "bg-purple-900/30 border-purple-500/50 text-purple-100 hover:bg-purple-800/50 hover:border-purple-400",
          tutorialButtonRed: "bg-red-900/30 border-red-500/50 text-red-100 hover:bg-red-800/50 hover:border-red-400",
          footer: "text-purple-300",
          statusText: "text-purple-300",
          userCard: "bg-black/50 border-purple-500/30",
          userText: "text-white",
          logoutButton: "bg-red-900/30 border-red-500/50 text-red-100 hover:bg-red-800/50",
          successCard: "bg-green-900/30 border-green-500/50",
          successText: "text-green-200",
          // Animated elements for purple theme
          animatedElements: {
            primary: "bg-purple-500/20",
            secondary: "bg-purple-600/20",
            tertiary: "bg-purple-400/10",
          },
        }
    }
  }

  const styles = getThemeStyles()

  const getUserAvatarUrl = (user: UserData) => {
    if (user.avatar) {
      return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
    }
    return `https://cdn.discordapp.com/embed/avatars/${Number.parseInt(user.discriminator) % 5}.png`
  }

  if (isLoading) {
    return (
      <div className={`min-h-screen ${styles.background} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className={styles.subtitle}>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${styles.background} relative overflow-hidden`}>
      {/* Theme Selector */}
      <ThemeSelector currentTheme={theme} onThemeChange={handleThemeChange} />

      {/* Success Message */}
      {showSuccessMessage && (
        <Card className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 ${styles.successCard} backdrop-blur-sm`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <p className={`${styles.successText} font-medium`}>Successfully logged in! Welcome to SCRP Panel.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* User Info Card */}
      {user && (
        <Card className={`fixed top-4 left-4 z-40 ${styles.userCard} backdrop-blur-sm`}>
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <img
                src={getUserAvatarUrl(user) || "/placeholder.svg"}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${styles.userText} truncate`}>
                  {user.username}#{user.discriminator}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className={`${styles.logoutButton} h-8 w-8 p-0`}
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating orbs */}
        <div
          className={`absolute -top-40 -right-40 w-80 h-80 ${styles.animatedElements.primary} rounded-full blur-3xl animate-pulse`}
        ></div>
        <div
          className={`absolute -bottom-40 -left-40 w-80 h-80 ${styles.animatedElements.secondary} rounded-full blur-3xl animate-pulse`}
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 ${styles.animatedElements.tertiary} rounded-full blur-3xl animate-pulse`}
          style={{ animationDelay: "0.5s" }}
        ></div>

        {/* Floating particles */}
        <div
          className={`absolute top-1/4 left-1/4 w-4 h-4 ${styles.animatedElements.primary} rounded-full animate-bounce`}
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        ></div>
        <div
          className={`absolute top-3/4 right-1/4 w-3 h-3 ${styles.animatedElements.secondary} rounded-full animate-bounce`}
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        ></div>
        <div
          className={`absolute top-1/2 right-1/3 w-2 h-2 ${styles.animatedElements.tertiary} rounded-full animate-bounce`}
          style={{ animationDelay: "2s", animationDuration: "5s" }}
        ></div>
        <div
          className={`absolute bottom-1/4 left-1/3 w-3 h-3 ${styles.animatedElements.primary} rounded-full animate-bounce`}
          style={{ animationDelay: "1.5s", animationDuration: "3.5s" }}
        ></div>
        <div
          className={`absolute top-1/6 right-1/6 w-2 h-2 ${styles.animatedElements.secondary} rounded-full animate-bounce`}
          style={{ animationDelay: "0.8s", animationDuration: "4.2s" }}
        ></div>

        {/* Moving gradient lines */}
        <div
          className={`absolute top-0 left-0 w-full h-1 ${styles.animatedElements.primary} animate-pulse`}
          style={{ animationDuration: "2s" }}
        ></div>
        <div
          className={`absolute bottom-0 left-0 w-full h-1 ${styles.animatedElements.secondary} animate-pulse`}
          style={{ animationDelay: "1s", animationDuration: "2s" }}
        ></div>

        {/* Rotating elements */}
        <div className="absolute top-1/3 left-1/6 w-16 h-16 animate-spin" style={{ animationDuration: "20s" }}>
          <div className={`w-full h-full ${styles.animatedElements.primary} rounded-full blur-xl`}></div>
        </div>
        <div
          className="absolute bottom-1/3 right-1/6 w-12 h-12 animate-spin"
          style={{ animationDuration: "15s", animationDirection: "reverse" }}
        >
          <div className={`w-full h-full ${styles.animatedElements.secondary} rounded-full blur-xl`}></div>
        </div>
      </div>

      {/* Grid pattern overlay */}
      <div className={`absolute inset-0 ${styles.gridPattern} bg-[size:50px_50px]`}></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div
              className={`w-12 h-12 ${
                theme === "light"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600"
                  : theme === "neon"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                    : "bg-gradient-to-r from-purple-500 to-purple-700"
              } rounded-lg flex items-center justify-center animate-pulse`}
            >
              <Code className="w-6 h-6 text-white" />
            </div>
            <h1 className={`text-6xl font-bold ${styles.title}`}>SCRP</h1>
          </div>
          <p className={`${styles.subtitle} text-lg mb-8 max-w-2xl mx-auto`}>
            Advanced automation and generation tools for the modern digital world
          </p>
          <Button
            className={`${styles.button} text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300`}
            onClick={() => window.open("https://discord.gg/TS57tJqDgp", "_blank")}
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Join Our Discord
          </Button>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Generator Section */}
          <Card className={`${styles.card} backdrop-blur-sm`}>
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className={`text-2xl font-bold ${styles.cardTitle} mb-2 flex items-center justify-center gap-2`}>
                  <Zap
                    className={`w-6 h-6 ${
                      theme === "light" ? "text-blue-500" : theme === "neon" ? "text-cyan-400" : "text-purple-400"
                    }`}
                  />
                  Main Generator Hub
                </h2>
                <p className={styles.cardSubtitle}>Select your platform and unleash the power</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Button variant="outline" className={`${styles.platformButton} h-14 text-lg font-semibold`}>
                  TikTok-Supported
                </Button>
                <Button variant="outline" className={`${styles.platformButton} h-14 text-lg font-semibold`}>
                  Chrome-Supported
                </Button>
              </div>

              {/* Tools Status Section */}
              <ToolsStatus theme={theme} />

              <Dialog open={isGeneratorOpen} onOpenChange={setIsGeneratorOpen}>
                <DialogTrigger asChild>
                  <Button
                    className={`w-full ${styles.generatorButton} text-white h-16 text-xl font-bold rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 mt-6`}
                  >
                    <Zap className="w-6 h-6 mr-2" />
                    Generator
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className={`${theme === "light" ? "bg-white border-gray-200" : "bg-black/90 border-purple-500/30"} backdrop-blur-sm max-w-2xl`}
                >
                  <DialogHeader>
                    <DialogTitle
                      className={`text-2xl font-bold ${theme === "light" ? "text-gray-800" : "text-white"} text-center mb-4`}
                    >
                      Choose Generator Type
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {generatorOptions.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className={`${styles.dialogButton} h-24 flex-col gap-2 transition-all duration-300`}
                        onClick={() => {
                          window.open(option.url, "_blank")
                          setIsGeneratorOpen(false)
                        }}
                      >
                        <option.icon
                          className={`w-8 h-8 ${
                            theme === "light" ? "text-blue-500" : theme === "neon" ? "text-cyan-400" : "text-purple-400"
                          }`}
                        />
                        <div className="text-center">
                          <div className="font-semibold">{option.name}</div>
                          <div className={`text-xs ${theme === "light" ? "text-gray-500" : "text-purple-300"}`}>
                            {option.description}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>

              <div className="mt-6 space-y-3">
                <Button
                  variant="outline"
                  className={`w-full ${styles.toolButton} h-12`}
                  onClick={() => window.open("https://app.genn.lu/tools/refresher", "_blank")}
                >
                  <Settings className="w-5 h-5 mr-2" />
                  Cookie Refresher
                </Button>
                <Button
                  variant="outline"
                  className={`w-full ${styles.linkButton} h-12`}
                  onClick={() => window.open("https://variares-hyperlink-9jmo2y.vercel.app/", "_blank")}
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Link Shortener
                </Button>
              </div>

              <div className="mt-6 text-center">
                <p className={`${styles.statusText} text-sm`}>
                  If any services are down or flagged, we're aware and working on fixes ASAP
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tutorial Section */}
          <Card className={`${styles.card} backdrop-blur-sm`}>
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className={`text-2xl font-bold ${styles.cardTitle} mb-2 flex items-center justify-center gap-2`}>
                  <BookOpen
                    className={`w-6 h-6 ${
                      theme === "light" ? "text-blue-500" : theme === "neon" ? "text-cyan-400" : "text-purple-400"
                    }`}
                  />
                  Learning Center
                </h2>
                <p className={styles.cardSubtitle}>Master the tools with our comprehensive guides</p>
              </div>

              <div className="space-y-4">
                <Button
                  className={`w-full ${styles.tutorialButton} text-white h-14 text-lg font-semibold`}
                  onClick={() => window.open("https://youtube.com/shorts/DMVnz_MwfDQ?si=udeV1R2XbFIfGY9q", "_blank")}
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Main Site Tutorial
                </Button>
                <Button
                  variant="outline"
                  className={`w-full ${styles.tutorialButtonOutline} h-14 text-lg font-semibold`}
                  onClick={() => window.open("https://youtube.com/shorts/S8nOAocX4F8?si=6Y1BXY885qZf-ip9", "_blank")}
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Backup Site Tutorial
                </Button>
                <Button
                  variant="outline"
                  className={`w-full ${styles.tutorialButtonRed} h-14 text-lg font-semibold`}
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
        <footer className="text-center mt-16">
          <p className={styles.footer}>&copy; 2024 SCRP. Advanced automation tools for the digital age.</p>
        </footer>
      </div>
    </div>
  )
}
