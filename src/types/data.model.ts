export type IBmiConstant = "underweight" | "medium" | "overweight" | "fat";
export type IHeartBearConstant = "low" | "medium" | "high";
export type IBloodPressureConstant = IHeartBearConstant;
export type IOutputConstant =
  | "unhealthy"
  | "lessHealthy"
  | "somewhatHealthy"
  | "healthy";

export interface IData {
  bmi: IBmiConstant;
  heartbeat: IHeartBearConstant;
  bloodpressure: IBloodPressureConstant;
  result: IOutputConstant;
}
