import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Activity, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"
import { Modal } from "@/components/Modal"

interface DiagnosticModalProps {
  isOpen: boolean
  onClose: () => void
  driveModeName: string
}

interface DiagnosticSystem {
  name: string
  status: string
  value: number
  unit: string
  health: number
}

const defaultSystems: DiagnosticSystem[] = [
  { name: "Powertrain engine", status: "Optimal", value: 100, unit: "%", health: 100 },
  { name: "Tire grip & pressure", status: "Optimal", value: 98, unit: "%", health: 98 },
  { name: "Battery thermal regulation", status: "Optimal", value: 95, unit: "%", health: 95 },
  { name: "Braking system", status: "Optimal", value: 92, unit: "%", health: 92 },
  { name: "Aerodynamic drag coefficient", status: "Active", value: 0.24, unit: " Cd", health: 100 },
]

const calibratedSystems: DiagnosticSystem[] = [
  { name: "Powertrain engine", status: "Optimal", value: 100, unit: "%", health: 100 },
  { name: "Tire grip & pressure", status: "Optimal", value: 100, unit: "%", health: 100 },
  { name: "Battery thermal regulation", status: "Optimal", value: 99, unit: "%", health: 99 },
  { name: "Braking system", status: "Optimal", value: 98, unit: "%", health: 98 },
  { name: "Aerodynamic drag coefficient", status: "Calibrated", value: 0.23, unit: " Cd", health: 100 },
]

export function DiagnosticModal({ isOpen, onClose, driveModeName }: DiagnosticModalProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const [systems, setSystems] = useState(defaultSystems)
  const scanTimerRef = useRef<number | null>(null)

  const clearScanTimer = () => {
    if (scanTimerRef.current !== null) {
      window.clearTimeout(scanTimerRef.current)
      scanTimerRef.current = null
    }
  }

  useEffect(() => {
    if (!isOpen) {
      clearScanTimer()
      setIsScanning(false)
    }
  }, [isOpen])

  useEffect(() => clearScanTimer, [])

  const runScan = () => {
    clearScanTimer()
    setIsScanning(true)
    setScanProgress(0)

    let progress = 0
    const advanceScan = () => {
      progress = Math.min(progress + 10, 100)
      setScanProgress(progress)

      if (progress === 100) {
        scanTimerRef.current = null
        setIsScanning(false)
        setSystems(calibratedSystems)
        return
      }

      scanTimerRef.current = window.setTimeout(advanceScan, 150)
    }

    scanTimerRef.current = window.setTimeout(advanceScan, 150)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} titleId="diagnostics-title">
      <div className="mb-6 flex items-center gap-3">
        <div
          className="rounded-lg p-2"
          style={{ color: "var(--brand-hex)", backgroundColor: "var(--brand-glow)" }}
        >
          <Activity className="h-6 w-6 animate-pulse" />
        </div>
        <div>
          <h3
            id="diagnostics-title"
            className="font-mono text-lg font-bold uppercase tracking-wider text-foreground"
          >
            Vehicle diagnostics
          </h3>
          <p className="font-sans text-xs text-foreground/50">
            Active profile:{" "}
            <span
              className="font-semibold"
              style={{ color: "var(--brand-hex)" }}
            >
              {driveModeName} mode
            </span>
          </p>
        </div>
      </div>

      <div className="mb-6 space-y-4">
        {systems.map((system, index) => (
          <div key={system.name} className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="font-sans text-foreground/80">{system.name}</span>
              <span className="font-mono text-foreground/90">
                {system.value}
                {system.unit} —{" "}
                <span className="font-sans text-[11px] font-bold text-green-500 dark:text-green-400">
                  {system.status}
                </span>
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/5 dark:bg-foreground/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${system.health}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="h-full rounded-full"
                style={{ backgroundColor: "var(--brand-hex)" }}
              />
            </div>
          </div>
        ))}
      </div>

      {isScanning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 space-y-2 rounded-lg bg-foreground/5 p-3"
        >
          <div className="flex justify-between font-mono text-xs">
            <span className="flex items-center gap-1.5 text-foreground/75">
              <RefreshCw
                className="h-3.5 w-3.5 animate-spin"
                style={{ color: "var(--brand-hex)" }}
              />
              Scanning telemetry...
            </span>
            <span className="text-foreground">{scanProgress}%</span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-foreground/10">
            <div
              className="h-full transition-all duration-150"
              style={{ width: `${scanProgress}%`, backgroundColor: "var(--brand-hex)" }}
            />
          </div>
        </motion.div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={runScan}
          disabled={isScanning}
          className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 font-sans text-xs font-bold uppercase tracking-wider text-background shadow-lg transition-all duration-200 hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw className={cn("h-4 w-4", isScanning && "animate-spin")} />
          {isScanning ? "Scanning..." : "Recalibrate sensors"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="glass-btn cursor-pointer rounded-xl border border-foreground/10 px-5 py-3 font-sans text-xs font-bold uppercase tracking-wider text-foreground shadow-md hover:bg-foreground/5"
        >
          Dismiss
        </button>
      </div>
    </Modal>
  )
}
