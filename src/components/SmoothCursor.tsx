import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function SmoothCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring physics configuration for a smooth lagging follower effect
  const springConfig = { damping: 40, stiffness: 300, mass: 0.4 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Adjust offset to center the 16px cursor (x - 8, y - 8)
      mouseX.set(e.clientX - 8)
      mouseY.set(e.clientY - 8)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [mouseX, mouseY, isVisible])

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-4 w-4 rounded-full bg-white mix-blend-difference md:block"
      style={{
        x: cursorX,
        y: cursorY,
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
      transition={{ opacity: { duration: 0.15 }, scale: { duration: 0.15 } }}
    />
  )
}
