import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { CalendarPlus, Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { useI18n } from '@/i18n/context';
import { cn } from '@/lib/cn';

const LINKS = [
  { key: 'nav.services', to: '/#services' },
  { key: 'nav.doctors', to: '/#team' },
  { key: 'nav.results', to: '/#results' },
  { key: 'nav.contact', to: '/#contact' },
];

export function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route or hash changes.
  useEffect(() => setOpen(false), [location]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300',
        scrolled
          ? 'border-b border-pearl-300 bg-pearl-100/80 shadow-soft backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="section flex h-16 items-center justify-between gap-4" aria-label="Primary">
        <Link to="/" aria-label={`${t('brand.name')} — home`}>
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.to}>
              <a
                href={link.to}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-pearl-200 hover:text-clinical-700"
              >
                {t(link.key)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Always visible on every breakpoint. */}
          <LanguageToggle />

          <div className="hidden items-center gap-2 md:flex">
            <NavLink
              to="/dashboard"
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-500 transition-colors hover:text-clinical-700"
            >
              {t('nav.staff')}
            </NavLink>
            <Button as="link" to="/book" size="sm">
              <CalendarPlus className="h-4 w-4" aria-hidden="true" />
              {t('common.bookAppointment')}
            </Button>
          </div>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 transition-colors hover:bg-pearl-200 md:hidden"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-pearl-300 bg-pearl-100/95 backdrop-blur-md md:hidden">
          <ul className="section flex flex-col gap-1 py-4">
            {LINKS.map((link) => (
              <li key={link.to}>
                <a
                  href={link.to}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-pearl-200"
                >
                  {t(link.key)}
                </a>
              </li>
            ))}
            <li className="mt-2 flex flex-col gap-2 border-t border-pearl-300 pt-3">
              <Button as="link" to="/dashboard" variant="secondary" size="sm">
                {t('nav.staffDashboard')}
              </Button>
              <Button as="link" to="/book" size="sm">
                <CalendarPlus className="h-4 w-4" aria-hidden="true" />
                {t('common.bookAppointment')}
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
