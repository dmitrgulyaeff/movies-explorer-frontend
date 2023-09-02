import { distance } from 'fastest-levenshtein';

export default function getSimilarity(str1: string, str2: string): number {
  const levDistance = distance(str1, str2);

  const maxLength = Math.max(str1.length, str2.length);

  const similarity = 1 - levDistance / maxLength;
  return similarity;
}