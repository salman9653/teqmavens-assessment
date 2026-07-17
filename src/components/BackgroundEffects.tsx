import { useEffect, useRef } from "react"
import LightRays from "@/components/LightRays"

interface Particle {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  opacity: number
  fadeSpeed: number
}

export function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")

    if (!canvas || !context) return

    let animationFrameId = 0
    let particles: Particle[] = []

    const createParticle = (randomY = false): Particle => {
      const beamWidth = Math.min(canvas.width * 0.4, 400) // Restrict to beam area
      return {
        x: canvas.width / 2 + (Math.random() - 0.5) * beamWidth,
        y: randomY ? Math.random() * 300 : 300 + Math.random() * 50, // Only in top 350px
        size: Math.random() * 1.5 + 0.5,
        speedY: -(Math.random() * 0.2 + 0.05), // Float upwards slowly
        speedX: (Math.random() - 0.5) * 0.1,
        opacity: randomY ? Math.random() * 0.6 + 0.2 : 0.1,
        fadeSpeed: Math.random() * 0.005 + 0.002,
      }
    }

    const initializeParticles = () => {
      const particleCount = Math.min(40, Math.floor(window.innerWidth / 30))
      particles = Array.from({ length: particleCount }, () => createParticle(true))
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initializeParticles()
    }

    const animateParticles = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.fillStyle = document.documentElement.classList.contains("dark")
        ? "rgba(255, 255, 255, 0.6)"
        : "rgba(0, 0, 0, 0.3)"

      particles.forEach((particle, index) => {
        particle.y += particle.speedY
        particle.x += particle.speedX

        if (particle.y < 50) {
          particle.opacity -= particle.fadeSpeed
        } else if (particle.opacity < 0.7) {
          particle.opacity += 0.005
        }

        if (
          particle.y < 0 ||
          particle.opacity <= 0 ||
          particle.x < 0 ||
          particle.x > canvas.width
        ) {
          particles[index] = createParticle()
          return
        }

        context.globalAlpha = Math.max(0, particle.opacity)
        context.beginPath()
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fill()
      })

      context.globalAlpha = 1
      animationFrameId = requestAnimationFrame(animateParticles)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    animateParticles()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      
      {/* ReactBits LightRays Component */}
      <LightRays
        raysColor="#ffffff"
        raysOrigin="top-center"
        raysSpeed={0.1}
        lightSpread={0.1}
        rayLength={3}
        fadeDistance={1.5}
        saturation={0.3}
        mouseInfluence={0.1}
        noiseAmount={0}
        distortion={0}
        pulsating={false}
        className="pointer-events-none absolute inset-0 z-[1] opacity-30 mix-blend-screen dark:opacity-100"
      />
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full mix-blend-screen dark:mix-blend-normal"
      />
      
      {/* Concentric rings - centered on the car circle */}
      <div className="pointer-events-none absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 md:top-1/2">
        {/* Ring 1 - just outside the stats area */}
        <div
          className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-white/[0.08] sm:h-[480px] sm:w-[480px] md:h-[580px] md:w-[580px]"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 70%)",
            maskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 70%)",
          }}
        />
        {/* Ring 2 - larger, through/past the stats */}
        <div
          className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-white/[0.06] sm:h-[680px] sm:w-[680px] md:h-[800px] md:w-[800px]"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 35%, transparent 65%)",
            maskImage: "linear-gradient(to bottom, black 0%, black 35%, transparent 65%)",
          }}
        />
        {/* Ring 3 - encompasses the nav buttons */}
        <div
          className="absolute left-1/2 top-1/2 h-[740px] w-[740px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-white/[0.04] sm:h-[880px] sm:w-[880px] md:h-[1020px] md:w-[1020px]"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 30%, transparent 60%)",
            maskImage: "linear-gradient(to bottom, black 0%, black 30%, transparent 60%)",
          }}
        />
        {/* Ring 4 - outermost, very subtle */}
        <div
          className="absolute left-1/2 top-1/2 h-[920px] w-[920px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-white/[0.03] sm:h-[1080px] sm:w-[1080px] md:h-[1240px] md:w-[1240px]"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 25%, transparent 55%)",
            maskImage: "linear-gradient(to bottom, black 0%, black 25%, transparent 55%)",
          }}
        />
      </div>
      
      <div
        className="pointer-events-none absolute top-[48%] left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial from-transparent to-transparent opacity-30 blur-3xl md:top-1/2"
        style={{ backgroundImage: "radial-gradient(circle, var(--brand-glow) 0%, transparent 60%)" }}
      />
    </div>
  )
}
