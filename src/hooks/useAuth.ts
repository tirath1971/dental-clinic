import { useCallback } from 'react';
import { useSyncExternalStore } from 'react';
import { getSession, login as doLogin, logout as doLogout, subscribe } from '@/lib/auth';
import type { StaffSession } from '@/lib/auth';

/** Live mock staff session with login/logout actions. */
export function useAuth() {
  const session = useSyncExternalStore<StaffSession | null>(
    subscribe,
    getSession,
    getSession,
  );

  const login = useCallback((email: string) => doLogin(email), []);
  const logout = useCallback(() => doLogout(), []);

  return { session, isAuthenticated: !!session, login, logout };
}
