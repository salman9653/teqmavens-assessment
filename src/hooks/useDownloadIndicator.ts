import { useEffect, useRef, useState } from "react"
import type { DownloadState } from "@/lib/types"

const DOWNLOAD_DURATION_MS = 1_500
const COMPLETION_DURATION_MS = 2_200

export function useDownloadIndicator() {
  const [status, setStatus] = useState<DownloadState>("idle")
  const timerRef = useRef<number | null>(null)

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  const startDownload = () => {
    if (status !== "idle") return

    setStatus("downloading")
    timerRef.current = window.setTimeout(() => {
      setStatus("completed")
      timerRef.current = window.setTimeout(() => {
        setStatus("idle")
        timerRef.current = null
      }, COMPLETION_DURATION_MS)
    }, DOWNLOAD_DURATION_MS)
  }

  useEffect(() => clearTimer, [])

  return { status, startDownload }
}
