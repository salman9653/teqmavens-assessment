import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { AppHeader } from "@/components/AppHeader"
import { BackgroundEffects } from "@/components/BackgroundEffects"
import { CurvedMenu } from "@/components/CurvedMenu"
import { DashboardActions } from "@/components/DashboardActions"
import { DashboardView } from "@/components/DashboardView"
import { DiagnosticModal } from "@/components/DiagnosticModal"
import { HomeView } from "@/components/HomeView"
import { LapsTimeline } from "@/components/LapsTimeline"
import { MobileNav } from "@/components/MobileNav"
import { SettingsView } from "@/components/SettingsView"
import { ShareModal } from "@/components/ShareModal"
import { PolicyModal } from "@/components/PolicyModal"
import { Toast } from "@/components/Toast"
import { SmoothCursor } from "@/components/SmoothCursor"
import { useDocumentAppearance } from "@/hooks/useDocumentAppearance"
import { useDownloadIndicator } from "@/hooks/useDownloadIndicator"
import {
  ACCENT_COLORS,
  DEFAULT_ACCENT_COLOR,
  DEFAULT_DRIVE_MODE,
  DEFAULT_LAP,
  LAPS_DATA,
} from "@/lib/constants"
import type { AccentColor, AppView, DriveMode } from "@/lib/types"

// Helpers for localStorage persistence
function getStoredTheme(): "light" | "dark" {
  try {
    const stored = localStorage.getItem("nextcar-theme")
    if (stored === "light" || stored === "dark") return stored
  } catch { /* ignore */ }
  return "dark"
}

function getStoredAccentColor(): AccentColor {
  try {
    const storedId = localStorage.getItem("nextcar-accent")
    if (storedId) {
      const found = ACCENT_COLORS.find(({ id }) => id === storedId)
      if (found) return found
    }
  } catch { /* ignore */ }
  return DEFAULT_ACCENT_COLOR
}

export default function App() {
  const [activeView, setActiveView] = useState<AppView>("home")
  const [selectedLapId, setSelectedLapId] = useState(DEFAULT_LAP.id)
  const [currentDriveMode, setCurrentDriveMode] = useState<DriveMode>(DEFAULT_DRIVE_MODE)
  const [currentAccentColor, setCurrentAccentColor] =
    useState<AccentColor>(getStoredAccentColor)
  const [theme, setTheme] = useState<"light" | "dark">(getStoredTheme)
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false)
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [isPolicyOpen, setIsPolicyOpen] = useState(false)
  const { status: downloadState, startDownload } = useDownloadIndicator()

  useDocumentAppearance(theme, currentAccentColor)

  const activeLap = LAPS_DATA.find(({ id }) => id === selectedLapId) ?? DEFAULT_LAP

  const handleBack = () => {
    setActiveView((view) => (view === "settings" ? "dashboard" : "home"))
  }

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const next = currentTheme === "dark" ? "light" : "dark"
      try { localStorage.setItem("nextcar-theme", next) } catch { /* ignore */ }
      return next
    })
  }

  const handleAccentColorChange = (color: AccentColor) => {
    setCurrentAccentColor(color)
    try { localStorage.setItem("nextcar-accent", color.id) } catch { /* ignore */ }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-between overflow-x-hidden bg-background font-sans text-foreground transition-colors duration-500">
      <BackgroundEffects />
      <AppHeader activeView={activeView} theme={theme} onThemeToggle={toggleTheme} />

      <main className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col items-center justify-center px-4 pb-20 sm:px-6 md:px-12 lg:pb-0">
        {activeView !== "home" && (
          <motion.button
            type="button"
            onClick={handleBack}
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.95 }}
            className="glass-btn absolute top-1 left-4 z-30 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-foreground/70 shadow-lg hover:text-foreground sm:left-6 sm:h-12 sm:w-12"
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </motion.button>
        )}

        {activeView === "dashboard" && (
          <DashboardActions
            downloadState={downloadState}
            onDownload={startDownload}
            onOpenDiagnostics={() => setIsDiagnosticOpen(true)}
            onOpenShare={() => setIsShareOpen(true)}
          />
        )}

        <AnimatePresence mode="wait">
          {activeView === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full"
            >
              <HomeView onIgnite={() => setActiveView("dashboard")} />
            </motion.div>
          )}

          {activeView === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex min-h-[70vh] w-full flex-col items-center justify-between"
            >
              <DashboardView selectedLap={activeLap} currentDriveMode={currentDriveMode} />
              <LapsTimeline
                laps={LAPS_DATA}
                selectedLapId={selectedLapId}
                onLapSelect={setSelectedLapId}
              />
            </motion.div>
          )}

          {activeView === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <SettingsView
                currentDriveMode={currentDriveMode}
                onDriveModeChange={setCurrentDriveMode}
                currentAccentColor={currentAccentColor}
                onAccentColorChange={handleAccentColorChange}
                onBack={() => setActiveView("dashboard")}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {activeView !== "home" && (
          <CurvedMenu
            activeView={activeView}
            onViewChange={setActiveView}
            onFeedbackClick={() => setIsDiagnosticOpen(true)}
            onSpecsClick={startDownload}
            onLicenseClick={() => setIsPolicyOpen(true)}
          />
        )}
      </main>

      <MobileNav
        activeView={activeView}
        onViewChange={setActiveView}
        onFeedbackClick={() => setIsDiagnosticOpen(true)}
      />

      <DiagnosticModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
        driveModeName={currentDriveMode.name}
      />
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
      <PolicyModal isOpen={isPolicyOpen} onClose={() => setIsPolicyOpen(false)} />
      <Toast isVisible={downloadState === "completed"} message="Telemetry downloaded successfully" />
      <SmoothCursor />

      <footer className="z-10 hidden w-full py-4 text-center font-mono text-[9px] tracking-widest text-foreground/20 lg:block">
        © 2026 NEXTCAR DYNAMICS. ALL RIGHTS RESERVED.
      </footer>
    </div>
  )
}
