export function round(x, nth = 1) {
  if (nth < 1) return 0;
  return Math.round(x * nth) / nth;
}
