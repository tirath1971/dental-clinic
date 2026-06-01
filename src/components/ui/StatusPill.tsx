import { cn } from '@/lib/cn';
import { useI18n } from '@/i18n/context';
import type { AppointmentStatus } from '@/types';

const STYLES: Record<AppointmentStatus, string> = {
  pending: 'bg-amber-50 text-amber-700 ring-amber-200',
  confirmed: 'bg-clinical-50 text-clinical-700 ring-clinical-200',
  completed: 'bg-mint-100 text-mint-500 ring-mint-200',
  cancelled: 'bg-rose-50 text-rose-600 ring-rose-200',
};

/** Color-coded status badge for appointments. */
export function StatusPill({ status }: { status: AppointmentStatus }) {
  const { t } = useI18n();
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset',
        STYLES[status],
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {t(`status.${status}`)}
    </span>
  );
}
