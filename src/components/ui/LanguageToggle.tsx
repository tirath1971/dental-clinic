import { Languages } from 'lucide-react';
import { useI18n } from '@/i18n/context';
import { cn } from '@/lib/cn';

interface LanguageToggleProps {
  className?: string;
  /** Compact icon-only style for tight spaces. */
  compact?: boolean;
}

/**
 * EN / ES language switch. Segmented control, always visible (mobile + desktop).
 * Toggling re-renders the whole tree via the i18n context.
 */
export function LanguageToggle({ className, compact }: LanguageToggleProps) {
  const { lang, setLang } = useI18n();

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        'inline-flex items-center rounded-full border border-pearl-300 bg-white/80 p-0.5 shadow-soft backdrop-blur',
        className,
      )}
    >
      {!compact && (
        <Languages
          className="ml-1.5 mr-0.5 h-3.5 w-3.5 text-slate-400"
          aria-hidden="true"
        />
      )}
      {(['en', 'es'] as const).map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            aria-label={code === 'es' ? 'Cambiar a español' : 'Switch to English'}
            className={cn(
              'rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide transition-colors',
              active
                ? 'bg-gradient-to-br from-clinical-500 to-clinical-700 text-white shadow-soft'
                : 'text-slate-500 hover:text-clinical-700',
            )}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
