import { forwardRef, useId } from 'react';
import { cn } from '@/lib/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  /** Optional helper/hint text shown when there's no error. */
  hint?: string;
}

/** Labelled text input with accessible error wiring (aria-invalid + describedby). */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, id, className, required, ...props },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error
    ? `${inputId}-error`
    : hint
      ? `${inputId}-hint`
      : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-clinical-600" aria-hidden="true">*</span>}
      </label>
      <input
        ref={ref}
        id={inputId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          'h-11 rounded-xl border bg-white px-3.5 text-sm text-slate-900 placeholder:text-slate-400',
          'transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
          error
            ? 'border-rose-300 focus-visible:ring-rose-400'
            : 'border-pearl-300 hover:border-clinical-200 focus-visible:ring-clinical-500',
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={`${inputId}-error`} className="text-xs font-medium text-rose-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-xs text-slate-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
});
