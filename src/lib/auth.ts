/**
 * Mock staff authentication.
 *
 * This is a demo gate only — ANY non-empty email/password is accepted and the
 * "session" is just a flag in sessionStorage (cleared when the tab closes).
 * Replace with real auth (token + protected API) before production; the
 * component API (useAuth) can stay the same.
 */

export interface StaffSession {
  email: string;
  signedInAt: string;
}

const KEY = 'shining-pearls:staff-session';
const CHANGE_EVENT = 'shining-pearls:auth-changed';

let snapshot: StaffSession | null | undefined;

function read(): StaffSession | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as StaffSession) : null;
  } catch {
    return null;
  }
}

export function getSession(): StaffSession | null {
  if (snapshot === undefined) snapshot = read();
  return snapshot;
}

export function login(email: string): StaffSession {
  const session: StaffSession = {
    email: email.trim(),
    signedInAt: new Date().toISOString(),
  };
  sessionStorage.setItem(KEY, JSON.stringify(session));
  snapshot = session;
  window.dispatchEvent(new Event(CHANGE_EVENT));
  return session;
}

export function logout(): void {
  sessionStorage.removeItem(KEY);
  snapshot = null;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribe(listener: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, listener);
  return () => window.removeEventListener(CHANGE_EVENT, listener);
}
