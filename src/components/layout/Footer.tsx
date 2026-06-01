import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { CLINIC } from '@/data/seed';
import { useI18n } from '@/i18n/context';

export function Footer() {
  const { t } = useI18n();
  const hours = [
    { day: t('hours.mf.day'), time: t('hours.mf.time') },
    { day: t('hours.sat.day'), time: t('hours.sat.time') },
    { day: t('hours.sun.day'), time: t('hours.sun.time') },
  ];
  return (
    <footer id="contact" className="mt-24 border-t border-pearl-300 bg-white/70">
      <div className="section grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4 lg:col-span-1">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-slate-500">
            {t('footer.tagline')}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-700">
            {t('footer.visit')}
          </h3>
          <a
            href="#"
            className="flex items-start gap-2.5 text-sm text-slate-500 transition-colors hover:text-clinical-700"
          >
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-clinical-500" aria-hidden="true" />
            <span>{CLINIC.address}</span>
          </a>
          <a
            href={`tel:${CLINIC.phone.replace(/[^+\d]/g, '')}`}
            className="flex items-center gap-2.5 text-sm text-slate-500 transition-colors hover:text-clinical-700"
          >
            <Phone className="h-4 w-4 shrink-0 text-clinical-500" aria-hidden="true" />
            {CLINIC.phone}
          </a>
          <a
            href={`mailto:${CLINIC.email}`}
            className="flex items-center gap-2.5 text-sm text-slate-500 transition-colors hover:text-clinical-700"
          >
            <Mail className="h-4 w-4 shrink-0 text-clinical-500" aria-hidden="true" />
            {CLINIC.email}
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-700">
            <Clock className="h-4 w-4 text-clinical-500" aria-hidden="true" />
            {t('footer.hours')}
          </h3>
          <ul className="flex flex-col gap-1.5 text-sm text-slate-500">
            {hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className="font-medium text-slate-700">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-700">
            {t('footer.quickLinks')}
          </h3>
          <nav className="flex flex-col gap-2 text-sm text-slate-500" aria-label="Footer">
            <a href="/#services" className="transition-colors hover:text-clinical-700">
              {t('footer.ql.services')}
            </a>
            <a href="/#team" className="transition-colors hover:text-clinical-700">
              {t('footer.ql.team')}
            </a>
            <Link to="/book" className="transition-colors hover:text-clinical-700">
              {t('footer.ql.book')}
            </Link>
            <Link
              to="/dashboard"
              className="transition-colors hover:text-clinical-700"
            >
              {t('footer.ql.dashboard')}
            </Link>
          </nav>
        </div>
      </div>

      <div className="border-t border-pearl-300">
        <div className="section flex flex-col items-center justify-between gap-2 py-5 text-xs text-slate-400 sm:flex-row">
          <p>{t('footer.rights', { year: new Date().getFullYear(), clinic: CLINIC.name })}</p>
          <p>{t('footer.demo')}</p>
        </div>
      </div>
    </footer>
  );
}
