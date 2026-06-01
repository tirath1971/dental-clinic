import { Button } from '@/components/ui/Button';
import { useI18n } from '@/i18n/context';

export function NotFoundPage() {
  const { t } = useI18n();
  return (
    <section className="section flex min-h-[60vh] flex-col items-center justify-center gap-5 text-center">
      <p className="font-display text-7xl font-bold text-clinical-200">404</p>
      <h1 className="text-2xl font-bold text-slate-900">{t('nf.title')}</h1>
      <p className="max-w-md text-slate-500">{t('nf.desc')}</p>
      <Button as="link" to="/">
        {t('common.backToHome')}
      </Button>
    </section>
  );
}
