import LightRays from "@/components/LightRays"
import { Ripple } from "@/components/magicui/Ripple"
import { Particles } from "@/components/ui/Particles"

export function BackgroundEffects() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      
      {/* ReactBits LightRays Component */}
      <LightRays
        raysColor="#ffffff"
        raysOrigin="top-center"
        raysSpeed={0.1}
        lightSpread={0.1}
        rayLength={3}
        fadeDistance={1.5}
        saturation={0.3}
        mouseInfluence={0.1}
        noiseAmount={0}
        distortion={0}
        pulsating={false}
        className="pointer-events-none absolute inset-0 z-[1] opacity-30 mix-blend-screen dark:opacity-100"
      />
      
      {/* Magic UI Particles positioned in the light beam on top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[350px] overflow-hidden opacity-50 z-[2]">
        <Particles
          className="absolute inset-0 h-full w-full mix-blend-screen dark:mix-blend-normal"
          quantity={35}
          ease={70}
          staticity={30}
          size={0.6}
          color="#ffffff"
        />
      </div>
      
      {/* Magic UI Ripple component - customized size and spacing */}
      <Ripple
        mainCircleSize={380}
        numCircles={4}
        spacing={300}
        mainCircleOpacity={0.2}
        className="z-[1]"
      />
      
      <div
        className="pointer-events-none absolute top-[48%] left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial from-transparent to-transparent opacity-30 blur-3xl md:top-1/2"
        style={{ backgroundImage: "radial-gradient(circle, var(--brand-glow) 0%, transparent 60%)" }}
      />
    </div>
  )
}
