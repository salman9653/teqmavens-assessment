import type { DriveMode, LapData } from "@/lib/types"

export interface TelemetryMetrics {
  topSpeed: number
  power: number
  torque: number
  zeroToHundred: number
  oilChange: number
  range: number
}

export function calculateTelemetryMetrics(
  lap: LapData,
  driveMode: DriveMode,
): TelemetryMetrics {
  return {
    topSpeed: Math.round(lap.topSpeed * driveMode.speedMultiplier),
    power: Math.round(lap.power * driveMode.powerMultiplier),
    torque: Math.round(lap.torque * driveMode.torqueMultiplier),
    zeroToHundred: Number(
      (lap.zeroToHundred * driveMode.zeroToHundredMultiplier).toFixed(1),
    ),
    oilChange: Math.round((lap.oilChange * driveMode.rangeMultiplier) / 100) * 100,
    range: Math.round(lap.range * driveMode.rangeMultiplier),
  }
}
