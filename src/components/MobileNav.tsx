import { motion } from "framer-motion"
import {
  Gauge,
  Home,
  MessageSquare,
  Settings,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { AppView } from "@/lib/types"

interface MobileNavProps {
  activeView: AppView
  onViewChange: (view: AppView) => void
  onFeedbackClick?: () => void
}

interface NavItem {
  id: string
  icon: LucideIcon
  label: string
  view?: AppView
  onSelect: () => void
  isActive?: boolean
}

export function MobileNav({
  activeView,
  onViewChange,
  onFeedbackClick,
}: MobileNavProps) {
  const navItems: NavItem[] = [
    {
      id: "home",
      icon: Home,
      label: "Home",
      view: "home",
      onSelect: () => onViewChange("home"),
      isActive: activeView === "home",
    },
    {
      id: "dashboard",
      icon: Gauge,
      label: "Dashboard",
      view: "dashboard",
      onSelect: () => onViewChange("dashboard"),
      isActive: activeView === "dashboard",
    },
    {
      id: "diagnostics",
      icon: MessageSquare,
      label: "Diagnostics",
      onSelect: onFeedbackClick ?? (() => undefined),
    },
    {
      id: "settings",
      icon: Settings,
      label: "Settings",
      view: "settings",
      onSelect: () => onViewChange("settings"),
      isActive: activeView === "settings",
    },
  ]

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed bottom-0 left-0 z-50 w-full lg:hidden"
    >
      <div className="mx-auto max-w-lg px-3 pb-[env(safe-area-inset-bottom,8px)]">
        <div
          data-mobile-nav
          className="flex items-center justify-around rounded-t-2xl border border-b-0 border-white/[0.06] px-1 py-2 shadow-[0_-4px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(20, 20, 22, 0.92) 0%, rgba(10, 10, 12, 0.96) 100%)",
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={item.onSelect}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "relative flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 transition-all duration-300",
                  "cursor-pointer border-0 bg-transparent",
                  item.isActive
                    ? "text-foreground"
                    : "text-foreground/40 hover:text-foreground/70",
                )}
                aria-label={item.label}
                aria-current={item.isActive ? "page" : undefined}
              >
                {item.isActive && (
                  <motion.div
                    layoutId="mobileNavActive"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: `linear-gradient(180deg, color-mix(in srgb, var(--brand-hex) 25%, transparent) 0%, color-mix(in srgb, var(--brand-hex) 8%, transparent) 100%)`,
                      boxShadow: `0 0 12px var(--brand-glow)`,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  className={cn(
                    "relative z-10 h-5 w-5 transition-all duration-300",
                    item.isActive && "drop-shadow-[0_0_6px_var(--brand-glow)]",
                  )}
                  style={item.isActive ? { color: "var(--brand-hex)" } : undefined}
                />
                <span
                  className={cn(
                    "relative z-10 font-sans text-[9px] font-semibold uppercase tracking-wider",
                    item.isActive && "font-bold",
                  )}
                  style={item.isActive ? { color: "var(--brand-hex)" } : undefined}
                >
                  {item.label}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </motion.nav>
  )
}
