import { Award, Check } from 'lucide-react';
import { DOCTORS } from '@/data/seed';
import { asset } from '@/lib/asset';
import { useI18n } from '@/i18n/context';
import { cn } from '@/lib/cn';

interface DoctorStepProps {
  value: string | null;
  onSelect: (doctorId: string) => void;
}

export function DoctorStep({ value, onSelect }: DoctorStepProps) {
  const { t } = useI18n();
  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="text-xl font-bold text-slate-900">
        {t('step.dentist.title')}
      </legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {DOCTORS.map((doctor) => {
          const selected = value === doctor.id;
          return (
            <button
              key={doctor.id}
              type="button"
              onClick={() => onSelect(doctor.id)}
              aria-pressed={selected}
              className={cn(
                'group relative flex items-center gap-4 rounded-2xl border bg-white p-4 text-left transition-[transform,box-shadow,border-color] duration-200',
                'hover:-translate-y-0.5 hover:shadow-card',
                selected
                  ? 'border-clinical-400 shadow-card ring-2 ring-clinical-200'
                  : 'border-pearl-300',
              )}
            >
              <img
                src={asset(doctor.photo)}
                alt=""
                className="h-16 w-16 shrink-0 rounded-xl object-cover"
                loading="lazy"
              />
              <span className="flex flex-col gap-0.5">
                <span className="font-semibold text-slate-900">{doctor.name}</span>
                <span className="text-sm font-medium text-clinical-600">
                  {t(`doctors.${doctor.id.replace('doc-', '')}.specialty`)}
                </span>
                <span className="mt-1 inline-flex items-center gap-1.5 text-xs text-slate-500">
                  <Award className="h-3.5 w-3.5 text-mint-500" aria-hidden="true" />
                  {t('team.yearsExp', { n: doctor.yearsExperience })}
                </span>
              </span>
              {selected && (
                <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-clinical-600 text-white">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
