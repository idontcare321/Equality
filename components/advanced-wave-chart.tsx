"use client"

import { useEffect, useRef } from "react"

interface AdvancedWaveChartProps {
  data: number[]
  color?: string
  height?: number
  showFill?: boolean
}

export function AdvancedWaveChart({
  data,
  color = "rgb(147, 51, 234)",
  height = 200,
  showFill = true,
}: AdvancedWaveChartProps) {
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

    // Create grid pattern
    ctx.strokeStyle = "rgba(147, 51, 234, 0.1)"
    ctx.lineWidth = 1

    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = (width / 10) * i
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvasHeight)
      ctx.stroke()
    }

    // Horizontal grid lines
    for (let i = 0; i <= 6; i++) {
      const y = (canvasHeight / 6) * i
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Normalize data
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1

    const normalizedData = data.map((value) => (value - min) / range)

    // Create multiple wave layers for depth
    const layers = [
      { data: normalizedData, alpha: 0.8, offset: 0 },
      { data: normalizedData.map((v) => v * 0.7), alpha: 0.6, offset: 10 },
      { data: normalizedData.map((v) => v * 0.4), alpha: 0.4, offset: 20 },
    ]

    layers.forEach((layer, layerIndex) => {
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight)
      gradient.addColorStop(0, `rgba(147, 51, 234, ${layer.alpha})`)
      gradient.addColorStop(0.5, `rgba(168, 85, 247, ${layer.alpha * 0.6})`)
      gradient.addColorStop(1, `rgba(147, 51, 234, 0)`)

      // Create wave path
      ctx.beginPath()
      const stepX = width / (layer.data.length - 1)

      for (let i = 0; i < layer.data.length; i++) {
        const x = i * stepX
        const y = canvasHeight - layer.data[i] * (canvasHeight - layer.offset - 40) - 20

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          // Create smooth Bézier curves
          const prevX = (i - 1) * stepX
          const prevY = canvasHeight - layer.data[i - 1] * (canvasHeight - layer.offset - 40) - 20

          const cp1X = prevX + (x - prevX) * 0.5
          const cp1Y = prevY
          const cp2X = prevX + (x - prevX) * 0.5
          const cp2Y = y

          ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, x, y)
        }
      }

      if (showFill) {
        // Close the path for fill
        ctx.lineTo(width, canvasHeight)
        ctx.lineTo(0, canvasHeight)
        ctx.closePath()
        ctx.fillStyle = gradient
        ctx.fill()
      }

      // Stroke the wave
      ctx.strokeStyle = color
      ctx.lineWidth = 2 + layerIndex
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.stroke()

      // Add glow effect
      ctx.shadowColor = color
      ctx.shadowBlur = 15 - layerIndex * 3
      ctx.stroke()
      ctx.shadowBlur = 0
    })
  }, [data, color, height, showFill])

  return (
    <div className="relative w-full" style={{ height: `${height}px` }}>
      <canvas ref={canvasRef} className="w-full h-full" style={{ height: `${height}px` }} />
    </div>
  )
}
