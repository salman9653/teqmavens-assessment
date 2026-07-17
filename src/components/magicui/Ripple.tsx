import React from "react"
import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"

interface RippleProps {
  mainCircleSize?: number
  mainCircleOpacity?: number
  numCircles?: number
  spacing?: number
  className?: string
}

export const Ripple = React.memo(function Ripple({
  mainCircleSize = 380,
  mainCircleOpacity = 0.6,
  numCircles = 4,
  spacing = 300,
  className,
}: RippleProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-transparent overflow-hidden pointer-events-none z-0",
        className,
      )}
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 35%, transparent 70%)",
        maskImage: "linear-gradient(to bottom, black 0%, black 35%, transparent 70%)",
      }}
    >
      <style>{`
        @keyframes magic-ripple {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(0.96);
          }
        }
        .magic-animate-ripple {
          animation: magic-ripple var(--duration, 8s) ease-in-out infinite;
        }
      `}</style>
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * spacing
        const opacity = mainCircleOpacity - i * 0.1
        const animationDelay = `${i * 0.4}s`

        return (
          <div
            key={i}
            className="magic-animate-ripple absolute left-1/2 rounded-full border-[1.5px] border-zinc-500/80 dark:border-white/60"
            style={
              {
                width: `${size}px`,
                height: `${size}px`,
                opacity: Math.max(opacity, 0.15),
                animationDelay: animationDelay,
                top: "48%", // Centers with the car dashboard offset
                transform: "translate(-50%, -50%)",
                "--i": i,
              } as CSSProperties
            }
          />
        )
      })}
    </div>
  )
})

Ripple.displayName = "Ripple"
