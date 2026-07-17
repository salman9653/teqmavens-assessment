import { motion } from "framer-motion"
import { Power } from "lucide-react"

interface HomeViewProps {
  onIgnite: () => void
}

export function HomeView({ onIgnite }: HomeViewProps) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[90vh] z-10 select-none text-center px-4 overflow-hidden">
      <motion.div
        animate={{ 
          scale: [0.95, 1.05, 0.95],
          rotate: [0, 360],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 40, repeat: Infinity, ease: "linear" },
          opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute w-[320px] h-[320px] md:w-[480px] md:h-[480px] rounded-full border border-dashed pointer-events-none"
        style={{ borderColor: "var(--brand-hex)", opacity: 0.15 }}
      />
      
      <motion.div
        animate={{ 
          scale: [1.02, 0.98, 1.02],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[280px] h-[280px] md:w-[400px] md:h-[400px] rounded-full bg-radial from-transparent to-transparent pointer-events-none blur-2xl"
        style={{ backgroundImage: "radial-gradient(circle, var(--brand-glow) 0%, transparent 65%)", opacity: 0.2 }}
      />

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-4 mb-12"
      >
        <div className="flex items-center justify-center gap-1.5 font-mono text-3xl md:text-4xl font-black uppercase tracking-[0.3em] text-foreground">
          NEXT<span className="text-red-500 brand-text-glow" style={{ color: "var(--brand-hex)" }}>CAR</span>
        </div>
        <div className="text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.6em] text-foreground/45">
          Drive Next — Experience Precision
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, type: "spring" }}
        className="group relative"
      >
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-4 rounded-full border blur-sm pointer-events-none transition-colors"
          style={{ borderColor: "var(--brand-hex)" }}
        />

        <div 
          className="absolute -inset-1 rounded-full opacity-60 group-hover:opacity-100 blur-md transition-opacity duration-300 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, var(--brand-glow) 0%, transparent 70%)" }}
        />

        <motion.button
          type="button"
          onClick={onIgnite}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-36 h-36 md:w-44 md:h-44 rounded-full flex flex-col items-center justify-center gap-3 border bg-background text-foreground font-mono font-bold tracking-widest uppercase transition-all duration-300 shadow-2xl cursor-pointer z-10 hover:brightness-110"
          style={{ borderColor: "var(--brand-hex)" }}
        >
          <Power className="w-8 h-8 md:w-10 md:h-10 animate-pulse-slow" style={{ color: "var(--brand-hex)" }} />
          <span className="text-[10px] md:text-xs tracking-[0.25em] font-black mt-1" style={{ color: "var(--brand-hex)" }}>
            Ignite Engine
          </span>
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-8 text-[9px] md:text-[10px] font-mono tracking-widest uppercase text-foreground"
      >
        Systems Online — All Circuits Optimal
      </motion.div>
    </div>
  )
}
