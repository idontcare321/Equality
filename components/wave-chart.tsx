"use client"

import { useEffect, useRef } from "react"

interface WaveChartProps {
  data: number[]
  color?: string
  height?: number
}

export function WaveChart({ data, color = "rgb(147, 51, 234)", height = 60 }: WaveChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    ctx.scale(dpr, dpr)

    const width = rect.width
    const canvasHeight = rect.height

    // Clear canvas
    ctx.clearRect(0, 0, width, canvasHeight)

    if (data.length === 0) return

    // Normalize data
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1

    const normalizedData = data.map((value) => (value - min) / range)

    // Create wave path
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    const stepX = width / (data.length - 1)

    for (let i = 0; i < normalizedData.length; i++) {
      const x = i * stepX
      const y = canvasHeight - normalizedData[i] * (canvasHeight - 20) - 10

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        // Create smooth curves between points
        const prevX = (i - 1) * stepX
        const prevY = canvasHeight - normalizedData[i - 1] * (canvasHeight - 20) - 10
        const cpX = (prevX + x) / 2

        ctx.quadraticCurveTo(cpX, prevY, x, y)
      }
    }

    ctx.stroke()

    // Add glow effect
    ctx.shadowColor = color
    ctx.shadowBlur = 10
    ctx.stroke()
  }, [data, color, height])

  return <canvas ref={canvasRef} className="w-full h-full" style={{ height: `${height}px` }} />
}
