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

/** Friendly human-readable date, e.g. "Mon, Jun 1, 2026". */
export function formatLongDate(iso: string): string {
  return fromISODate(iso).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/** Convert a 24h slot label to a friendly 12h time, e.g. "09:30" -> "9:30 AM". */
export function formatTime(slot: string): string {
  const [h, m] = slot.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s()-]{6,}$/;

export type PatientErrors = Partial<Record<keyof PatientInfo, string>>;

/** Validate the patient details form; returns a map of field -> error message. */
export function validatePatient(patient: PatientInfo): PatientErrors {
  const errors: PatientErrors = {};
  if (!patient.name.trim()) {
    errors.name = 'Please enter your full name.';
  } else if (patient.name.trim().length < 2) {
    errors.name = 'Name looks too short.';
  }
  if (!patient.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!EMAIL_RE.test(patient.email.trim())) {
    errors.email = 'That email address looks invalid.';
  }
  if (!patient.phone.trim()) {
    errors.phone = 'Please enter a contact number.';
  } else if (!PHONE_RE.test(patient.phone.trim())) {
    errors.phone = 'That phone number looks invalid.';
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
