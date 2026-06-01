import { useMemo, useState } from 'react';
import { CalendarClock, CalendarRange, CheckCircle2, Users } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { WeeklyChart } from '@/components/dashboard/WeeklyChart';
import {
  TableFilters,
  type StatusFilter,
} from '@/components/dashboard/TableFilters';
import { AppointmentsTable } from '@/components/dashboard/AppointmentsTable';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { useAppointments } from '@/hooks/useAppointments';
import { useI18n } from '@/i18n/context';
import { toISODate } from '@/lib/booking';

export function DashboardPage() {
  const { t } = useI18n();
  const { appointments, updateStatus } = useAppointments();
  const [status, setStatus] = useState<StatusFilter>('all');
  const [date, setDate] = useState('');

  const stats = useMemo(() => {
    const todayISO = toISODate(new Date());

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const active = appointments.filter((a) => a.status !== 'cancelled');

    const todaysCount = active.filter((a) => a.date === todayISO).length;
    const weekCount = active.filter((a) => {
      const iso = a.date;
      return iso >= toISODate(weekStart) && iso <= toISODate(weekEnd);
    }).length;
    const completed = appointments.filter((a) => a.status === 'completed').length;

    // Unique patients by email across all bookings.
    const patients = new Set(appointments.map((a) => a.patient.email.toLowerCase()))
      .size;

    return { todaysCount, weekCount, completed, patients };
  }, [appointments]);

  const filtered = useMemo(
    () =>
      appointments.filter(
        (a) =>
          (status === 'all' || a.status === status) &&
          (date === '' || a.date === date),
      ),
    [appointments, status, date],
  );

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-6xl">
        <header className="mb-7 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">
              {t('dash.overview')}
            </h1>
            <p className="text-sm text-slate-500">{t('dash.welcome')}</p>
          </div>
          {/* Visible on desktop; mobile uses the top-bar toggle. */}
          <LanguageToggle className="hidden shrink-0 lg:inline-flex" />
        </header>

        {/* Overview cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={CalendarClock}
            label={t('dash.todays')}
            value={stats.todaysCount}
            tone="clinical"
          />
          <StatCard
            icon={CalendarRange}
            label={t('dash.thisWeek')}
            value={stats.weekCount}
            tone="mint"
          />
          <StatCard
            icon={Users}
            label={t('dash.totalPatients')}
            value={stats.patients}
            tone="amber"
          />
          <StatCard
            icon={CheckCircle2}
            label={t('dash.completed')}
            value={stats.completed}
            tone="mint"
          />
        </div>

        {/* Chart */}
        <div className="mt-6">
          <WeeklyChart appointments={appointments} />
        </div>

        {/* Appointments table */}
        <div className="mt-8 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              {t('dash.appointments')}
              <span className="ml-2 text-sm font-medium text-slate-400">
                {t('dash.shown', { n: filtered.length })}
              </span>
            </h2>
            <TableFilters
              status={status}
              date={date}
              onStatusChange={setStatus}
              onDateChange={setDate}
              onClear={() => {
                setStatus('all');
                setDate('');
              }}
            />
          </div>
          <AppointmentsTable
            appointments={filtered}
            onUpdateStatus={updateStatus}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
