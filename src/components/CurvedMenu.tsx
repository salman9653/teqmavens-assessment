import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  FileSpreadsheet,
  FileText,
  Gauge,
  Home,
  MessageSquare,
  Settings,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { AppView } from "@/lib/types"

type RailSide = "left" | "right"

interface CurvedMenuProps {
  activeView: AppView
  onViewChange: (view: AppView) => void
  onSpecsClick?: () => void
  onFeedbackClick?: () => void
  onLicenseClick?: () => void
}

interface RailItem {
  id: string
  label: string
  icon: LucideIcon
  onSelect: () => void
  isActive?: boolean
}

interface MenuRailProps {
  side: RailSide
  items: RailItem[]
  hoveredItem: string | null
  onHoveredItemChange: (id: string | null) => void
}

function MenuTooltip({ side, label }: { side: RailSide; label: string }) {
  const isLeftRail = side === "left"

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeftRail ? -8 : 8 }}
      animate={{ opacity: 1, x: isLeftRail ? 16 : -16 }}
      exit={{ opacity: 0, x: isLeftRail ? -8 : 8 }}
      transition={{ duration: 0.18 }}
      className={`pointer-events-none absolute z-30 flex items-center ${
        isLeftRail ? "left-[56px]" : "right-[56px]"
      }`}
    >
      <div className="relative flex items-center drop-shadow-xl">
        {/* Triangle pointer */}
        <div
          className={`absolute top-1/2 -mt-1.5 h-3 w-3 rotate-45 bg-[#343436] ${
            isLeftRail ? "-left-1" : "-right-1"
          }`}
        />
        {/* Main tooltip body */}
        <div
          className="relative z-10 whitespace-nowrap rounded-full bg-[#343436] px-5 py-2 font-sans text-xs font-medium tracking-wide text-white"
          style={{
            borderRight: isLeftRail ? "1.5px solid var(--brand-hex)" : "none",
            borderLeft: !isLeftRail ? "1.5px solid var(--brand-hex)" : "none",
            boxShadow: isLeftRail
              ? "4px 0 10px -2px var(--brand-glow)"
              : "-4px 0 10px -2px var(--brand-glow)",
          }}
        >
          {label}
        </div>
      </div>
    </motion.div>
  )
}

function MenuRail({ side, items, hoveredItem, onHoveredItemChange }: MenuRailProps) {
  const isLeftRail = side === "left"

  return (
    <div
      className={`absolute top-[42%] z-20 hidden h-[340px] w-[140px] -translate-y-1/2 lg:block ${
        isLeftRail ? "left-[2%]" : "right-[2%]"
      }`}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox={isLeftRail ? "0 0 140 340" : "0 0 100 340"}
      >
        <path
          d={isLeftRail ? "M 55 0 Q 0 170 55 340" : "M 85 0 Q 140 170 85 340"}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="16 10"
          className="text-zinc-400 dark:text-white/50"
        />
      </svg>

      {items.map((item, index) => {
        const Icon = item.icon
        const isHovered = hoveredItem === item.id
        const left = isLeftRail
          ? index === 1
            ? 60
            : 75
          : index === 1
            ? 45
            : 30

        return (
          <div
            key={item.id}
            className="absolute flex h-14 w-14 items-center justify-center"
            style={{ top: `${54 + index * 88}px`, left: `${left}px` }}
            onMouseEnter={() => onHoveredItemChange(item.id)}
            onMouseLeave={() => onHoveredItemChange(null)}
            onFocus={() => onHoveredItemChange(item.id)}
            onBlur={() => onHoveredItemChange(null)}
          >
            <AnimatePresence>
              {isHovered && <MenuTooltip side={side} label={item.label} />}
            </AnimatePresence>
            <motion.button
              type="button"
              onClick={item.onSelect}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "relative z-10 flex h-full w-full cursor-pointer items-center justify-center rounded-full border-0 shadow-xl transition-all duration-300",
                item.isActive
                  ? "text-white"
                  : "bg-gradient-to-b from-zinc-200/95 to-zinc-300/95 text-foreground/80 hover:text-foreground dark:from-[#18181b]/95 dark:to-[#27272a]/95",
              )}
              style={{
                background: item.isActive
                  ? "linear-gradient(180deg, var(--brand-hex) 0%, var(--brand-hex) 100%)"
                  : undefined,
                boxShadow: item.isActive
                  ? "inset 0 0 8px rgba(255,255,255,0.45), 0 0 15px var(--brand-glow)"
                  : "inset 0 0 8px rgba(255, 255, 255, 0.3)",
              }}
              aria-label={item.label}
              aria-pressed={item.isActive}
            >
              <Icon className="h-6 w-6" />
            </motion.button>
          </div>
        )
      })}
    </div>
  )
}

export function CurvedMenu({
  activeView,
  onViewChange,
  onSpecsClick,
  onFeedbackClick,
  onLicenseClick,
}: CurvedMenuProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const navigationItems: RailItem[] = [
    {
      id: "dashboard",
      icon: Gauge,
      label: "Dashboard",
      onSelect: () => onViewChange("dashboard"),
      isActive: activeView === "dashboard",
    },
    {
      id: "home",
      icon: Home,
      label: "Home",
      onSelect: () => onViewChange("home"),
      isActive: activeView === "home",
    },
    {
      id: "settings",
      icon: Settings,
      label: "Settings",
      onSelect: () => onViewChange("settings"),
      isActive: activeView === "settings",
    },
  ]
  const actionItems: RailItem[] = [
    {
      id: "diagnostics",
      icon: MessageSquare,
      label: "Diagnostics",
      onSelect: onFeedbackClick ?? (() => undefined),
    },
    {
      id: "specifications",
      icon: FileText,
      label: "Specs sheet",
      onSelect: onSpecsClick ?? (() => undefined),
    },
    {
      id: "safety-policy",
      icon: FileSpreadsheet,
      label: "Safety policy",
      onSelect: onLicenseClick ?? (() => undefined),
    },
  ]

  return (
    <>
      <MenuRail
        side="left"
        items={navigationItems}
        hoveredItem={hoveredItem}
        onHoveredItemChange={setHoveredItem}
      />
      <MenuRail
        side="right"
        items={actionItems}
        hoveredItem={hoveredItem}
        onHoveredItemChange={setHoveredItem}
      />
    </>
  )
}
