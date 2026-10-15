import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import utc from "dayjs/plugin/utc.js";

dayjs.extend(customParseFormat);
dayjs.extend(utc);

const FORMATS = [
  "YYYY-MM-DD",
  "YYYY/MM/DD",
  "YYYY.MM.DD",
  "YYYYMMDD",
  "DD/MM/YYYY",
  "DD-MM-YYYY",
  "DD.MM.YYYY",
  "D/M/YYYY",
  "D-M-YYYY",
  "D MMMM YYYY",
  "D MMM YYYY",
  "MMMM D, YYYY",
  "MMM D, YYYY",
  "DD/MM/YY",
  "DD-MM-YY",
];

const HAS_TIMEZONE = /(Z|GMT|UTC|[+-]\d{2}:?\d{2})$/i;
const MIN_YEAR = 1900;
const MAX_YEAR = 2100;

const toMidnightUtc = (y: number, m: number, d: number) =>
  new Date(Date.UTC(y, m, d));

export const parseAnyDate = (value: unknown): Date | null => {
  let result: Date | null = null;

  if (value instanceof Date) {
    if (!Number.isNaN(value.getTime())) {
      result = toMidnightUtc(
        value.getUTCFullYear(),
        value.getUTCMonth(),
        value.getUTCDate(),
      );
    }
  } else if (
    typeof value === "number" ||
    (typeof value === "string" && /^\d{10}(\d{3})?$/.test(value.trim()))
  ) {
    // Epoch: 10 digits = seconds, 13 digits = milliseconds
    const n = Number(value);
    const d = new Date(n < 1e11 ? n * 1000 : n);
    if (!Number.isNaN(d.getTime())) {
      result = toMidnightUtc(
        d.getUTCFullYear(),
        d.getUTCMonth(),
        d.getUTCDate(),
      );
    }
  } else if (typeof value === "string") {
    const input = value.trim().replace(/\s+/g, " ");
    if (!input) return null;

    // 1) Explicit formats, strict mode (rejects 30/02/2024)
    for (const format of FORMATS) {
      const p = dayjs.utc(input, format, true);
      if (p.isValid()) {
        result = toMidnightUtc(p.year(), p.month(), p.date());
        break;
      }
    }

    // 2) Fallback: ISO timestamps, RFC 2822, toString() output, etc.
    //    The 4-digit-year check blocks junk like "1" that V8 accepts.
    if (!result && /\d{4}/.test(input)) {
      const d = new Date(input);
      if (!Number.isNaN(d.getTime())) {
        // With an explicit timezone, use the UTC date; without one, JS parsed
        // it as local time, so use the date exactly as written.
        result = HAS_TIMEZONE.test(input)
          ? toMidnightUtc(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
          : toMidnightUtc(d.getFullYear(), d.getMonth(), d.getDate());
      }
    }
  }

  if (!result) return null;
  const year = result.getUTCFullYear();
  return year >= MIN_YEAR && year <= MAX_YEAR ? result : null;
};
