export const trimString = (str: string, maxSize: number): string => {
  if (!str) {
    return '';
  }
  if (str.length <= maxSize) {
    return str;
  }
  return `${str.slice(0, maxSize)}...`;
};
