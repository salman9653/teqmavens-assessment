import { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  maxWidth?: string
  titleId?: string
}

export function Modal({ isOpen, onClose, children, maxWidth = "max-w-[500px]", titleId }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 cursor-pointer bg-black/60 backdrop-blur-md"
            aria-label="Close dialog"
          />

          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className={`glass-panel relative w-full ${maxWidth} overflow-hidden rounded-2xl border border-foreground/10 p-6 shadow-2xl md:p-8`}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 cursor-pointer rounded-full p-1.5 text-foreground/50 transition-colors hover:bg-foreground/10 hover:text-foreground"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>
            {children}
          </motion.section>
        </div>
      )}
    </AnimatePresence>
  )
}
