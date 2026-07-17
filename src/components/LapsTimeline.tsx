import { motion } from "framer-motion"
import type { LapData } from "@/lib/types"
import { cn } from "@/lib/utils"

interface LapsTimelineProps {
  laps: LapData[]
  selectedLapId: string
  onLapSelect: (lapId: string) => void
}

const timelinePoints = [
  { x: 100, y: 95 },
  { x: 300, y: 88 },
  { x: 500, y: 80 },
  { x: 700, y: 68 },
  { x: 900, y: 40 },
]

const trackPath =
  "M 0,97 C 30,97 70,95 100,95 C 150,94 180,98 210,98 C 240,98 270,91 300,88 C 350,85 380,92 410,92 C 440,92 470,83 500,80 C 550,77 585,85 615,85 C 645,85 675,72 700,68 C 760,63 800,50 830,50 C 860,50 880,43 900,40 C 930,37 970,30 1000,28"

export function LapsTimeline({ laps, selectedLapId, onLapSelect }: LapsTimelineProps) {
  return (
    <div className="relative z-10 mt-4 w-full select-none sm:mt-8">
      <div className="relative ml-[calc(-50vw+50%)] h-[180px] w-[100vw] overflow-hidden">
        <svg
          className="absolute top-0 left-0 h-[300px] w-full overflow-visible"
          viewBox="0 0 1000 300"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="timelineFade"
              x1="0"
              y1="0"
              x2="0"
              y2="300"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="var(--brand-hex)" stopOpacity="0.12" />
              <stop offset="25%" stopColor="var(--brand-hex)" stopOpacity="0.04" />
              <stop offset="60%" stopColor="var(--brand-hex)" stopOpacity="0" />
            </linearGradient>
            <filter id="glowBlur">
              <feGaussianBlur stdDeviation="20" />
            </filter>
          </defs>

          <path
            d={`${trackPath} L 1000,300 L 0,300 Z`}
            fill="url(#timelineFade)"
            filter="url(#glowBlur)"
          />
          <path
            d={trackPath}
            fill="none"
            stroke="var(--brand-hex)"
            strokeWidth="1.5"
            strokeDasharray="8 6"
            className="opacity-90"
          />
        </svg>

        <div className="absolute top-0 left-0 flex h-[100px] w-full justify-between px-[5%] sm:px-[10%]">
          {laps.map((lap, index) => {
            const point = timelinePoints[index]

            if (!point) return null

            const isSelected = selectedLapId === lap.id
            const dropLineHeight = Math.max(0, 130 - (point.y + 18) - 10)

            return (
              <button
                key={lap.id}
                type="button"
                onClick={() => onLapSelect(lap.id)}
                className="group absolute h-[180px] w-[64px] cursor-pointer border-0 bg-transparent p-0 sm:w-[120px] md:w-[160px]"
                style={{
                  left: `${(point.x / 1000) * 100}%`,
                  transform: "translateX(-50%)",
                }}
                aria-label={`Select ${lap.label}: ${lap.zoneName}`}
                aria-current={isSelected ? "step" : undefined}
              >
                <motion.span
                  className="absolute left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center"
                  style={{ top: `${point.y - 12}px` }}
                  whileHover="hover"
                >
                  {!isSelected && (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-zinc-400/40 dark:bg-zinc-500/30"
                      variants={{ hover: { scale: 1.4 } }}
                    />
                  )}
                  {!isSelected && (
                    <motion.span
                      className="relative z-10 h-3.5 w-3.5 rounded-full bg-zinc-500 transition-colors duration-300 group-hover:bg-zinc-600 dark:bg-zinc-400 dark:group-hover:bg-zinc-300"
                      variants={{ hover: { scale: 1.25 } }}
                    />
                  )}
                  {isSelected && (
                    <motion.span
                      layoutId="activeLapOuter"
                      className="absolute inset-0 rounded-full"
                      style={{
                        scale: 1.6,
                        backgroundColor: "var(--brand-hex)",
                        opacity: 0.4,
                      }}
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  {isSelected && (
                    <motion.span
                      layoutId="activeLapInner"
                      className="relative z-20 h-3.5 w-3.5 rounded-full"
                      style={{ scale: 1.25, backgroundColor: "var(--brand-hex)" }}
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                </motion.span>

                <span
                  className={cn(
                    "absolute left-1/2 w-px -translate-x-1/2 border-l border-dashed transition-all duration-300",
                    isSelected
                      ? "border-zinc-800/80 dark:border-white/80"
                      : "border-zinc-400/60 group-hover:border-zinc-600 dark:border-white/40 dark:group-hover:border-white/60",
                  )}
                  style={{ top: `${point.y + 18}px`, height: `${dropLineHeight}px` }}
                />

                <span className="absolute top-[130px] left-1/2 flex w-[64px] -translate-x-1/2 flex-col items-center text-center sm:w-[120px] md:w-[160px]">
                  <span
                    className={cn(
                      "font-mono text-[8px] tracking-widest transition-all duration-300 sm:text-[10px] md:text-xs",
                      isSelected
                        ? "font-extrabold text-zinc-900 dark:text-white"
                        : "font-bold text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300",
                    )}
                  >
                    {lap.label}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 font-sans text-[8px] tracking-wide transition-all duration-300 sm:text-[10px] md:text-[11px]",
                      isSelected
                        ? "font-semibold text-zinc-600 dark:text-zinc-300"
                        : "font-medium text-zinc-500 group-hover:text-zinc-700 dark:text-zinc-600 dark:group-hover:text-zinc-400",
                    )}
                  >
                    {lap.zoneName}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>


    </div>
  )
}
