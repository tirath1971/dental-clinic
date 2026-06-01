import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/** Reactively report the user's reduced-motion preference. */
export function usePrefersReducedMotion(): boolean {
  const [prefers, setPrefers] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const onChange = () => setPrefers(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return prefers;
}
