import { motion } from "framer-motion"
import carImage from "@/assets/car_dashboard.png"
import { AnimatedCounter } from "@/components/AnimatedCounter"
import { calculateTelemetryMetrics } from "@/lib/telemetry"
import type { DriveMode, LapData } from "@/lib/types"

interface DashboardViewProps {
  selectedLap: LapData
  currentDriveMode: DriveMode
}

interface Metric {
  label: string
  value: number
  unit?: string
  decimals?: number
}

interface MetricColumnProps {
  metrics: Metric[]
  alignment: "left" | "right"
}

function MetricColumn({ metrics, alignment }: MetricColumnProps) {
  const isRightSide = alignment === "right"
  const desktopAlignment = isRightSide
    ? "md:items-start md:text-left"
    : "md:items-end md:text-right"
  const valueAlignment = isRightSide ? "md:justify-start" : "md:justify-end"

  return (
    <div className={`order-2 flex flex-col gap-4 text-center sm:gap-6 md:gap-10 ${desktopAlignment}`}>
      {metrics.map(({ label, value, unit, decimals = 0 }, index) => {
        let curveClass = ""
        // The middle item (index 1) curves outwards away from the car
        if (index === 1) {
          curveClass = isRightSide
            ? "md:translate-x-4 lg:translate-x-10"
            : "md:-translate-x-4 lg:-translate-x-10"
        }

        return (
          <div key={label} className={`space-y-1 transition-transform duration-500 ${curveClass}`}>
            <div
              className={`flex items-baseline justify-center gap-1 font-mono text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl ${valueAlignment}`}
            >
              <AnimatedCounter value={value} decimals={decimals} duration={1} />
              {unit && (
                <span className="font-sans text-xs font-bold text-foreground/50 md:text-sm">
                  {unit}
                </span>
              )}
            </div>
            <div className="font-sans text-[10px] font-bold uppercase tracking-widest text-foreground/45 md:text-xs">
              {label}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function DashboardView({ selectedLap, currentDriveMode }: DashboardViewProps) {
  const metrics = calculateTelemetryMetrics(selectedLap, currentDriveMode)
  const leftMetrics: Metric[] = [
    { label: "Top Speed", value: metrics.topSpeed },
    { label: "Power (HP)", value: metrics.power },
    { label: "Torque", value: metrics.torque },
  ]
  const rightMetrics: Metric[] = [
    { label: "0-100 KM/H", value: metrics.zeroToHundred, unit: "Sec", decimals: 1 },
    { label: "Oil Change", value: metrics.oilChange, unit: "KM" },
    { label: "Range", value: metrics.range, unit: "KM" },
  ]

  return (
    <div className="relative z-10 flex w-full select-none flex-col items-center pt-14 md:pt-0">
      <div className="mb-8 flex flex-col items-center text-center md:mb-12">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-mono text-2xl leading-none font-black uppercase tracking-wider text-foreground italic sm:text-3xl md:text-[44px]"
        >
          Engineered for {" "}
          <span
            className="brand-text-glow font-black uppercase italic"
            style={{ color: "var(--brand-hex)" }}
          >
            passion
          </span>
        </motion.h1>
        <p className="mt-3 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/50 sm:mt-4 md:mt-5 md:text-xs">
          {selectedLap.description}
        </p>
        <div
          className="mx-auto mt-3 h-[2px] w-6"
          style={{ backgroundColor: "var(--brand-hex)" }}
        />
      </div>

      <div className="grid w-full max-w-[850px] grid-cols-2 items-center gap-4 px-4 sm:gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-8">
        <MetricColumn metrics={leftMetrics} alignment="left" />

        <div className="relative order-first col-span-2 mx-auto flex h-[220px] w-[220px] items-center justify-center sm:h-[280px] sm:w-[280px] md:order-2 md:col-span-1 md:h-[380px] md:w-[380px]">
          <div
            className="pointer-events-none absolute inset-4 rounded-full opacity-40 blur-xl"
            style={{
              backgroundImage: "radial-gradient(circle, var(--brand-glow) 0%, transparent 70%)",
            }}
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute inset-0 rounded-full border border-foreground/5"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, transparent 60%, rgba(var(--brand-color), 0.03) 61%), repeating-conic-gradient(from 0deg, var(--border) 0deg 1deg, transparent 1deg 6deg)",
            }}
          />
          <motion.div
            animate={{ scale: [0.99, 1.01, 0.99] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-[24px] rounded-full border border-white/30 dark:border-white/20"
            style={{
              boxShadow: "0 0 15px rgba(255,255,255,0.15), inset 0 0 10px rgba(255,255,255,0.1)",
            }}
          />
          {/* Shine below the center car */}
          <div className="absolute bottom-[18px] left-1/2 h-[15px] w-[120px] -translate-x-1/2 rounded-full bg-white opacity-70 blur-[12px] md:bottom-[24px] md:w-[150px] md:blur-[16px]" />
          
          <div className="absolute inset-8 overflow-hidden rounded-full border border-foreground/10 bg-background shadow-2xl">
            <motion.img
              initial={{ scale: 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              src={carImage}
              alt="NEXTCAR performance vehicle"
              className="h-full w-full select-none object-cover"
            />
          </div>
        </div>

        <MetricColumn metrics={rightMetrics} alignment="right" />
      </div>
    </div>
  )
}
