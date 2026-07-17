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

        <motion.button
          type="button"
          onClick={onThemeToggle}
          whileHover={{ scale: 1.08, boxShadow: "0 0 20px rgba(128,128,128,0.3)" }}
          whileTap={{ scale: 0.92 }}
          className={`group flex h-10 w-20 cursor-pointer items-center justify-between gap-3 rounded-full border px-3 shadow-md transition-all duration-300 select-none ${
            isDarkTheme
              ? "border-zinc-800/80 bg-zinc-950/80"
              : "border-zinc-300 bg-zinc-200/90"
          }`}
          aria-label={`Switch to ${isDarkTheme ? "light" : "dark"} theme`}
        >
          <Sun
            className={`h-5 w-5 transition-all duration-300 ${
              isDarkTheme
                ? "text-zinc-600 opacity-40 group-hover:opacity-60"
                : "scale-105 text-zinc-900 opacity-100"
            }`}
          />
          <Moon
            className={`h-5 w-5 transition-all duration-300 ${
              isDarkTheme
                ? "scale-105 text-white opacity-100 drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]"
                : "text-zinc-400 opacity-40 group-hover:opacity-65"
            }`}
          />
        </motion.button>
      </div>
    </header>
  )
}
