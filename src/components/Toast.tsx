import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

interface ToastProps {
  isVisible: boolean
  message: string
}

export function Toast({ isVisible, message }: ToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed top-6 right-6 z-[100] flex items-center gap-3 rounded-2xl border border-white/10 bg-black/80 p-3 pr-6 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-green-400">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <p className="font-sans text-sm font-semibold tracking-wide text-white">
            {message}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
