"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Palette, Check } from "lucide-react"

export type Theme = "purple" | "dark" | "light"

interface ThemeSelectorProps {
  currentTheme: Theme
  onThemeChange: (theme: Theme) => void
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const themes = [
    { id: "purple" as Theme, name: "Default (Purple)", color: "bg-purple-500" },
    { id: "dark" as Theme, name: "Dark Mode (Black)", color: "bg-gray-900" },
    { id: "light" as Theme, name: "Light Mode (White)", color: "bg-white border border-gray-300" },
  ]

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/50 hover:bg-black/70 text-white border border-white/20 backdrop-blur-sm"
        size="sm"
      >
        <Palette className="w-4 h-4 mr-2" />
        Theme
      </Button>

      {isOpen && (
        <Card className="absolute top-12 right-0 w-64 bg-black/90 border-white/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Theme Selector
            </h3>
            <div className="space-y-2">
              {themes.map((theme) => (
                <Button
                  key={theme.id}
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-white/10"
                  onClick={() => {
                    onThemeChange(theme.id)
                    setIsOpen(false)
                  }}
                >
                  <div className={`w-4 h-4 rounded-full mr-3 ${theme.color}`}></div>
                  {theme.name}
                  {currentTheme === theme.id && <Check className="w-4 h-4 ml-auto" />}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
