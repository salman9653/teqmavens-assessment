import { useEffect } from "react"
import { motion, useMotionValue, animate, useTransform } from "framer-motion"

interface AnimatedCounterProps {
  value: number
  decimals?: number
  duration?: number
}

export function AnimatedCounter({ value, decimals = 0, duration = 0.3 }: AnimatedCounterProps) {
  const count = useMotionValue(value)
  const display = useTransform(count, (latest) =>
    latest.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }),
  )

  useEffect(() => {
    const controls = animate(count, value, { duration, ease: "easeOut" })
    return () => controls.stop()
  }, [value, duration, count])

  return <motion.span className="font-mono">{display}</motion.span>
}
