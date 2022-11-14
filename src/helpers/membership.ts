import { getLineDownValue, getLineUpValue } from "helpers/line";
import { IBloodPressure, IBmi, IHeartBeat, IOutput } from "types/health.model";

export const getBmiMembership = (value: number) => {
  const res: IBmi = {
    underweight: 0,
    medium: 0,
    overweight: 0,
    fat: 0
  };

  if (value <= 18.5) {
    if (value <= 18) res["underweight"] = 1;
    else res["underweight"] = getLineDownValue(18, 18.5, value);
  }

  if (18 <= value && value <= 25.5) {
    if (18 <= value && value < 18.5)
      res["medium"] = getLineUpValue(18, 18.5, value);
    else if (18.5 <= value && value <= 25) res["medium"] = 1;
    else res["medium"] = getLineDownValue(25, 25.5, value);
  }

  if (25 <= value && value <= 30.5) {
    if (25 <= value && value < 25.5)
      res["overweight"] = getLineUpValue(25, 25.5, value);
    else if (25.5 <= value && value <= 30) res["overweight"] = 1;
    else res["overweight"] = getLineDownValue(30, 30.5, value);
  }

  if (value >= 30) {
    if (30 <= value && value < 30.5)
      res["fat"] = getLineUpValue(30, 30.5, value);
    else res["fat"] = 1;
  }

  return res;
};

export const getHeartBeatMembership = (value: number) => {
  const res: IHeartBeat = {
    low: 0,
    medium: 0,
    high: 0
  };

  if (value <= 55) {
    if (value <= 50) res["low"] = 1;
    else res["low"] = getLineDownValue(50, 55, value);
  }

  if (50 <= value && value <= 85) {
    if (50 <= value && value < 55)
      res["medium"] = getLineUpValue(50, 55, value);
    else if (50 <= value && value <= 80) res["medium"] = 1;
    else res["medium"] = getLineDownValue(80, 85, value);
  }

  if (value >= 80) {
    if (80 <= value && value < 85) res["high"] = getLineUpValue(80, 85, value);
    else res["high"] = 1;
  }

  return res;
};

export const getBloodPressureMembership = (value: number) => {
  const res: IBloodPressure = {
    low: 0,
    medium: 0,
    high: 0
  };

  if (value <= 95) {
    if (value <= 90) res["low"] = 1;
    else res["low"] = getLineDownValue(90, 95, value);
  }

  if (90 <= value && value <= 130) {
    if (90 <= value && value < 95)
      res["medium"] = getLineUpValue(90, 95, value);
    else if (90 <= value && value <= 125) res["medium"] = 1;
    else res["medium"] = getLineDownValue(125, 130, value);
  }

  if (value >= 125) {
    if (125 <= value && value < 130)
      res["high"] = getLineUpValue(125, 130, value);
    else res["high"] = 1;
  }

  return res;
};

export const getOutputMembership = (xValue: number) => {
  const output: IOutput = {
    unhealthy: 0,
    lessHealthy: 0,
    somewhatHealthy: 0,
    healthy: 0
  };

  if (0 <= xValue && xValue <= 0.4) {
    if (0 <= xValue && xValue <= 0.2)
      output["unhealthy"] = getLineUpValue(0, 0.2, xValue);
    else output["unhealthy"] = getLineDownValue(0.2, 0.4, xValue);
  }

  if (0.2 <= xValue && xValue <= 0.6) {
    if (0.2 <= xValue && xValue <= 0.4)
      output["lessHealthy"] = getLineUpValue(0.2, 0.4, xValue);
    else output["lessHealthy"] = getLineDownValue(0.4, 0.6, xValue);
  }

  if (0.4 <= xValue && xValue <= 0.8) {
    if (0.4 <= xValue && xValue <= 0.6)
      output["somewhatHealthy"] = getLineUpValue(0.4, 0.6, xValue);
    else output["somewhatHealthy"] = getLineDownValue(0.6, 0.8, xValue);
  }

  if (0.6 <= xValue && xValue <= 1) {
    if (0.6 <= xValue && xValue <= 0.8)
      output["healthy"] = getLineUpValue(0.6, 0.8, xValue);
    else output["healthy"] = getLineDownValue(0.8, 1, xValue);
  }

  const res = [];
  for (const [key, value] of Object.entries(output)) {
    if (value !== 0) res.push(`${value * 100}% ${key}`);
  }

  return res.join().replaceAll(",", " và ");
};
