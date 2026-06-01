import { cn } from '@/lib/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds hover lift + shine; use for interactive/clickable cards. */
  interactive?: boolean;
}

/** Rounded-2xl surface with a thin border and soft, color-tinted shadow. */
export function Card({ className, interactive, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-pearl-300 bg-white/90 shadow-soft backdrop-blur-sm',
        interactive &&
          'transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lift',
        className,
      )}
      {...props}
    />
  );
}
