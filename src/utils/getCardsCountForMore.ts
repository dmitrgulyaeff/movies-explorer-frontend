export const getCardsCountForMore = (width: number) => {
  if (width < 500) return 2;
  if (width < 900) return 2;
  if (width < 1100) return 3;
  if (width < 1400) return 4;
  return 5;
};
