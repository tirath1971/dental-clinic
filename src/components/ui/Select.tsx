import { forwardRef, useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  /** Hide the label visually but keep it for screen readers. */
  srOnlyLabel?: boolean;
}

/** Labelled native select with a custom chevron. */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, srOnlyLabel, id, className, children, ...props },
  ref,
) {
  const autoId = useId();
  const selectId = id ?? autoId;
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={selectId}
        className={cn(
          'text-sm font-medium text-slate-700',
          srOnlyLabel && 'sr-only',
        )}
      >
        {label}
      </label>
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'h-11 w-full appearance-none rounded-xl border border-pearl-300 bg-white pl-3.5 pr-10 text-sm text-slate-900',
            'transition-colors duration-200 hover:border-clinical-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinical-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
      </div>
    </div>
  );
});
