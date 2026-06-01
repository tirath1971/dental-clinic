import { Fragment } from 'react';
import { Check, CheckCheck, X } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { StatusPill } from '@/components/ui/StatusPill';
import { formatLongDate, formatTime } from '@/lib/booking';
import { DOCTORS, SERVICES } from '@/data/seed';
import { cn } from '@/lib/cn';
import type { Appointment, AppointmentStatus } from '@/types';

interface AppointmentsTableProps {
  appointments: Appointment[];
  onUpdateStatus: (id: string, status: AppointmentStatus) => void;
}

const serviceName = (id: string) => SERVICES.find((s) => s.id === id)?.name ?? '—';
const doctorName = (id: string) => DOCTORS.find((d) => d.id === id)?.name ?? '—';

/** Per-status quick actions available to staff. */
const ACTIONS: {
  status: AppointmentStatus;
  label: string;
  icon: typeof Check;
  className: string;
}[] = [
  { status: 'confirmed', label: 'Confirm', icon: Check, className: 'text-clinical-700 hover:bg-clinical-50' },
  { status: 'completed', label: 'Complete', icon: CheckCheck, className: 'text-mint-500 hover:bg-mint-100' },
  { status: 'cancelled', label: 'Cancel', icon: X, className: 'text-rose-600 hover:bg-rose-50' },
];

export function AppointmentsTable({ appointments, onUpdateStatus }: AppointmentsTableProps) {
  if (appointments.length === 0) {
    return (
      <Card className="p-10 text-center">
        <p className="text-sm text-slate-500">No appointments match these filters.</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-pearl-300 bg-pearl-100/70 text-xs uppercase tracking-wide text-slate-500">
              <th scope="col" className="px-5 py-3 font-semibold">Date</th>
              <th scope="col" className="px-5 py-3 font-semibold">Time</th>
              <th scope="col" className="px-5 py-3 font-semibold">Patient</th>
              <th scope="col" className="px-5 py-3 font-semibold">Service</th>
              <th scope="col" className="px-5 py-3 font-semibold">Dentist</th>
              <th scope="col" className="px-5 py-3 font-semibold">Status</th>
              <th scope="col" className="px-5 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-pearl-200">
            {appointments.map((apt) => (
              <tr key={apt.id} className="transition-colors hover:bg-pearl-100/60">
                <td className="whitespace-nowrap px-5 py-3 text-slate-700">
                  {formatLongDate(apt.date)}
                </td>
                <td className="whitespace-nowrap px-5 py-3 font-medium text-slate-900">
                  {formatTime(apt.timeSlot)}
                </td>
                <td className="px-5 py-3">
                  <div className="font-medium text-slate-900">{apt.patient.name}</div>
                  <div className="text-xs text-slate-400">{apt.patient.email}</div>
                </td>
                <td className="px-5 py-3 text-slate-600">{serviceName(apt.serviceId)}</td>
                <td className="px-5 py-3 text-slate-600">{doctorName(apt.doctorId)}</td>
                <td className="px-5 py-3">
                  <StatusPill status={apt.status} />
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    {ACTIONS.map(({ status, label, icon: Icon, className }) => (
                      <Fragment key={status}>
                        <button
                          type="button"
                          onClick={() => onUpdateStatus(apt.id, status)}
                          disabled={apt.status === status}
                          title={label}
                          aria-label={`${label} appointment for ${apt.patient.name}`}
                          className={cn(
                            'grid h-8 w-8 place-items-center rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-30',
                            className,
                          )}
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </Fragment>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
