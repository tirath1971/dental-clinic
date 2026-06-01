import { forwardRef, useId } from 'react';
import { cn } from '@/lib/cn';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
}

/** Labelled multi-line input, styled to match Input. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ label, hint, id, className, ...props }, ref) {
    const autoId = useId();
    const taId = id ?? autoId;
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={taId} className="text-sm font-medium text-slate-700">
          {label}
        </label>
        <textarea
          ref={ref}
          id={taId}
          aria-describedby={hint ? `${taId}-hint` : undefined}
          className={cn(
            'min-h-[88px] rounded-xl border border-pearl-300 bg-white px-3.5 py-2.5 text-sm text-slate-900',
            'placeholder:text-slate-400 transition-colors duration-200',
            'hover:border-clinical-200 focus-visible:outline-none focus-visible:ring-2',
            'focus-visible:ring-clinical-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
            className,
          )}
          {...props}
        />
        {hint && (
          <p id={`${taId}-hint`} className="text-xs text-slate-500">
            {hint}
          </p>
        )}
      </div>
    );
  },
);
