import { Link, useNavigate } from 'react-router-dom';
import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Settings,
  Stethoscope,
  Users,
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { useAuth } from '@/hooks/useAuth';
import { useI18n } from '@/i18n/context';
import { cn } from '@/lib/cn';

const NAV = [
  { icon: LayoutDashboard, key: 'side.overview', active: true },
  { icon: CalendarDays, key: 'side.appointments', active: false },
  { icon: Users, key: 'side.patients', active: false },
  { icon: Stethoscope, key: 'side.dentists', active: false },
  { icon: Settings, key: 'side.settings', active: false },
];

interface SidebarProps {
  /** Controls the slide-in drawer on mobile. */
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { session, logout } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();

  function handleSignOut() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          aria-label={t('side.closeNav')}
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-900/30 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-pearl-300 bg-white transition-transform duration-300 lg:static lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-label="Dashboard navigation"
      >
        <div className="flex h-16 items-center border-b border-pearl-300 px-5">
          <Link to="/" aria-label={t('common.backToWebsite')}>
            <Logo />
          </Link>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {NAV.map(({ icon: Icon, key, active }) => (
            <button
              key={key}
              type="button"
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-clinical-50 text-clinical-700'
                  : 'text-slate-500 hover:bg-pearl-200 hover:text-slate-900',
              )}
            >
              <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
              {t(key)}
              {!active && (
                <span className="ml-auto text-[10px] font-semibold uppercase tracking-wide text-slate-300">
                  {t('side.soon')}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="border-t border-pearl-300 p-3">
          {session && (
            <div className="mb-2 flex items-center gap-3 rounded-xl bg-pearl-100 px-3.5 py-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-clinical-500 to-clinical-700 text-xs font-bold uppercase text-white">
                {session.email.charAt(0)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-900">
                  {session.email}
                </p>
                <p className="text-xs text-slate-400">{t('side.signedIn')}</p>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-rose-50 hover:text-rose-600"
          >
            <LogOut className="h-[18px] w-[18px]" aria-hidden="true" />
            {t('side.signOut')}
          </button>
        </div>
      </aside>
    </>
  );
}
