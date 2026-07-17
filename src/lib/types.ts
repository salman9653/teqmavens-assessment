export type AppView = "home" | "dashboard" | "settings"

export type DownloadState = "idle" | "downloading" | "completed"

export interface LapData {
  id: string
  label: string
  zoneName: string
  topSpeed: number
  power: number
  torque: number
  zeroToHundred: number
  oilChange: number
  range: number
  description: string
}

export interface DriveMode {
  id: "comfort" | "sport" | "track" | "drift"
  name: string
  description: string
  speedMultiplier: number
  powerMultiplier: number
  torqueMultiplier: number
  rangeMultiplier: number
  zeroToHundredMultiplier: number
}

export interface AccentColor {
  id: string
  name: string
  hex: string
  hsl: string
  glow: string
}
