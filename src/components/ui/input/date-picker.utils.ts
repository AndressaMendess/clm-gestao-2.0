import { onlyDigits } from "./masked-input.utils";

export function formatDateMask(value: string): string {
  const digits = onlyDigits(value).slice(0, 8);
  if (!digits) return "";
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export function parseMaskedDateToIso(maskedValue: string): string | null {
  const [dayString = "", monthString = "", yearString = ""] = maskedValue.split("/");
  if (dayString.length !== 2 || monthString.length !== 2 || yearString.length !== 4) {
    return null;
  }

  const day = Number(dayString);
  const month = Number(monthString);
  const year = Number(yearString);

  if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) {
    return null;
  }

  if (day < 1 || month < 1 || month > 12 || year < 1000 || year > 9999) {
    return null;
  }

  const date = new Date(year, month - 1, day);
  const isValidDate =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  if (!isValidDate) return null;

  const paddedDay = String(day).padStart(2, "0");
  const paddedMonth = String(month).padStart(2, "0");
  return `${yearString}-${paddedMonth}-${paddedDay}`;
}

export function formatIsoToMaskedDate(isoDate: string): string {
  if (!isoDate) return "";
  const [year = "", month = "", day = ""] = isoDate.split("-");
  if (year.length !== 4 || month.length !== 2 || day.length !== 2) return "";
  return `${day}/${month}/${year}`;
}
