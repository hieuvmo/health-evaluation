import { OUTPUT } from "constants/label";
import { IBloodPressure, IBmi, IHeartBeat } from "types/health.model";
import { getEvaluationResult } from "./rules";
import { getBloodPressureMembership } from "helpers/membership";

// xứ lý bước 4
export const getRuleFunctionByFuzzifier = (
  bmi: IBmi,
  heartbeat: IHeartBeat,
  bloodPressure: IBloodPressure
) => {
  // trả về kết quả cột 4, 6 bước 4
  let evaluationLabelAndValue = [];
  for (const [key1, value1] of Object.entries(bmi)) {
    for (const [key2, value2] of Object.entries(heartbeat)) {
      for (const [key3, value3] of Object.entries(bloodPressure)) {
        if (value1 !== 0 && value2 !== 0 && value3 !== 0) {
          evaluationLabelAndValue.push({
            label: getEvaluationResult(key1, key2, key3),
            value: Math.min(value1, value2, value3)
          });
        }
      }
    }
  }

  //trả về hàm quy tắc f = {U, LH, SH, H}
  let res = [0, 0, 0, 0];
  evaluationLabelAndValue.forEach((item) => {
    if (item.label === OUTPUT.UNHEALTHY)
      res.splice(0, 1, Math.max(res[0], item.value));
    if (item.label === OUTPUT.LESS_HEALTHY)
      res.splice(1, 1, Math.max(res[1], item.value));
    if (item.label === OUTPUT.SOMEWHAT_HEALTHY)
      res.splice(2, 1, Math.max(res[2], item.value));
    if (item.label === OUTPUT.HEALTHY)
      res.splice(3, 1, Math.max(res[3], item.value));
  });
  return res;
};
