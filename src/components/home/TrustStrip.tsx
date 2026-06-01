import { CalendarCheck, HeartPulse, Smile, Users } from 'lucide-react';
import { useI18n } from '@/i18n/context';

const STATS = [
  { icon: Smile, valueKey: 'trust.smilesValue', labelKey: 'trust.smiles' },
  { icon: Users, valueKey: 'trust.specialistsValue', labelKey: 'trust.specialists' },
  { icon: CalendarCheck, valueKey: 'trust.sameDayValue', labelKey: 'trust.emergency' },
  { icon: HeartPulse, valueKey: 'trust.painlessValue', labelKey: 'trust.painless' },
];

/** Compact trust/stats band placed between hero and services. */
export function TrustStrip() {
  const { t } = useI18n();
  return (
    <section aria-label={t('trust.highlights')} className="section">
      <div className="grid grid-cols-2 gap-3 rounded-2xl border border-pearl-300 bg-white/80 p-4 shadow-soft sm:grid-cols-4 sm:gap-4 sm:p-6">
        {STATS.map(({ icon: Icon, valueKey, labelKey }) => (
          <div key={labelKey} className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-clinical-50 text-clinical-600">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-lg font-bold leading-tight text-slate-900">{t(valueKey)}</p>
              <p className="text-xs text-slate-500">{t(labelKey)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
