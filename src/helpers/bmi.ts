export const getBmiValue = (height: number, weight: number) => {
  const convertHeightToMeter = height / 100;
  return Number((weight / Math.pow(convertHeightToMeter, 2)).toFixed(2));
};
