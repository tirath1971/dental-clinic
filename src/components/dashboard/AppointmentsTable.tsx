import { Fragment } from 'react';
import { Check, CheckCheck, X } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { StatusPill } from '@/components/ui/StatusPill';
import { formatLongDate, formatTime } from '@/lib/booking';
import { DOCTORS, SERVICES } from '@/data/seed';
import { useI18n } from '@/i18n/context';
import { cn } from '@/lib/cn';
import type { Appointment, AppointmentStatus } from '@/types';

interface AppointmentsTableProps {
  appointments: Appointment[];
  onUpdateStatus: (id: string, status: AppointmentStatus) => void;
}

const serviceIcon = (id: string) => SERVICES.find((s) => s.id === id)?.icon;
const doctorName = (id: string) => DOCTORS.find((d) => d.id === id)?.name ?? '—';

/** Per-status quick actions available to staff. */
const ACTIONS: {
  status: AppointmentStatus;
  labelKey: string;
  icon: typeof Check;
  className: string;
}[] = [
  { status: 'confirmed', labelKey: 'action.confirm', icon: Check, className: 'text-clinical-700 hover:bg-clinical-50' },
  { status: 'completed', labelKey: 'action.complete', icon: CheckCheck, className: 'text-mint-500 hover:bg-mint-100' },
  { status: 'cancelled', labelKey: 'action.cancel', icon: X, className: 'text-rose-600 hover:bg-rose-50' },
];

export function AppointmentsTable({ appointments, onUpdateStatus }: AppointmentsTableProps) {
  const { t, locale } = useI18n();
  const serviceName = (id: string) => {
    const icon = serviceIcon(id);
    return icon ? t(`services.${icon}.name`) : '—';
  };

  if (appointments.length === 0) {
    return (
      <Card className="p-10 text-center">
        <p className="text-sm text-slate-500">{t('table.empty')}</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-pearl-300 bg-pearl-100/70 text-xs uppercase tracking-wide text-slate-500">
              <th scope="col" className="px-5 py-3 font-semibold">{t('table.date')}</th>
              <th scope="col" className="px-5 py-3 font-semibold">{t('table.time')}</th>
              <th scope="col" className="px-5 py-3 font-semibold">{t('table.patient')}</th>
              <th scope="col" className="px-5 py-3 font-semibold">{t('table.service')}</th>
              <th scope="col" className="px-5 py-3 font-semibold">{t('table.dentist')}</th>
              <th scope="col" className="px-5 py-3 font-semibold">{t('table.status')}</th>
              <th scope="col" className="px-5 py-3 text-right font-semibold">{t('table.actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-pearl-200">
            {appointments.map((apt) => (
              <tr key={apt.id} className="transition-colors hover:bg-pearl-100/60">
                <td className="whitespace-nowrap px-5 py-3 text-slate-700">
                  {formatLongDate(apt.date, locale)}
                </td>
                <td className="whitespace-nowrap px-5 py-3 font-medium text-slate-900">
                  {formatTime(apt.timeSlot, locale)}
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
                    {ACTIONS.map(({ status, labelKey, icon: Icon, className }) => {
                      const label = t(labelKey);
                      return (
                      <Fragment key={status}>
                        <button
                          type="button"
                          onClick={() => onUpdateStatus(apt.id, status)}
                          disabled={apt.status === status}
                          title={label}
                          aria-label={t('action.aria', { action: label, name: apt.patient.name })}
                          className={cn(
                            'grid h-8 w-8 place-items-center rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-30',
                            className,
                          )}
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </Fragment>
                      );
                    })}
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
