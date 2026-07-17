import { useState } from "react"
import { motion } from "framer-motion"
import {
  Activity,
  Palette,
  type LucideIcon,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react"
import { ACCENT_COLORS, DRIVE_MODES } from "@/lib/constants"
import type { AccentColor, DriveMode } from "@/lib/types"
import { cn } from "@/lib/utils"

interface SettingsViewProps {
  currentDriveMode: DriveMode
  onDriveModeChange: (mode: DriveMode) => void
  currentAccentColor: AccentColor
  onAccentColorChange: (color: AccentColor) => void
  onBack: () => void
}

const driveModeIcons: Record<DriveMode["id"], LucideIcon> = {
  comfort: Shield,
  sport: Zap,
  track: Activity,
  drift: Sparkles,
}

const modifierDefinitions = [
  { label: "Top velocity limit", key: "speedMultiplier", invert: false },
  { label: "Powertrain output (HP)", key: "powerMultiplier", invert: false },
  { label: "Torque output (Nm)", key: "torqueMultiplier", invert: false },
  { label: "Autonomous range (km)", key: "rangeMultiplier", invert: false },
  { label: "0-100 acceleration time", key: "zeroToHundredMultiplier", invert: true },
] as const

export function SettingsView({
  currentDriveMode,
  onDriveModeChange,
  currentAccentColor,
  onAccentColorChange,
  onBack,
}: SettingsViewProps) {
  const [selectedDriveMode, setSelectedDriveMode] = useState(currentDriveMode)
  const [selectedAccentColor, setSelectedAccentColor] = useState(currentAccentColor)

  const applySettings = () => {
    onDriveModeChange(selectedDriveMode)
    onAccentColorChange(selectedAccentColor)
    onBack()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 mx-auto w-full max-w-[850px] select-none px-4 py-8 text-left"
    >
      <div className="mb-8 flex flex-col gap-2 border-b border-foreground/5 pb-4">
        <h2 className="font-mono text-2xl font-black uppercase tracking-wider text-foreground">
          System configuration
        </h2>
        <p className="font-sans text-xs text-foreground/50">
          Fine-tune drivetrain mapping, vehicle dynamics, and dashboard aesthetics.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <section className="space-y-4" aria-labelledby="drive-dynamics-heading">
          <div className="mb-1 flex items-center gap-2 text-foreground/75">
            <Activity className="h-5 w-5" style={{ color: "var(--brand-hex)" }} />
            <h3
              id="drive-dynamics-heading"
              className="font-mono text-sm font-bold uppercase tracking-widest"
            >
              Drive dynamics
            </h3>
          </div>

          <div className="space-y-3">
            {DRIVE_MODES.map((mode) => {
              const Icon = driveModeIcons[mode.id]
              const isSelected = selectedDriveMode.id === mode.id

              return (
                <motion.button
                  key={mode.id}
                  type="button"
                  onClick={() => setSelectedDriveMode(mode)}
                  whileHover={{ x: 4 }}
                  className={cn(
                    "flex w-full cursor-pointer items-start gap-4 rounded-xl border p-4 text-left transition-all duration-300",
                    isSelected
                      ? "glass-panel"
                      : "border-foreground/5 bg-foreground/[0.01] hover:bg-foreground/[0.04]",
                  )}
                  style={{
                    borderColor: isSelected ? "var(--brand-hex)" : undefined,
                    boxShadow: isSelected ? "0 0 10px var(--brand-glow)" : undefined,
                  }}
                  aria-pressed={isSelected}
                >
                  <div
                    className={cn(
                      "rounded-lg border p-2",
                      isSelected
                        ? ""
                        : "border-foreground/5 bg-foreground/5 text-foreground/50",
                    )}
                    style={{
                      color: isSelected ? "var(--brand-hex)" : undefined,
                      borderColor: isSelected ? "var(--brand-hex)" : undefined,
                      backgroundColor: isSelected ? "var(--brand-glow)" : undefined,
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black uppercase tracking-widest text-foreground">
                        {mode.name}
                      </span>
                      {isSelected && (
                        <span
                          className="rounded px-1.5 py-0.5 font-sans text-[9px] font-bold uppercase tracking-wider"
                          style={{
                            color: "var(--brand-hex)",
                            backgroundColor: "var(--brand-glow)",
                          }}
                        >
                          Active
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-[11px] leading-relaxed text-foreground/50">
                      {mode.description}
                    </p>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </section>

        <section className="space-y-6" aria-labelledby="appearance-heading">
          <div className="space-y-4">
            <div className="mb-1 flex items-center gap-2 text-foreground/75">
              <Palette className="h-5 w-5" style={{ color: "var(--brand-hex)" }} />
              <h3
                id="appearance-heading"
                className="font-mono text-sm font-bold uppercase tracking-widest"
              >
                Aesthetics & lighting
              </h3>
            </div>

            <div className="space-y-4 rounded-xl border border-foreground/5 bg-foreground/[0.01] p-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/45">
                Dashboard accent color
              </span>
              <div className="flex items-center gap-4">
                {ACCENT_COLORS.map((color) => {
                  const isSelected = selectedAccentColor.id === color.id

                  return (
                    <motion.button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedAccentColor(color)}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      className={cn(
                        "relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 shadow-md transition-all duration-300",
                        isSelected ? "border-foreground" : "border-transparent",
                      )}
                      style={{ backgroundColor: color.hex }}
                      aria-label={`Use ${color.name} as the dashboard accent color`}
                      aria-pressed={isSelected}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="selectedColorDot"
                          className="h-2.5 w-2.5 rounded-full bg-background shadow-sm"
                        />
                      )}
                    </motion.button>
                  )
                })}
              </div>
              <p className="mt-2 font-sans text-[10px] leading-relaxed text-foreground/40">
                Sets the color used for the dashboard, timeline, and ambient effects.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-foreground/75">
              Profile modifiers
            </h3>

            <div className="space-y-3.5 rounded-xl border border-foreground/5 bg-foreground/[0.01] p-5">
              {modifierDefinitions.map(({ label, key, invert }) => {
                const difference = Math.round((selectedDriveMode[key] - 1) * 100)
                const isPositive = invert ? difference < 0 : difference > 0
                const value = difference === 0 ? "±0%" : `${difference > 0 ? "+" : ""}${difference}%`

                return (
                  <div key={key} className="flex items-center justify-between text-xs">
                    <span className="font-sans text-foreground/60">{label}</span>
                    <span
                      className={cn(
                        "font-mono font-bold tracking-wider",
                        difference === 0
                          ? "text-foreground/70"
                          : isPositive
                            ? "text-green-500 dark:text-green-400"
                            : "text-red-500 dark:text-red-400",
                      )}
                    >
                      {value}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </div>

      <div className="flex gap-4 border-t border-foreground/5 pt-6">
        <button
          type="button"
          onClick={applySettings}
          className="cursor-pointer rounded-xl bg-foreground px-6 py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-background shadow-lg transition-all hover:bg-foreground/90"
        >
          Apply configuration
        </button>
        <button
          type="button"
          onClick={onBack}
          className="glass-btn cursor-pointer rounded-xl border border-foreground/10 px-6 py-3.5 font-sans text-xs font-bold uppercase tracking-wider text-foreground"
        >
          Cancel
        </button>
      </div>
    </motion.div>
  )
}
