import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Info, LockKeyhole, LogIn } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { useAuth } from '@/hooks/useAuth';
import { useI18n } from '@/i18n/context';

interface LocationState {
  from?: string;
}

export function LoginPage() {
  const { t } = useI18n();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState | null)?.from ?? '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Mock gate: accept any non-empty credentials.
    if (!email.trim() || !password.trim()) {
      setError(t('login.error'));
      return;
    }
    login(email);
    navigate(from, { replace: true });
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-pearl-100 px-5 py-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-clinical-300/20 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-mint-300/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <Link to="/" aria-label={`${t('brand.name')} — home`}>
            <Logo />
          </Link>
          <LanguageToggle />
        </div>

        <Card className="p-7 sm:p-8">
          <div className="mb-6 flex flex-col items-center gap-3 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-clinical-50 text-clinical-600">
              <LockKeyhole className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-xl font-bold text-slate-900">{t('login.title')}</h1>
              <p className="text-sm text-slate-500">{t('login.subtitle')}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <Input
              label={t('login.email')}
              type="email"
              autoComplete="username"
              placeholder="you@lumidental.clinic"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              required
            />
            <Input
              label={t('login.password')}
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              required
            />

            {error && (
              <p role="alert" className="text-sm font-medium text-rose-600">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" className="mt-1 w-full">
              <LogIn className="h-4 w-4" aria-hidden="true" />
              {t('login.signIn')}
            </Button>
          </form>

          <div className="mt-5 flex items-start gap-2 rounded-xl border border-clinical-100 bg-clinical-50/60 px-3.5 py-3 text-xs text-clinical-700">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              <strong>{t('login.demoLabel')}</strong> {t('login.demoText')}
            </span>
          </div>
        </Card>

        <div className="mt-5 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-clinical-700"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t('common.backToWebsite')}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
