export interface IHealth {
  height: number;
  weight: number;
  heartbeat: number;
  systolic: number;
  diastolic: number;
}

export interface IBmi {
  underweight: number;
  medium: number;
  overweight: number;
  fat: number;
}

export interface IHeartBeat {
  low: number;
  medium: number;
  high: number;
}

export type IBloodPressure = IHeartBeat;

export interface IOutput {
  unhealthy: number;
  lessHealthy: number;
  somewhatHealthy: number;
  healthy: number;
}
