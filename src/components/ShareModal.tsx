import { useEffect, useRef, useState } from "react"
import { Check, Copy, Globe, Mail, MessageCircle, Send, Share2 } from "lucide-react"
import { Modal } from "@/components/Modal"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
}

type ShareChannel = "native" | "whatsapp" | "telegram" | "email"

const shareChannels = [
  { name: "Share", icon: Globe, color: "hover:bg-sky-500/10 hover:text-sky-400", channel: "native" },
  { name: "WhatsApp", icon: MessageCircle, color: "hover:bg-emerald-500/10 hover:text-emerald-400", channel: "whatsapp" },
  { name: "Telegram", icon: Send, color: "hover:bg-blue-500/10 hover:text-blue-400", channel: "telegram" },
  { name: "Email", icon: Mail, color: "hover:bg-purple-500/10 hover:text-purple-400", channel: "email" },
] as const

export function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const copiedTimerRef = useRef<number | null>(null)
  const shareUrl = window.location.href
  const shareTitle = "NEXTCAR telemetry dashboard"

  const clearCopiedTimer = () => {
    if (copiedTimerRef.current !== null) {
      window.clearTimeout(copiedTimerRef.current)
      copiedTimerRef.current = null
    }
  }

  useEffect(() => clearCopiedTimer, [])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      clearCopiedTimer()
      setCopied(true)
      copiedTimerRef.current = window.setTimeout(() => setCopied(false), 2_000)
    } catch {
      setCopied(false)
    }
  }

  const shareVia = async (channel: ShareChannel) => {
    if (channel === "native" && navigator.share) {
      try {
        await navigator.share({ title: shareTitle, url: shareUrl })
      } catch {
        return
      }
      return
    }

    if (channel === "native") {
      await copyToClipboard()
      return
    }

    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedTitle = encodeURIComponent(shareTitle)
    const destination = {
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      email: `mailto:?subject=${encodedTitle}&body=${encodedTitle}%0A${encodedUrl}`,
    }[channel]

    window.open(destination, "_blank", "noopener,noreferrer")
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} titleId="share-title">
      <div className="mb-6 flex items-center gap-3">
        <div
          className="rounded-lg p-2"
          style={{ color: "var(--brand-hex)", backgroundColor: "var(--brand-glow)" }}
        >
          <Share2 className="h-6 w-6" />
        </div>
        <div>
          <h3
            id="share-title"
            className="font-mono text-lg font-bold uppercase tracking-wider text-foreground"
          >
            Share Profile
          </h3>
          <p className="font-sans text-xs text-foreground/50">
            Share telemetry session data
          </p>
        </div>
      </div>

      <div className="mb-8">
        <label
          htmlFor="share-link"
          className="mb-2 block font-sans text-xs font-semibold text-foreground/70"
        >
          Direct Link
        </label>
        <div className="flex items-center gap-2">
          <div className="flex h-11 flex-1 items-center overflow-hidden rounded-xl border border-foreground/10 bg-foreground/5 px-3">
            <input
              id="share-link"
              type="text"
              readOnly
              value={shareUrl}
              className="w-full bg-transparent font-mono text-xs text-foreground outline-none"
            />
          </div>
          <button
            type="button"
            onClick={copyToClipboard}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl bg-foreground text-background shadow-lg transition-transform hover:scale-105 active:scale-95"
            aria-label="Copy to clipboard"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
        {copied && (
          <p className="mt-2 text-center font-sans text-[10px] font-bold uppercase tracking-wider text-green-500 dark:text-green-400">
            Copied to clipboard!
          </p>
        )}
      </div>

      <div>
        <h4 className="mb-3 font-sans text-[10px] font-bold uppercase tracking-wider text-foreground/40">
          Share via
        </h4>
        <div className="grid grid-cols-4 gap-2">
          {shareChannels.map((c) => {
            const Icon = c.icon
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => shareVia(c.channel as ShareChannel)}
                className={`flex flex-col items-center justify-center gap-2 rounded-xl border border-foreground/5 bg-foreground/[0.02] p-3 transition-colors ${c.color}`}
                aria-label={`Share via ${c.name}`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-sans text-[10px] font-medium">
                  {c.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}
