import { useCallback, useSyncExternalStore } from 'react';
import {
  getAppointments,
  subscribe,
  updateAppointmentStatus as setStatus,
} from '@/lib/storage';
import type { Appointment, AppointmentStatus } from '@/types';

/**
 * Live view of appointments from the mock backend. Re-renders whenever a
 * booking is created or a status changes — in this tab or another.
 */
export function useAppointments() {
  const appointments = useSyncExternalStore<Appointment[]>(
    subscribe,
    getAppointments,
    getAppointments,
  );

  const updateStatus = useCallback((id: string, status: AppointmentStatus) => {
    setStatus(id, status);
  }, []);

  return { appointments, updateStatus };
}
