/**
 * Resolve a path to a file in /public against the app's base URL so it works
 * both at the domain root (dev, Vercel) and under a subpath (GitHub Pages,
 * served from /dental-clinic/). Pass paths with or without a leading slash.
 */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL; // e.g. "/" or "/dental-clinic/"
  return `${base}${path.replace(/^\//, '')}`;
}
