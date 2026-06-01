import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { toISODate } from '@/lib/booking';
import { useI18n } from '@/i18n/context';
import type { Appointment } from '@/types';

/** Lightweight SVG-free bar chart: appointments per day for the current week. */
export function WeeklyChart({ appointments }: { appointments: Appointment[] }) {
  const { t } = useI18n();
  const DAY_LABELS = t('chart.daysShort').split(',');
  const { days, max } = useMemo(() => {
    // Build the 7 days of the current week, starting Sunday.
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay());

    const week = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const iso = toISODate(d);
      const count = appointments.filter(
        (a) => a.date === iso && a.status !== 'cancelled',
      ).length;
      return { iso, index: i, count, isToday: iso === toISODate(today) };
    });
    return { days: week, max: Math.max(1, ...week.map((d) => d.count)) };
  }, [appointments]);

  return (
    <Card className="p-5 sm:p-6">
      <div className="mb-5 flex items-baseline justify-between">
        <h2 className="font-display text-base font-bold text-slate-900">
          {t('dash.weekChart')}
        </h2>
        <span className="text-sm text-slate-400">
          {t('dash.total', { n: days.reduce((sum, d) => sum + d.count, 0) })}
        </span>
      </div>

      <div className="flex h-44 items-end gap-2 sm:gap-3">
        {days.map((day) => (
          <div key={day.iso} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full flex-1 items-end">
              <div
                className="group relative w-full rounded-t-lg bg-gradient-to-t from-clinical-500 to-clinical-300 transition-[height] duration-500"
                style={{ height: `${(day.count / max) * 100}%`, minHeight: day.count ? '8px' : '2px' }}
              >
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-md bg-slate-900 px-1.5 py-0.5 text-[10px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {day.count}
                </span>
              </div>
            </div>
            <span
              className={
                day.isToday
                  ? 'text-xs font-bold text-clinical-700'
                  : 'text-xs font-medium text-slate-400'
              }
            >
              {DAY_LABELS[day.index]}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
