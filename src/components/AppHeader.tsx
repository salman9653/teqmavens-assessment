import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { Logo } from "@/components/Logo"
import type { AppView } from "@/lib/types"

type Theme = "light" | "dark"

interface AppHeaderProps {
  activeView: AppView
  theme: Theme
  onThemeToggle: () => void
}

export function AppHeader({ activeView, theme, onThemeToggle }: AppHeaderProps) {
  const isDarkTheme = theme === "dark"

  return (
    <header className="z-20 mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-6 md:px-12">
      <Logo />

      <div className="flex items-center gap-4">
        {activeView !== "home" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mr-2 hidden items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-foreground/45 md:flex"
          >
            <span>Drive system: online</span>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
          </motion.div>
        )}

        <button
          type="button"
          onClick={onThemeToggle}
          className="relative flex h-10 w-20 cursor-pointer items-center justify-between rounded-full border border-zinc-300 bg-zinc-200/60 p-1 shadow-md dark:border-zinc-800/80 dark:bg-zinc-950/80 select-none overflow-hidden"
          aria-label={`Switch to ${isDarkTheme ? "light" : "dark"} theme`}
        >
          {/* Sliding active indicator */}
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="absolute top-1 bottom-1 w-8 rounded-full bg-white dark:bg-zinc-800 shadow-md"
            style={{
              left: isDarkTheme ? "38px" : "4px",
              boxShadow: isDarkTheme
                ? "0 0 12px var(--brand-glow)"
                : "0 0 8px rgba(0, 0, 0, 0.1)"
            }}
          />
          
          <div className="relative z-10 flex w-full items-center justify-between px-2.5">
            <Sun
              className={`h-4.5 w-4.5 transition-colors duration-300 ${
                isDarkTheme ? "text-zinc-500/60" : "text-amber-600 dark:text-amber-500 font-bold"
              }`}
            />
            <Moon
              className={`h-4.5 w-4.5 transition-colors duration-300 ${
                isDarkTheme ? "text-indigo-400" : "text-zinc-500/40"
              }`}
            />
          </div>
        </button>
      </div>
    </header>
  )
}
