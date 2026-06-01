import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  buildMonthGrid,
  formatTime,
  generateTimeSlots,
  isClosedDay,
  toISODate,
} from '@/lib/booking';
import { isSlotTaken } from '@/lib/storage';
import { useI18n } from '@/i18n/context';
import { cn } from '@/lib/cn';

interface DateTimeStepProps {
  doctorId: string;
  date: string | null;
  timeSlot: string | null;
  onPickDate: (iso: string) => void;
  onPickSlot: (slot: string) => void;
}

const ALL_SLOTS = generateTimeSlots();

export function DateTimeStep({
  doctorId,
  date,
  timeSlot,
  onPickDate,
  onPickSlot,
}: DateTimeStepProps) {
  const { t, locale } = useI18n();
  const WEEKDAYS = t('cal.weekdaysShort').split(',');
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [view, setView] = useState(() => ({
    year: today.getFullYear(),
    month: today.getMonth(),
  }));

  const grid = useMemo(
    () => buildMonthGrid(view.year, view.month),
    [view.year, view.month],
  );

  const monthLabel = new Date(view.year, view.month, 1).toLocaleDateString(
    locale,
    { month: 'long', year: 'numeric' },
  );

  const canGoPrev =
    view.year > today.getFullYear() ||
    (view.year === today.getFullYear() && view.month > today.getMonth());

  function shiftMonth(delta: number) {
    setView((v) => {
      const d = new Date(v.year, v.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-slate-900">{t('step.datetime.title')}</h2>

      <div className="grid gap-6 lg:grid-cols-[auto,1fr]">
        {/* Calendar */}
        <div className="rounded-2xl border border-pearl-300 bg-white p-4 shadow-soft">
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              disabled={!canGoPrev}
              aria-label={t('datetime.prevMonth')}
              className="grid h-9 w-9 place-items-center rounded-lg text-slate-600 transition-colors hover:bg-pearl-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm font-semibold text-slate-900">{monthLabel}</span>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              aria-label={t('datetime.nextMonth')}
              className="grid h-9 w-9 place-items-center rounded-lg text-slate-600 transition-colors hover:bg-pearl-200"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {WEEKDAYS.map((w) => (
              <span key={w} className="py-1 text-xs font-semibold text-slate-400">
                {w}
              </span>
            ))}
            {grid.map((day) => {
              const iso = toISODate(day);
              const inMonth = day.getMonth() === view.month;
              const isPast = day < today;
              const closed = isClosedDay(day);
              const disabled = isPast || closed || !inMonth;
              const selected = date === iso;
              const isToday = day.getTime() === today.getTime();
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={disabled}
                  onClick={() => onPickDate(iso)}
                  aria-label={day.toDateString()}
                  aria-pressed={selected}
                  className={cn(
                    'relative h-10 w-10 rounded-lg text-sm font-medium transition-colors',
                    !inMonth && 'opacity-0 pointer-events-none',
                    disabled && inMonth && 'cursor-not-allowed text-slate-300 line-through',
                    !disabled && 'text-slate-700 hover:bg-clinical-50',
                    selected && '!bg-gradient-to-br !from-clinical-500 !to-clinical-700 !text-white shadow-soft',
                  )}
                >
                  {day.getDate()}
                  {isToday && !selected && (
                    <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-clinical-500" />
                  )}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-slate-400">{t('datetime.unavailable')}</p>
        </div>

        {/* Time slots */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-slate-700">
            {t('datetime.available')}
          </h3>
          {!date ? (
            <p className="rounded-xl border border-dashed border-pearl-300 bg-pearl-100 p-6 text-center text-sm text-slate-500">
              {t('datetime.selectDate')}
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {ALL_SLOTS.map((slot) => {
                const taken = isSlotTaken(doctorId, date, slot);
                const selected = timeSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={taken}
                    onClick={() => onPickSlot(slot)}
                    aria-pressed={selected}
                    title={taken ? t('datetime.booked') : undefined}
                    className={cn(
                      'rounded-xl border px-2 py-2.5 text-sm font-medium transition-[transform,box-shadow,border-color]',
                      taken &&
                        'cursor-not-allowed border-pearl-200 bg-pearl-100 text-slate-300 line-through',
                      !taken &&
                        !selected &&
                        'border-pearl-300 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-clinical-300 hover:shadow-soft',
                      selected &&
                        'border-clinical-400 bg-gradient-to-br from-clinical-500 to-clinical-700 text-white shadow-soft',
                    )}
                  >
                    {formatTime(slot, locale)}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
