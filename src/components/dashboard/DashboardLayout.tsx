import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/** Sidebar shell for the staff dashboard. */
export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-pearl-100">
      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar */}
        <div className="flex h-16 items-center gap-3 border-b border-pearl-300 bg-white px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setNavOpen(true)}
            aria-label="Open navigation"
            className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 hover:bg-pearl-200"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-display font-bold text-slate-900">Dashboard</span>
        </div>

        <main className="flex-1 overflow-x-hidden p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
