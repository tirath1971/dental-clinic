import { Button } from '@/components/ui/Button';

export function NotFoundPage() {
  return (
    <section className="section flex min-h-[60vh] flex-col items-center justify-center gap-5 text-center">
      <p className="font-display text-7xl font-bold text-clinical-200">404</p>
      <h1 className="text-2xl font-bold text-slate-900">Page not found</h1>
      <p className="max-w-md text-slate-500">
        We couldn't find that page. It may have moved, or the link might be
        incorrect.
      </p>
      <Button as="link" to="/">
        Back to home
      </Button>
    </section>
  );
}
