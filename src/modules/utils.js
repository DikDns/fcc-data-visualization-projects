import { format } from "d3";

export function round(x, nth = 1) {
  if (nth < 1) return 0;
  return Math.round(x * nth) / nth;
}

export function dotFormat(num) {
  return format(",")(num).replace(/,/g, ".");
}

export function formatMonth(month = 0) {
  switch (month) {
    case 0:
      return "Januari";
    case 1:
      return "Februari";
    case 2:
      return "Maret";
    case 3:
      return "April";
    case 4:
      return "Mei";
    case 5:
      return "Juni";
    case 6:
      return "Juli";
    case 7:
      return "Agustus";
    case 8:
      return "September";
    case 9:
      return "Oktober";
    case 10:
      return "November";
    case 11:
      return "Desember";
  }
}

export function sumBySize(d) {
  return d.value;
}
