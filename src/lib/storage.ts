import type { Appointment, NewAppointment } from '@/types';
import { DEMO_APPOINTMENTS } from '@/data/seed';

/**
 * Mock backend backed by localStorage.
 *
 * Every function here is the seam where a real API would slot in. Each is
 * synchronous today; swapping to `fetch`/async is a localized change (see
 * README "Plugging in a real backend").
 */

const STORAGE_KEY = 'shining-pearls:appointments:v1';
const SEEDED_KEY = 'shining-pearls:seeded:v1';

/** Notify hooks in this tab when appointments change (storage event only fires cross-tab). */
const CHANGE_EVENT = 'shining-pearls:appointments-changed';

function read(): Appointment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Appointment[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(appointments: Appointment[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  snapshot = null; // invalidate cache
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/**
 * Cached, referentially-stable snapshot for useSyncExternalStore. We only
 * rebuild the array when the underlying data changes (via write / cross-tab
 * storage events), so getAppointments returns the same reference otherwise.
 */
let snapshot: Appointment[] | null = null;

/** Seed demo appointments exactly once so the dashboard isn't empty on first load. */
export function ensureSeeded(): void {
  if (localStorage.getItem(SEEDED_KEY)) return;
  if (read().length === 0) {
    write(DEMO_APPOINTMENTS);
  }
  localStorage.setItem(SEEDED_KEY, '1');
}

export function getAppointments(): Appointment[] {
  if (snapshot) return snapshot;
  snapshot = read().sort((a, b) =>
    a.date === b.date
      ? a.timeSlot.localeCompare(b.timeSlot)
      : a.date.localeCompare(b.date),
  );
  return snapshot;
}

/** True when the given doctor/date/slot is already taken by an active booking. */
export function isSlotTaken(
  doctorId: string,
  date: string,
  timeSlot: string,
): boolean {
  return read().some(
    (a) =>
      a.doctorId === doctorId &&
      a.date === date &&
      a.timeSlot === timeSlot &&
      a.status !== 'cancelled',
  );
}

export function createAppointment(input: NewAppointment): Appointment {
  // Guard against a race / double-submit creating a duplicate booking.
  if (isSlotTaken(input.doctorId, input.date, input.timeSlot)) {
    throw new SlotTakenError();
  }
  const appointment: Appointment = {
    ...input,
    id: `apt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  write([...read(), appointment]);
  return appointment;
}

export function updateAppointmentStatus(
  id: string,
  status: Appointment['status'],
): void {
  write(read().map((a) => (a.id === id ? { ...a, status } : a)));
}

/** Subscribe to appointment changes (same tab + other tabs). Returns an unsubscribe. */
export function subscribe(listener: () => void): () => void {
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      snapshot = null; // another tab changed the data
      listener();
    }
  };
  window.addEventListener(CHANGE_EVENT, listener);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, listener);
    window.removeEventListener('storage', onStorage);
  };
}

/** Thrown when attempting to book a slot that is already taken. */
export class SlotTakenError extends Error {
  constructor() {
    super('That time slot has just been taken. Please choose another.');
    this.name = 'SlotTakenError';
  }
}
