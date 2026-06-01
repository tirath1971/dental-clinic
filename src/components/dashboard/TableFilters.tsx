import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { useI18n } from '@/i18n/context';
import type { AppointmentStatus } from '@/types';

export type StatusFilter = AppointmentStatus | 'all';

interface TableFiltersProps {
  status: StatusFilter;
  date: string;
  onStatusChange: (status: StatusFilter) => void;
  onDateChange: (date: string) => void;
  onClear: () => void;
}

export function TableFilters({
  status,
  date,
  onStatusChange,
  onDateChange,
  onClear,
}: TableFiltersProps) {
  const { t } = useI18n();
  const hasFilters = status !== 'all' || date !== '';
  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="w-40">
        <Select
          label={t('filter.status')}
          value={status}
          onChange={(e) => onStatusChange(e.target.value as StatusFilter)}
        >
          <option value="all">{t('filter.allStatuses')}</option>
          <option value="pending">{t('status.pending')}</option>
          <option value="confirmed">{t('status.confirmed')}</option>
          <option value="completed">{t('status.completed')}</option>
          <option value="cancelled">{t('status.cancelled')}</option>
        </Select>
      </div>
      <div className="w-44">
        <Input
          label={t('filter.date')}
          type="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
        />
      </div>
      {hasFilters && (
        <button
          type="button"
          onClick={onClear}
          className="h-11 rounded-xl px-3 text-sm font-medium text-clinical-700 transition-colors hover:bg-clinical-50"
        >
          {t('filter.clear')}
        </button>
      )}
    </div>
  );
}
