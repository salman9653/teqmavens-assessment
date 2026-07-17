import { useEffect, useRef } from "react"
import { useInView, useMotionValue, useSpring } from "framer-motion"
import { cn } from "@/lib/utils"

interface NumberTickerProps {
  value: number
  direction?: "up" | "down"
  delay?: number
  className?: string
  decimals?: number
}

export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  decimals = 0,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === "up" ? 0 : value)
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 120,
  })
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  // Trigger when element is in view or when target value changes
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(direction === "up" ? value : 0)
      }, delay * 1000)
      return () => clearTimeout(timer)
    }
  }, [motionValue, isInView, delay, value, direction])

  // Track spring value and update DOM ref directly for performance (preventing React re-renders)
  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(latest)
      }
    })
    return () => unsubscribe()
  }, [springValue, decimals])

  return (
    <span
      ref={ref}
      className={cn(
        "inline-block tabular-nums text-foreground tracking-normal",
        className,
      )}
    >
      {Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(direction === "up" ? 0 : value)}
    </span>
  )
}
