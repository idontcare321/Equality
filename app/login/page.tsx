"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, ExternalLink, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check for error in URL params
    const urlParams = new URLSearchParams(window.location.search)
    const errorParam = urlParams.get("error")

    if (errorParam) {
      switch (errorParam) {
        case "missing_code":
          setError("Authorization code missing. Please try again.")
          break
        case "token_failed":
          setError("Failed to get Discord token. Please try again.")
          break
        case "user_failed":
          setError("Failed to get user information. Please try again.")
          break
        case "auth_failed":
          setError("Authentication failed. Please try again.")
          break
        default:
          setError("An error occurred during login. Please try again.")
      }
    }
  }, [])

  const discordOAuthUrl =
    "https://discord.com/api/oauth2/authorize?client_id=1388702262829781093&redirect_uri=https%3A%2F%2Fscrpsites.vercel.app%2Fapi%2Fcallback&response_type=code&scope=identify"

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-900/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-900/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            {/* Logo and title */}
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">SCRP Panel</h1>
              <p className="text-gray-400 text-sm">Secure access to your dashboard</p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-6 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              </div>
            )}

            {/* Discord login button */}
            <Button
              className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-[#5865F2]/25 flex items-center justify-center gap-3"
              onClick={() => (window.location.href = discordOAuthUrl)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Login with Discord
            </Button>

            {/* Footer text */}
            <p className="text-gray-500 text-xs mt-6">By logging in, you agree to our terms of service</p>
          </CardContent>
        </Card>

        {/* Back to main site link */}
        <div className="text-center mt-6">
          <Button
            variant="ghost"
            className="text-gray-400 hover:text-white text-sm"
            onClick={() => (window.location.href = "/")}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Back to SCRP
          </Button>
        </div>
      </div>
    </div>
  )
}
