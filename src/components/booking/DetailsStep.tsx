import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import type { PatientInfo } from '@/types';
import type { PatientErrors } from '@/lib/booking';

interface DetailsStepProps {
  patient: PatientInfo;
  errors: PatientErrors;
  onChange: (patch: Partial<PatientInfo>) => void;
}

export function DetailsStep({ patient, errors, onChange }: DetailsStepProps) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-bold text-slate-900">Your details</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Full name"
          required
          autoComplete="name"
          placeholder="Jordan Avery"
          value={patient.name}
          error={errors.name}
          onChange={(e) => onChange({ name: e.target.value })}
        />
        <Input
          label="Phone"
          required
          type="tel"
          autoComplete="tel"
          placeholder="+1 555 123 4567"
          value={patient.phone}
          error={errors.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
        />
        <div className="sm:col-span-2">
          <Input
            label="Email"
            required
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={patient.email}
            error={errors.email}
            onChange={(e) => onChange({ email: e.target.value })}
          />
        </div>
        <div className="sm:col-span-2">
          <Textarea
            label="Notes (optional)"
            placeholder="Anything we should know — anxieties, symptoms, accessibility needs…"
            hint="We'll review this before your visit."
            value={patient.notes ?? ''}
            onChange={(e) => onChange({ notes: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
