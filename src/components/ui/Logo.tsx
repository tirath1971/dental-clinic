import { cn } from '@/lib/cn';

interface LogoProps {
  className?: string;
  /** Hide the wordmark and show only the pearl mark. */
  markOnly?: boolean;
}

/** Pearl-accent logo: glossy mark + wordmark. */
export function Logo({ className, markOnly }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-clinical-500 to-clinical-700 shadow-soft">
        {/* Glossy pearl bead */}
        <span className="pearl-sheen h-4 w-4 rounded-full shadow-[inset_0_-1px_2px_rgba(37,99,235,0.25)]" />
        <span className="absolute left-1.5 top-1.5 h-1 w-1 rounded-full bg-white/90" />
      </span>
      {!markOnly && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[15px] font-bold tracking-tight text-slate-900">
            Shining Pearls
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-clinical-600">
            Dental Clinic
          </span>
        </span>
      )}
    </span>
  );
}
