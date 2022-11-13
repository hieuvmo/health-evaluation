import { healthEvaluationData } from "constants/db";

//trả về ĐÁNH GIÁ như bước 4
export const getEvaluationResult = (
  bmiLabel: string,
  heartbeatLabel: string,
  bloodPressureLabel: string
) => {
  let res = "";

  healthEvaluationData.forEach((item) => {
    if (
      item.bmi === bmiLabel &&
      item.heartbeat === heartbeatLabel &&
      item.bloodpressure === bloodPressureLabel
    )
      res = item.result;
  });

  return res;
};
