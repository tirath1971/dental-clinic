import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';

interface StepIndicatorProps {
  steps: string[];
  /** Zero-based index of the current step. */
  current: number;
}

/** Horizontal progress indicator for the booking wizard. */
export function StepIndicator({ steps, current }: StepIndicatorProps) {
  return (
    <ol className="flex items-center gap-1.5 sm:gap-2" aria-label="Booking progress">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex flex-1 items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-semibold transition-colors',
                  done && 'bg-mint-300 text-slate-900',
                  active && 'bg-gradient-to-br from-clinical-500 to-clinical-700 text-white shadow-soft',
                  !done && !active && 'bg-pearl-200 text-slate-400',
                )}
                aria-current={active ? 'step' : undefined}
              >
                {done ? <Check className="h-4 w-4" aria-hidden="true" /> : i + 1}
              </span>
              <span
                className={cn(
                  'hidden text-sm font-medium sm:inline',
                  active ? 'text-slate-900' : 'text-slate-500',
                )}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span
                className={cn(
                  'h-0.5 flex-1 rounded-full transition-colors',
                  done ? 'bg-mint-300' : 'bg-pearl-300',
                )}
                aria-hidden="true"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
