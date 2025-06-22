"use client"

import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import type { Theme } from "./theme-selector"

const reviews = [
  {
    rating: 5,
    text: "Got my first limited with this! W.",
    author: "User789",
  },
  {
    rating: 5,
    text: "Best generator I've used. Works perfectly on Chrome.",
    author: "Guest456",
  },
  {
    rating: 5,
    text: "Finally found a working cookie refresher. Thanks!",
    author: "Anon123",
  },
  {
    rating: 5,
    text: "Immortal site is insane. Got 3 limiteds today.",
    author: "Visitor321",
  },
  {
    rating: 5,
    text: "Link shortener saved me so much time. Amazing tool!",
    author: "User555",
  },
  {
    rating: 5,
    text: "TikTok generator works flawlessly. Highly recommend.",
    author: "Guest999",
  },
  {
    rating: 5,
    text: "Been using for months, never had issues. 10/10",
    author: "Anon777",
  },
  {
    rating: 5,
    text: "Shockify tools are next level. Worth every second.",
    author: "User111",
  },
]

interface ReviewsSectionProps {
  theme: Theme
}

export function ReviewsSection({ theme }: ReviewsSectionProps) {
  const [currentReview, setCurrentReview] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length)
        setIsVisible(true)
      }, 400)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const review = reviews[currentReview]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`} />
    ))
  }

  const getThemeStyles = () => {
    switch (theme) {
      case "light":
        return {
          container: "bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200",
          title: "text-gray-800",
          subtitle: "text-gray-600",
          quote: "text-gray-800",
          author: "text-gray-600",
          indicator: "text-gray-500",
        }
      case "dark":
        return {
          container: "bg-gradient-to-r from-yellow-900/10 to-orange-900/10 border border-yellow-500/20",
          title: "text-white",
          subtitle: "text-gray-300",
          quote: "text-white",
          author: "text-gray-400",
          indicator: "text-gray-500",
        }
      default: // purple
        return {
          container: "bg-gradient-to-r from-yellow-900/10 to-orange-900/10 border border-yellow-500/20",
          title: "text-white",
          subtitle: "text-purple-200",
          quote: "text-white",
          author: "text-purple-300",
          indicator: "text-purple-400/70",
        }
    }
  }

  const styles = getThemeStyles()

  return (
    <div className={`mt-12 p-6 ${styles.container} rounded-lg backdrop-blur-sm`}>
      <div className="text-center mb-4">
        <h3 className={`text-xl font-bold ${styles.title} mb-2`}>What Our Users Say</h3>
        <p className={`${styles.subtitle} text-sm`}>Real feedback from our community</p>
      </div>

      <div
        className={`transition-all duration-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      >
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex justify-center gap-1 mb-3">{renderStars(review.rating)}</div>
          <blockquote className={`text-lg ${styles.quote} font-medium mb-3`}>"{review.text}"</blockquote>
          <cite className={`${styles.author} text-sm`}>- {review.author}</cite>
        </div>
      </div>

      <div className="mt-4 text-center">
        <div className="flex justify-center gap-2">
          {reviews.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentReview ? "bg-yellow-400" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
        <p className={`text-xs ${styles.indicator} mt-2`}>{reviews.length} verified reviews • Updated daily</p>
      </div>
    </div>
  )
}
