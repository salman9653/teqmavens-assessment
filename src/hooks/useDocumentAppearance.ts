import { useEffect } from "react"
import type { AccentColor } from "@/lib/types"

type Theme = "light" | "dark"

export function useDocumentAppearance(theme: Theme, accentColor: AccentColor) {
  useEffect(() => {
    const root = document.documentElement

    root.classList.toggle("dark", theme === "dark")
    root.classList.toggle("light", theme === "light")
  }, [theme])

  useEffect(() => {
    const root = document.documentElement

    root.style.setProperty("--brand-color", accentColor.hsl)
    root.style.setProperty("--brand-hex", accentColor.hex)
    root.style.setProperty("--brand-glow", accentColor.glow)
  }, [accentColor])
}
