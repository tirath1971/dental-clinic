import { CalendarCheck, CheckCircle2, Clock, Mail, Stethoscope, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { formatLongDate, formatTime } from '@/lib/booking';
import { useI18n } from '@/i18n/context';
import type { Appointment, Doctor, Service } from '@/types';

interface ConfirmationStepProps {
  appointment: Appointment;
  service: Service;
  doctor: Doctor;
  onBookAnother: () => void;
}

export function ConfirmationStep({
  appointment,
  service,
  doctor,
  onBookAnother,
}: ConfirmationStepProps) {
  const { t, locale } = useI18n();
  const rows = [
    { icon: Stethoscope, label: t('conf.treatment'), value: t(`services.${service.icon}.name`) },
    { icon: User, label: t('conf.dentist'), value: doctor.name },
    { icon: CalendarCheck, label: t('conf.date'), value: formatLongDate(appointment.date, locale) },
    { icon: Clock, label: t('conf.time'), value: formatTime(appointment.timeSlot, locale) },
  ];

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="relative grid h-20 w-20 place-items-center rounded-full bg-mint-100">
        <span className="absolute inset-0 animate-ping rounded-full bg-mint-300/40" aria-hidden="true" />
        <CheckCircle2 className="h-11 w-11 text-mint-500" aria-hidden="true" />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-slate-900">{t('conf.title')}</h2>
        <p className="max-w-md text-slate-500">
          {t('conf.subtitle', {
            name: appointment.patient.name.split(' ')[0],
            email: appointment.patient.email,
          })}
        </p>
      </div>

      <Card className="w-full max-w-md overflow-hidden text-left">
        <div className="flex items-center justify-between border-b border-pearl-300 bg-pearl-100/70 px-5 py-3">
          <span className="text-sm font-semibold text-slate-700">{t('conf.summary')}</span>
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-200">
            {t('conf.pending')}
          </span>
        </div>
        <dl className="divide-y divide-pearl-200">
          {rows.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 px-5 py-3">
              <Icon className="h-4 w-4 shrink-0 text-clinical-500" aria-hidden="true" />
              <dt className="w-24 shrink-0 text-sm text-slate-500">{label}</dt>
              <dd className="text-sm font-medium text-slate-900">{value}</dd>
            </div>
          ))}
          <div className="flex items-center gap-3 px-5 py-3">
            <span className="font-mono text-xs text-slate-400">#</span>
            <dt className="w-24 shrink-0 text-sm text-slate-500">{t('conf.reference')}</dt>
            <dd className="font-mono text-xs font-medium text-slate-700">
              {appointment.id}
            </dd>
          </div>
        </dl>
      </Card>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button as="link" to="/">
          {t('common.backToHome')}
        </Button>
        <Button variant="secondary" onClick={onBookAnother}>
          <Mail className="h-4 w-4" aria-hidden="true" />
          {t('conf.bookAnother')}
        </Button>
      </div>
    </div>
  );
}
