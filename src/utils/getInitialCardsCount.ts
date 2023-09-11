export  const getInitialCardsCount = (width: number) => {
  if (width < 900) return 2 * 4;
  if (width < 1100) return 3 * 4;
  if (width < 1400) return 4 * 4;
  return 5 * 3;
};