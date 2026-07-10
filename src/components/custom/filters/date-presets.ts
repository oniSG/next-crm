import {
  endOfMonth,
  format,
  isSameDay,
  isValid,
  parse,
  startOfMonth,
  subDays,
  subMonths,
} from "date-fns";

export type DateRange = {
  from: Date;
  to: Date;
};

export type PresetKey =
  | "today"
  | "yesterday"
  | "last-7-days"
  | "last-30-days"
  | "last-90-days"
  | "this-month"
  | "last-month";

export type Preset = {
  key: PresetKey;
  label: string;
  getRange: (today: Date) => DateRange;
};

export const PRESETS: Preset[] = [
  {
    key: "today",
    label: "Today",
    getRange: (t) => ({ from: t, to: t }),
  },
  {
    key: "yesterday",
    label: "Yesterday",
    getRange: (t) => {
      const y = subDays(t, 1);
      return { from: y, to: y };
    },
  },
  {
    key: "last-7-days",
    label: "Last 7 days",
    getRange: (t) => ({ from: subDays(t, 6), to: t }),
  },
  {
    key: "last-30-days",
    label: "Last 30 days",
    getRange: (t) => ({ from: subDays(t, 29), to: t }),
  },
  {
    key: "last-90-days",
    label: "Last 90 days",
    getRange: (t) => ({ from: subDays(t, 89), to: t }),
  },
  {
    key: "this-month",
    label: "This month",
    getRange: (t) => ({ from: startOfMonth(t), to: t }),
  },
  {
    key: "last-month",
    label: "Last month",
    getRange: (t) => {
      const prev = subMonths(t, 1);
      return { from: startOfMonth(prev), to: endOfMonth(prev) };
    },
  },
];

export function findPresetKey(
  range: DateRange,
  today: Date,
): PresetKey | "custom" {
  for (const preset of PRESETS) {
    const r = preset.getRange(today);
    if (isSameDay(r.from, range.from) && isSameDay(r.to, range.to)) {
      return preset.key;
    }
  }
  return "custom";
}

const INPUT_FORMAT = "d MMM yyyy";

export function formatDateInput(date: Date): string {
  return format(date, INPUT_FORMAT);
}

export function parseDateInput(input: string): Date | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const parsed = parse(trimmed, INPUT_FORMAT, new Date());
  return isValid(parsed) ? parsed : null;
}

export function formatDateRange(range: DateRange): string {
  const sameYear = range.from.getFullYear() === range.to.getFullYear();
  const from = format(range.from, sameYear ? "d MMM" : "d MMM yyyy");
  const to = format(range.to, "d MMM yyyy");
  return `${from} – ${to}`;
}
