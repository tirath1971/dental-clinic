import type { PatientInfo } from '@/types';

/** Clinic working window used to generate bookable time slots. */
const OPEN_HOUR = 9;
const CLOSE_HOUR = 17; // last slot starts before close
const SLOT_MINUTES = 30;

/** Generate the full list of slot labels ("09:00", "09:30", ...) for a day. */
export function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = OPEN_HOUR; h < CLOSE_HOUR; h++) {
    for (let m = 0; m < 60; m += SLOT_MINUTES) {
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }
  return slots;
}

/** ISO date string ("YYYY-MM-DD") for a Date, in local time. */
export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Parse an ISO date string back into a local Date at midnight. */
export function fromISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function isPastDate(iso: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return fromISODate(iso) < today;
}

/** Clinic is closed on Sundays (getDay() === 0). */
export function isClosedDay(date: Date): boolean {
  return date.getDay() === 0;
}

/** Friendly human-readable date, e.g. "Mon, Jun 1, 2026" (locale-aware). */
export function formatLongDate(iso: string, locale?: string): string {
  return fromISODate(iso).toLocaleDateString(locale, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format a 24h slot label for display. English uses 12h ("9:30 AM"); other
 * locales (es) use 24h ("9:30").
 */
export function formatTime(slot: string, locale?: string): string {
  const [h, m] = slot.split(':').map(Number);
  const mm = String(m).padStart(2, '0');
  if (locale && locale.startsWith('es')) {
    return `${h}:${mm}`;
  }
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${mm} ${period}`;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s()-]{6,}$/;

/** Field -> i18n error key (translated at render time by the component). */
export type PatientErrors = Partial<Record<keyof PatientInfo, string>>;

/** Validate the patient details form; returns a map of field -> translation key. */
export function validatePatient(patient: PatientInfo): PatientErrors {
  const errors: PatientErrors = {};
  if (!patient.name.trim()) {
    errors.name = 'err.nameRequired';
  } else if (patient.name.trim().length < 2) {
    errors.name = 'err.nameShort';
  }
  if (!patient.email.trim()) {
    errors.email = 'err.emailRequired';
  } else if (!EMAIL_RE.test(patient.email.trim())) {
    errors.email = 'err.emailInvalid';
  }
  if (!patient.phone.trim()) {
    errors.phone = 'err.phoneRequired';
  } else if (!PHONE_RE.test(patient.phone.trim())) {
    errors.phone = 'err.phoneInvalid';
  }
  return errors;
}

/** Build a `Date[]` for a month grid (always 6 rows × 7 cols = 42 cells). */
export function buildMonthGrid(viewYear: number, viewMonth: number): Date[] {
  const first = new Date(viewYear, viewMonth, 1);
  // Start grid on the Sunday on/before the 1st.
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}
