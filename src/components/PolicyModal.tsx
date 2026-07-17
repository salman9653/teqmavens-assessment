import { ShieldCheck } from "lucide-react"
import { Modal } from "@/components/Modal"

interface PolicyModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PolicyModal({ isOpen, onClose }: PolicyModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} titleId="policy-title">
      <div className="mb-6 flex items-center gap-3">
        <div
          className="rounded-lg p-2"
          style={{ color: "var(--brand-hex)", backgroundColor: "var(--brand-glow)" }}
        >
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div>
          <h3
            id="policy-title"
            className="font-mono text-lg font-bold uppercase tracking-wider text-foreground"
          >
            System Policies
          </h3>
          <p className="font-sans text-xs text-foreground/50">
            Licensing & Assessment Information
          </p>
        </div>
      </div>

      <div className="space-y-4 font-mono text-sm text-foreground/80">
        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-4">
          <p className="mb-2 font-bold uppercase tracking-widest text-foreground">
            NEXTCAR Platform v4.0.0
          </p>
          <p>
            Licensed under TEQMAVENS assessment protocols. All telemetry data and 
            system diagnostics are recorded in compliance with standard assessment guidelines.
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="flex cursor-pointer items-center justify-center rounded-xl bg-foreground px-6 py-3 font-sans text-xs font-bold uppercase tracking-wider text-background shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          Acknowledge
        </button>
      </div>
    </Modal>
  )
}
