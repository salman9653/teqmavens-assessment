import type { AccentColor, DriveMode, LapData } from "@/lib/types"

export type { AccentColor, DriveMode, LapData } from "@/lib/types"

export const LAPS_DATA: LapData[] = [
  {
    id: 'lap-01',
    label: 'LAP 01',
    zoneName: 'Speed Zone',
    topSpeed: 340,
    power: 600,
    torque: 720,
    zeroToHundred: 3.4,
    oilChange: 2500,
    range: 510,
    description: 'Full Throttle. Maximum Velocity.'
  },
  {
    id: 'lap-02',
    label: 'LAP 02',
    zoneName: 'Acceleration Zone',
    topSpeed: 295,
    power: 640,
    torque: 810,
    zeroToHundred: 2.9,
    oilChange: 2200,
    range: 460,
    description: 'Rapid Launch. Peak Throttle Response.'
  },
  {
    id: 'lap-03',
    label: 'LAP 03',
    zoneName: 'Technical Section',
    topSpeed: 352,
    power: 620,
    torque: 780,
    zeroToHundred: 3.2,
    oilChange: 2450,
    range: 520,
    description: 'Precision. Power. Performance.'
  },
  {
    id: 'lap-04',
    label: 'LAP 04',
    zoneName: 'High Speed Zone',
    topSpeed: 325,
    power: 610,
    torque: 760,
    zeroToHundred: 3.1,
    oilChange: 2400,
    range: 490,
    description: 'Aerodynamic Balance. Stable Downforce.'
  },
  {
    id: 'lap-05',
    label: 'LAP 05',
    zoneName: 'Final Corner',
    topSpeed: 190,
    power: 530,
    torque: 710,
    zeroToHundred: 3.9,
    oilChange: 3000,
    range: 620,
    description: 'Apex Focus. Peak Lateral Cornering.'
  }
]

export const DRIVE_MODES: DriveMode[] = [
  {
    id: 'comfort',
    name: 'Comfort',
    description: 'Smooth power delivery and optimized efficiency for daily cruising.',
    speedMultiplier: 0.85,
    powerMultiplier: 0.8,
    torqueMultiplier: 0.85,
    rangeMultiplier: 1.15,
    zeroToHundredMultiplier: 1.2
  },
  {
    id: 'sport',
    name: 'Sport',
    description: 'Enhanced throttle response and stiffened suspension for energetic driving.',
    speedMultiplier: 0.95,
    powerMultiplier: 0.95,
    torqueMultiplier: 0.95,
    rangeMultiplier: 0.95,
    zeroToHundredMultiplier: 0.98
  },
  {
    id: 'track',
    name: 'Track',
    description: 'Unleash full mechanical limits. Maximum aero and raw performance.',
    speedMultiplier: 1.0,
    powerMultiplier: 1.0,
    torqueMultiplier: 1.0,
    rangeMultiplier: 1.0,
    zeroToHundredMultiplier: 1.0
  },
  {
    id: 'drift',
    name: 'Drift',
    description: 'Rear-biased torque distribution. ESC settings relaxed for controlled slides.',
    speedMultiplier: 0.9,
    powerMultiplier: 1.0,
    torqueMultiplier: 1.15,
    rangeMultiplier: 0.75,
    zeroToHundredMultiplier: 1.05
  }
]

export const ACCENT_COLORS: AccentColor[] = [
  {
    id: 'red',
    name: 'Crimson Red',
    hex: '#ef4444',
    hsl: '0 84.2% 60.2%',
    glow: 'rgba(239, 68, 68, 0.45)'
  },
  {
    id: 'cyan',
    name: 'Apex Cyan',
    hex: '#06b6d4',
    hsl: '188.1 86.1% 42.4%',
    glow: 'rgba(6, 182, 212, 0.45)'
  },
  {
    id: 'gold',
    name: 'Velocity Gold',
    hex: '#eab308',
    hsl: '45.5 93.4% 47.8%',
    glow: 'rgba(234, 179, 8, 0.45)'
  },
  {
    id: 'green',
    name: 'Circuit Green',
    hex: '#22c55e',
    hsl: '142.1 76.2% 45.3%',
    glow: 'rgba(34, 197, 94, 0.45)'
  }
]

export const DEFAULT_LAP = LAPS_DATA[2]
export const DEFAULT_DRIVE_MODE = DRIVE_MODES[2]
export const DEFAULT_ACCENT_COLOR = ACCENT_COLORS[0]
