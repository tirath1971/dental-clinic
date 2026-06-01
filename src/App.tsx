import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { HomePage } from '@/pages/HomePage';
import { BookingPage } from '@/pages/BookingPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

/** Scroll to top on route change, or to the hash target when one is present. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        {/* Dashboard has its own full-screen layout (no public navbar/footer). */}
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </>
  );
}
