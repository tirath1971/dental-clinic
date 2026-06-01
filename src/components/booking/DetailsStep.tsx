import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useI18n } from '@/i18n/context';
import type { PatientInfo } from '@/types';
import type { PatientErrors } from '@/lib/booking';

interface DetailsStepProps {
  patient: PatientInfo;
  errors: PatientErrors;
  onChange: (patch: Partial<PatientInfo>) => void;
}

export function DetailsStep({ patient, errors, onChange }: DetailsStepProps) {
  const { t } = useI18n();
  // errors hold i18n keys; translate at render time.
  const tErr = (key?: string) => (key ? t(key) : undefined);
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-bold text-slate-900">{t('details.title')}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label={t('details.name')}
          required
          autoComplete="name"
          placeholder="Jordan Avery"
          value={patient.name}
          error={tErr(errors.name)}
          onChange={(e) => onChange({ name: e.target.value })}
        />
        <Input
          label={t('details.phone')}
          required
          type="tel"
          autoComplete="tel"
          placeholder="+1 555 123 4567"
          value={patient.phone}
          error={tErr(errors.phone)}
          onChange={(e) => onChange({ phone: e.target.value })}
        />
        <div className="sm:col-span-2">
          <Input
            label={t('details.email')}
            required
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={patient.email}
            error={tErr(errors.email)}
            onChange={(e) => onChange({ email: e.target.value })}
          />
        </div>
        <div className="sm:col-span-2">
          <Textarea
            label={t('details.notes')}
            placeholder={t('details.notesPlaceholder')}
            hint={t('details.notesHint')}
            value={patient.notes ?? ''}
            onChange={(e) => onChange({ notes: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
