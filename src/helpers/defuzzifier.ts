export const getDefuzzifierResult = (ruleFunction: number[]) => {
  const midpointSet = [0.2, 0.4, 0.6, 0.8];

  let xiAi = 0;
  ruleFunction.forEach((item, index) => {
    xiAi += item * midpointSet[index];
  });

  const Ai = ruleFunction.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );

  return Number((xiAi / Ai).toFixed(3));
};
