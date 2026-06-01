import { CalendarCheck, HeartPulse, Smile, Users } from 'lucide-react';

const STATS = [
  { icon: Smile, value: '15,000+', label: 'Smiles brightened' },
  { icon: Users, value: '8', label: 'Specialist dentists' },
  { icon: CalendarCheck, value: 'Same-day', label: 'Emergency slots' },
  { icon: HeartPulse, value: '99%', label: 'Painless visits' },
];

/** Compact trust/stats band placed between hero and services. */
export function TrustStrip() {
  return (
    <section aria-label="Clinic highlights" className="section">
      <div className="grid grid-cols-2 gap-3 rounded-2xl border border-pearl-300 bg-white/80 p-4 shadow-soft sm:grid-cols-4 sm:gap-4 sm:p-6">
        {STATS.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-clinical-50 text-clinical-600">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-lg font-bold leading-tight text-slate-900">{value}</p>
              <p className="text-xs text-slate-500">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
