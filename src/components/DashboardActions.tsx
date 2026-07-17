import { AnimatePresence, motion } from "framer-motion"
import { Check, Download, DownloadCloud, FileCheck, Share2 } from "lucide-react"
import type { DownloadState } from "@/lib/types"

interface DashboardActionsProps {
  downloadState: DownloadState
  onDownload: () => void
  onOpenDiagnostics: () => void
  onOpenShare: () => void
}

const secondaryButtonClass =
  "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-zinc-200 bg-gradient-to-b from-zinc-100 via-zinc-200 to-zinc-300 text-zinc-700 shadow-lg transition-all duration-300 hover:text-zinc-900 disabled:cursor-default disabled:opacity-50 dark:border-0 dark:from-[#121214] dark:via-[#151517] dark:to-[#252528] dark:text-white/90 dark:hover:text-white"

export function DashboardActions({
  downloadState,
  onDownload,
  onOpenDiagnostics,
  onOpenShare,
}: DashboardActionsProps) {
  return (
    <div className="absolute top-1 right-4 z-30 flex items-center gap-2 sm:right-6 sm:gap-3">
      <motion.button
        type="button"
        onClick={onDownload}
        disabled={downloadState !== "idle"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={secondaryButtonClass}
        aria-label="Download telemetry specifications"
      >
        <AnimatePresence mode="wait">
          {downloadState === "idle" && (
            <motion.span
              key="idle"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <Download className="h-5 w-5" />
            </motion.span>
          )}
          {downloadState === "downloading" && (
            <motion.span
              key="loading"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative flex items-center justify-center"
              style={{ color: "var(--brand-hex)" }}
            >
              <DownloadCloud className="relative z-10 h-5 w-5" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-6px] rounded-full border-[1.5px] border-dashed border-current opacity-40"
              />
            </motion.span>
          )}
          {downloadState === "completed" && (
            <motion.span
              key="complete"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="text-green-500"
            >
              <FileCheck className="h-5 w-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <motion.button
        type="button"
        onClick={onOpenShare}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={secondaryButtonClass}
        aria-label="Share profile"
      >
        <Share2 className="h-5 w-5" />
      </motion.button>

      <motion.button
        type="button"
        onClick={onOpenDiagnostics}
        whileHover={{ scale: 1.12, boxShadow: "0 0 25px var(--brand-glow)" }}
        whileTap={{ scale: 0.9 }}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-0 text-white shadow-lg transition-all duration-300"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--brand-hex) 40%, black) 0%, color-mix(in srgb, var(--brand-hex) 70%, black) 60%, var(--brand-hex) 100%)",
          boxShadow: "0 0 15px var(--brand-glow)",
        }}
        aria-label="Open sensor telemetry diagnostics"
      >
        <Check className="h-5 w-5 stroke-[2.5]" />
      </motion.button>
    </div>
  )
}
