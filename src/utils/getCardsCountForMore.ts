export const getCardsCountForMore = (width: number) => {
  if (width < 500) return 2;
  if (width < 900) return 2;
  if (width < 1100) return 3;
  return 4;
};
