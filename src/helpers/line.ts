export const getLineUpValue = (small: number, big: number, x: number) => {
  return Number(((x - small) / (big - small)).toFixed(2));
};

export const getLineDownValue = (small: number, big: number, x: number) => {
  return Number(((big - x) / (big - small)).toFixed(2));
};
