import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface ParticlesProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  color?: string
  size?: number
}

export function Particles({
  className,
  quantity = 30,
  staticity = 50,
  ease = 50,
  color = "#ffffff",
  size = 0.6,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const circles = useRef<any[]>([])
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d")
    }
    initCanvas()
    
    let animationId: number
    const render = () => {
      animate()
      animationId = requestAnimationFrame(render)
    }
    render()

    window.addEventListener("resize", initCanvas)
    return () => {
      window.removeEventListener("resize", initCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [color])

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect()
        const { clientX, clientY } = event
        const x = clientX - rect.left
        const y = clientY - rect.top
        mouse.current = { x, y }
      }
    }

    window.addEventListener("mousemove", onMouseMove)
    return () => {
      window.removeEventListener("mousemove", onMouseMove)
    }
  }, [])

  const initCanvas = () => {
    resizeCanvas()
    drawParticles()
  }

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current = []
      canvasSize.current.w = canvasContainerRef.current.offsetWidth
      canvasSize.current.h = canvasContainerRef.current.offsetHeight
      canvasRef.current.width = canvasSize.current.w * dpr
      canvasRef.current.height = canvasSize.current.h * dpr
      canvasRef.current.style.width = `${canvasSize.current.w}px`
      canvasRef.current.style.height = `${canvasSize.current.h}px`
      context.current.scale(dpr, dpr)
    }
  }

  const circleParams = (): any => {
    const x = Math.random() * canvasSize.current.w
    const y = Math.random() * canvasSize.current.h
    const translateX = 0
    const translateY = 0
    const pSize = Math.random() * 2 + size
    const alpha = 0
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1))
    const dx = (Math.random() - 0.5) * 0.1
    const dy = (Math.random() - 0.5) * 0.1
    const magnetism = 0.1 + Math.random() * 4
    return {
      x,
      y,
      translateX,
      translateY,
      size: pSize,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    }
  }

  const hexToRgb = (hex: string): number[] => {
    hex = hex.replace("#", "")
    if (hex.length === 3) {
      hex = hex.split("").map((char) => char + char).join("")
    }
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    return [r, g, b]
  }

  const drawCircle = (circle: any, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size: pSize, alpha } = circle
      context.current.translate(translateX, translateY)
      context.current.beginPath()
      context.current.arc(x, y, pSize, 0, 2 * Math.PI)
      const rgb = hexToRgb(color)
      context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`
      context.current.fill()
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (!update) {
        circles.current.push(circle)
      }
    }
  }

  const drawParticles = () => {
    for (let i = 0; i < quantity; i++) {
      const circle = circleParams()
      drawCircle(circle)
    }
  }

  const animate = () => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h)
    }
    circles.current.forEach((circle: any, i: number) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.current.h - circle.y - circle.translateY - circle.size,
      ]
      const minEdge = Math.min(...edge)
      if (minEdge < 0) {
        circle.alpha -= 0.02
      } else if (circle.alpha < circle.targetAlpha) {
        circle.alpha += 0.02
      }

      const xDistance = mouse.current.x - (circle.x + circle.translateX)
      const yDistance = mouse.current.y - (circle.y + circle.translateY)

      circle.translateX +=
        (xDistance / (staticity / circle.magnetism) - circle.translateX) / ease
      circle.translateY +=
        (yDistance / (staticity / circle.magnetism) - circle.translateY) / ease

      circle.x += circle.dx
      circle.y += circle.dy

      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size ||
        circle.alpha <= 0
      ) {
        circles.current[i] = circleParams()
      } else {
        drawCircle(circle, true)
      }
    })
  }

  return (
    <div ref={canvasContainerRef} className={cn("pointer-events-none", className)}>
      <canvas ref={canvasRef} />
    </div>
  )
}
