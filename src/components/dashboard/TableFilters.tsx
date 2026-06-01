import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
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
  const hasFilters = status !== 'all' || date !== '';
  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="w-40">
        <Select
          label="Status"
          value={status}
          onChange={(e) => onStatusChange(e.target.value as StatusFilter)}
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </Select>
      </div>
      <div className="w-44">
        <Input
          label="Date"
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
          Clear filters
        </button>
      )}
    </div>
  );
}
