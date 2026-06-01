import { Link } from 'react-router-dom';
import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Settings,
  Stethoscope,
  Users,
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/cn';

const NAV = [
  { icon: LayoutDashboard, label: 'Overview', active: true },
  { icon: CalendarDays, label: 'Appointments', active: false },
  { icon: Users, label: 'Patients', active: false },
  { icon: Stethoscope, label: 'Dentists', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

interface SidebarProps {
  /** Controls the slide-in drawer on mobile. */
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
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
          <Link to="/" aria-label="Back to website">
            <Logo />
          </Link>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {NAV.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
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
              {label}
              {!active && (
                <span className="ml-auto text-[10px] font-semibold uppercase tracking-wide text-slate-300">
                  Soon
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="border-t border-pearl-300 p-3">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-pearl-200 hover:text-slate-900"
          >
            <LogOut className="h-[18px] w-[18px]" aria-hidden="true" />
            Exit to site
          </Link>
        </div>
      </aside>
    </>
  );
}
